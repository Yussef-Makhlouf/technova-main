import { UserModel } from "../../DB/models/userModel.js"
import { generateToken, verifyToken } from "../../utilities/tokenFunctions.js"
import { nanoid } from "nanoid"
import pkg from 'bcrypt'
import CustomError from "../../utilities/customError.js"
import imagekit, { destroyImage } from "../../utilities/imagekitConfigration.js"
import jwt from "jsonwebtoken"
import { emailTemplate } from "../../utilities/emailTemplate.js"
import { sendEmailService } from "../../services/sendEmail.js"

export const register = async (req, res, next) => {

  const {
    userName,
    email,
    password,
    role
  } = req.body
  //is email exsisted
  const isExsisted = await UserModel.findOne({ email })
  if (isExsisted) {
    return next(new CustomError('Email Already Exsisted', 409))
  }

  const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS)

  const user = new UserModel({
    userName,
    email,
    password: hashedPassword,
    role
  })
  const saveUser = await user.save()
  res.status(201).json({ message: 'done', saveUser })
}


export const login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new CustomError('Email And Password Is Required', 422))
  }

  const userExsist = await UserModel.findOne({ email })
  if (!userExsist) {
    return next(new CustomError('user not found', 401))
  }


  const passwordExsist = pkg.compareSync(password, userExsist.password)

  if (!passwordExsist) {
    return next(new CustomError('password incorrect', 401))
  }

  const token = generateToken({
    payload: {
      email,
      _id: userExsist._id,
      role: userExsist.role
    },
    signature: process.env.SIGN_IN_TOKEN_SECRET,
    expiresIn: '12h',
  })


  const userUpdated = await UserModel.findOneAndUpdate(

    { email },

    {
      token,
      isActive: true,
    },
    { new: true },
  )
  res.status(200).json({ message: 'Login Success', userUpdated })
}

export const getAllUsers = async (req, res, next) => {

  const users = await UserModel.find()

  if (!users || users.length === 0) {
    return next(new CustomError('No users found', 404));
  }

  res.status(200).json({
    success: true,
    message: 'done',
    length: users.length,
    users
  })
}

export const addUser = async (req, res, next) => {
  console.log(req.body);
  const { userName, email, password, role } = req.body;
  
  // ? Validate required fields
  if (!userName || !email || !password || !role) {
    return next(new CustomError("All fields are required", 400));
  }

  // Check if email already exists
  const isExist = await UserModel.findOne({ email });
  if (isExist) {
    return next(new CustomError("Email is already existed", 400));
  }

  // Hash the password
  const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS);

  // Generate custom ID for image folder
  const customId = nanoid();

  // Prepare user object
  const user = new UserModel({
    userName,
    email,
    password: hashedPassword,
    role,
    customId,
  });

  if (req.file) {
    const uploadResult = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: `${process.env.PROJECT_FOLDER}/User/${customId}`,
    });

    user.image = {
      imageLink: uploadResult.url,
      public_id: uploadResult.fileId,
    };
  }

  await user.save();

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user
  });
};

export const UpdateUser = async (req, res, next) => {
  const {
    userName,
    email,
    password,
    role,
    isActive
  } = req.body

  const id = req.params.id
  const user = await UserModel.findById(id)


  if (!user) {
    return next(new Error("user Didn't Found", { cause: 400 }))
  }
  // Check if file is uploaded
  if (req.file) {
    // Upload image to ImageKit
    const uploadResult = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: `${process.env.PROJECT_FOLDER}/User/${user.customId}`,
    });
    user.image.imageLink = uploadResult.url
    user.image.public_id = uploadResult.fileId
  }

  if (userName) user.userName = userName
  if (email) user.email = email
  if (role) user.role = role
  if (isActive) user.isActive = "Not Active"

  if (password) {
    const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS)
    user.password = hashedPassword
  }

  // save the user 
  await user.save()
  res.status(200).json({ message: "user updated successfully", user })
}

export const deleteUser = async (req, res, next) => {
  const { id } = req.params

  const user = await UserModel.findById(id)
  if (user) {
    const uploadedimage = user.image.public_id
    if (uploadedimage) {
      await destroyImage(uploadedimage)
    }
  }
  await UserModel.findByIdAndDelete(id)
  res.status(201).json({ message: "User", user })
}

export const logout = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SIGN_IN_TOKEN_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {

        decoded = jwt.decode(token);
      } else {
        console.log(error);

        return res.status(401).json({ message: "Invalid token" });
      }
    }

    if (!decoded || !decoded.email) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const email = decoded.email;

    // console.log("Decoded email:", email);

    // البحث عن المستخدم
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // تحديث حالة المستخدم إلى "offline" حتى لو كان التوكن منتهي الصلاحية
    await UserModel.findOneAndUpdate(
      { email },
      { token: null, isActive: false },
      { new: true }
    );

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body

    // Validate email input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      })
    }

    // Check if user exists
    const isExist = await UserModel.findOne({ email })
    if (!isExist) {
      return res.status(400).json({
        success: false,
        message: "Email not found"
      })
    }

    // Generate reset code and token
    const code = nanoid()
    const hashcode = pkg.hashSync(code, +process.env.SALT_ROUNDS)
    const token = generateToken({
      payload: {
        email,
        // sendCode: hashcode,
      },
      signature: process.env.RESET_TOKEN,
      expiresIn: '1h',
    })

    // Create reset password link
    const resetPasswordLink = `https://globaltechnova.com/en/reset-password/${token}`

    // Send email
    const isEmailSent = sendEmailService({
      to: email,
      subject: "Reset Password",
      message: emailTemplate({
        link:  resetPasswordLink,
        linkData: "Click Here Reset Password",
        subject: "Reset Password",
      }),
    })

    if (!isEmailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send reset email"
      })
    }

    // Update user with forgetCode
    await UserModel.findOneAndUpdate(
      { email },
      { forgetCode: hashcode },
      { new: true },
    )

    return res.status(200).json({
      success: true,
      message: "Password reset link sent to your email"
    })
  } catch (error) {
    console.error('Forget password error:', error)
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred"
    })
  }
}

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params
    const { password } = req.body

    console.log('=== RESET PASSWORD DEBUG ===')
    console.log('Token received:', token)
    console.log('Password length:', password?.length)

    // Verify token
    const decoded = verifyToken({ token, signature: process.env.RESET_TOKEN })
    console.log('Decoded token:', decoded)

    if (!decoded || !decoded.email) {
      console.log('Token validation failed - Invalid decoded data')
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      })
    }

    console.log('Looking for user with email:', decoded.email)


    // Find user with matching email and forgetCode
    const user = await UserModel.findOne({
      email: decoded.email,
      // forgetCode: decoded.sendCode

    })
    console.log(user)
    console.log('User found:', user ? 'YES' : 'NO')
    if (user) {
      console.log('User email:', user.email)
    } else {
      // Try to find user by email only to see if they exist
      const userByEmail = await UserModel.findOne({ email: decoded.email })
      console.log('User exists by email:', userByEmail ? 'YES' : 'NO')
      if (userByEmail) {
      }
    }

    if (!user) {
      console.log('User lookup failed - Token already used or codes dont match')
      return res.status(400).json({
        success: false,
        message: "you have already reset it, try to login"
      })
    }

    // Validate password
    if (!password || password.length < 8) {
      console.log('Password validation failed')
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters"
      })
    }

    // Hash and update password
    const hashedPassword = pkg.hashSync(password, +process.env.SALT_ROUNDS)
    user.password = hashedPassword
    user.forgetCode = null

    await user.save()
    console.log('Password reset successful for:', user.email)
    console.log('=== END DEBUG ===')

    res.status(200).json({
      success: true,
      message: "Password reset successful"
    })
  } catch (error) {
    console.error('Reset password error:', error)
    return res.status(500).json({
      message: error.message || "An error occurred while resetting password"
    })
  }
}

export const changePassword = async (req, res, next) => {
  try {
    console.log('=== CHANGE PASSWORD DEBUG ===')
    console.log('Headers:', req.headers)

    const { newPassword } = req.body
    console.log(newPassword);
    
    const token = req.headers.authorization?.replace('Bearer ', '')

    console.log('Extracted token:', token ? token.substring(0, 20) + '...' : 'NO TOKEN')

    if (!token) {
      console.log('❌ No token found')
      return next(new CustomError("Authentication token is required", 401))
    }

    if (!newPassword) {
      console.log('❌ No newPassword found')
      return next(new CustomError("New password is required", 400))
    }

    // Verify and decode token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.SIGN_IN_TOKEN_SECRET)
      console.log('✅ Token verified, decoded:', decoded)
    } catch (error) {
      console.log('❌ Token verification failed:', error.message)
      return next(new CustomError("Invalid or expired token", 401))
    }

    if (!decoded || !decoded.email) {
      console.log('❌ Invalid token payload')
      return next(new CustomError("Invalid token payload", 401))
    }

    // Find user by email from token
    const userExist = await UserModel.findOne({ email: decoded.email })

    if (!userExist) {
      console.log('❌ User not found:', decoded.email)
      return next(new CustomError("User not found", 404))
    }

    console.log('✅ User found:', userExist.email)

    // Hash the new password
    const hashedPassword = pkg.hashSync(newPassword, +process.env.SALT_ROUNDS)

    // Update user password
    userExist.password = hashedPassword
    await userExist.save()

    console.log('✅ Password changed successfully')
    console.log('=== END DEBUG ===')

    res.status(200).json({
      success: true,
      message: "Password changed successfully"
    })
  } catch (error) {
    console.error('Change password error:', error)
    return next(new CustomError(error.message || "An error occurred while changing password", 500))
  }
}

export const multyDeleteUsers = async (req, res, next) => {
  const { ids } = req.body; // Expecting an array of IDs in the request body

  if (!Array.isArray(ids) || ids.length === 0) {
    return next(new CustomError("Please provide an array of IDs to delete", 400));
  }

  const Users = await UserModel.find({ _id: { $in: ids } });

  if (Users.length === 0) {
    return next(new CustomError("No Users found for the provided IDs", 404));
  }

  await UserModel.deleteMany({ _id: { $in: ids } });

  return res.status(200).json({
    success: true,
    message: "Users deleted successfully",
  });
}