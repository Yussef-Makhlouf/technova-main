import nodemailer from 'nodemailer'

// TECHNOVA Password Reset Email Template
const createPasswordResetEmailTemplate = (resetLink) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password - TECHNOVA</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background: linear-gradient(145deg, #12111a 0%, #0d0c14 100%); border-radius: 16px; border: 1px solid rgba(99, 102, 241, 0.2); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(99, 102, 241, 0.1);">
              <!-- Gradient accent line -->
              <div style="width: 100%; height: 4px; background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899); border-radius: 2px; margin-bottom: 30px;"></div>
              
              <!-- Logo Text -->
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px;">
                <span style="color: #ffffff;">TECH</span><span style="background: linear-gradient(90deg, #06b6d4, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">NOVA</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">AI & Intelligent Solutions</p>
            </td>
          </tr>
          
          <!-- Badge -->
          <tr>
            <td style="padding: 30px 40px 10px 40px; text-align: center;">
              <span style="display: inline-block; padding: 8px 20px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 50px; color: #8b5cf6; font-size: 12px; font-weight: 600; letter-spacing: 1px;">
                🔐 PASSWORD RESET REQUEST
              </span>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 20px 40px 10px 40px; text-align: center;">
              <h2 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff;">Reset Your Password</h2>
              <p style="margin: 15px 0 0 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                We received a request to reset your password. Click the button below to create a new password.
              </p>
            </td>
          </tr>
          
          <!-- Content Box -->
          <tr>
            <td style="padding: 30px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                
                <!-- Security Notice -->
                <tr>
                  <td style="padding: 25px;">
                    <div style="background: rgba(6, 182, 212, 0.05); border-left: 3px solid #06b6d4; border-radius: 0 8px 8px 0; padding: 20px;">
                      <p style="margin: 0; color: #e5e7eb; font-size: 14px; line-height: 1.7;">
                        <strong style="color: #06b6d4;">⚠️ Important:</strong> This link will expire in <strong>1 hour</strong> for security reasons. If you didn't request this password reset, please ignore this email or contact our support team.
                      </p>
                    </div>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
          
          <!-- Reset Password Button -->
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <a href="${resetLink}" style="display: inline-block; padding: 16px 50px; background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);">
                Reset Password →
              </a>
            </td>
          </tr>
          
          <!-- Link Backup -->
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px;">If the button doesn't work, copy and paste this link:</p>
              <p style="margin: 0; color: #06b6d4; font-size: 11px; word-break: break-all; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                ${resetLink}
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background: rgba(0, 0, 0, 0.3); border-radius: 0 0 16px 16px; border-top: 1px solid rgba(99, 102, 241, 0.1);">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 13px;">
                      This email was sent as part of a password reset request
                    </p>
                    <p style="margin: 15px 0 0 0; color: #4b5563; font-size: 12px;">
                      © ${new Date().getFullYear()} TECHNOVA. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0 0;">
                      <a href="https://globaltechnova.com" style="color: #06b6d4; text-decoration: none; font-size: 12px;">globaltechnova.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

// Send Password Reset Email Service
export async function sendEmailService({
  to,
  subject,
  message,
  attachments = [],
} = {}) {
  // Parse port and determine secure setting automatically
  const smtpPort = parseInt(process.env.SMTP_PORT) || 465;
  const isSecure = smtpPort === 465; // True for port 465, false for 587 (STARTTLS)

  console.log(`📧 Password Reset - SMTP Config: Host=${process.env.SMTP_HOST || 'mail.globaltechnova.com'}, Port=${smtpPort}, Secure=${isSecure}`);

  // Create transporter with same settings as contactEmail.js
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.globaltechnova.com',
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER || 'info@globaltechnova.com',
      pass: process.env.SMTP_PASS,
    },
    // TLS options to handle certificate issues
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    // Connection timeout settings (reduced for faster failure detection)
    connectionTimeout: 15000, // 15 seconds
    greetingTimeout: 15000,   // 15 seconds
    socketTimeout: 30000,     // 30 seconds
    // Disable pooling for simpler connection handling
    pool: false,
    // Debug output
    debug: true,
    logger: true
  });

  const emailInfo = await transporter.sendMail({
    from: `"TECHNOVA" <${process.env.SMTP_USER || 'info@globaltechnova.com'}>`,
    to: to ? to : '',
    subject: subject ? subject : 'Password Reset - TECHNOVA',
    html: message ? message : '',
    attachments,
  });

  if (emailInfo.accepted.length) {
    return true;
  }
  return false;
}

// Send Password Reset Link Email
export const sendPasswordResetEmail = async (toEmail, resetLink) => {
  // Parse port and determine secure setting automatically
  const smtpPort = parseInt(process.env.SMTP_PORT) || 465;
  const isSecure = smtpPort === 465; // True for port 465, false for 587 (STARTTLS)

  console.log(`📧 Sending password reset email to: ${toEmail}`);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.globaltechnova.com',
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER || 'info@globaltechnova.com',
      pass: process.env.SMTP_PASS,
    },
    // TLS options to handle certificate issues
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    // Connection timeout settings
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    // Disable pooling
    pool: false,
    // Debug
    debug: true,
    logger: true
  });

  const mailOptions = {
    from: `"TECHNOVA Security" <${process.env.SMTP_USER || 'info@globaltechnova.com'}>`,
    to: toEmail,
    subject: '🔐 Reset Your Password - TECHNOVA',
    html: createPasswordResetEmailTemplate(resetLink),
  };

  const emailInfo = await transporter.sendMail(mailOptions);

  if (emailInfo.accepted.length) {
    console.log(`✅ Password reset email sent successfully to: ${toEmail}`);
    return true;
  }

  console.log(`❌ Failed to send password reset email to: ${toEmail}`);
  return false;
};

// Send Verification Code Email (for OTP)
export const sendVerificationEmail = async (toEmail, verificationCode) => {
  const smtpPort = parseInt(process.env.SMTP_PORT) || 465;
  const isSecure = smtpPort === 465;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.globaltechnova.com',
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER || 'info@globaltechnova.com',
      pass: process.env.SMTP_PASS,
    },
    // TLS options to handle certificate issues
    tls: {
      rejectUnauthorized: false,
      minVersion: 'TLSv1.2'
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    pool: false,
    debug: true,
    logger: true
  });

  const mailOptions = {
    from: `"TECHNOVA Security" <${process.env.SMTP_USER || 'info@globaltechnova.com'}>`,
    to: toEmail,
    subject: '🔐 Your Verification Code - TECHNOVA',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Code - TECHNOVA</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0f;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(180deg, #0a0a0f 0%, #0d1117 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background: linear-gradient(145deg, #12111a 0%, #0d0c14 100%); border-radius: 16px; border: 1px solid rgba(99, 102, 241, 0.2); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(99, 102, 241, 0.1);">
              <div style="width: 100%; height: 4px; background: linear-gradient(90deg, #06b6d4, #8b5cf6, #ec4899); border-radius: 2px; margin-bottom: 30px;"></div>
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: 3px;">
                <span style="color: #ffffff;">TECH</span><span style="background: linear-gradient(90deg, #06b6d4, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">NOVA</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">AI & Intelligent Solutions</p>
            </td>
          </tr>
          
          <!-- Badge -->
          <tr>
            <td style="padding: 30px 40px 10px 40px; text-align: center;">
              <span style="display: inline-block; padding: 8px 20px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 50px; color: #06b6d4; font-size: 12px; font-weight: 600; letter-spacing: 1px;">
                🔑 VERIFICATION CODE
              </span>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 20px 40px 30px 40px; text-align: center;">
              <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #ffffff;">Your Verification Code</h2>
              <p style="margin: 15px 0 30px 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                Use this code to verify your identity:
              </p>
              
              <!-- Verification Code Box -->
              <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(6, 182, 212, 0.2)); border: 2px solid rgba(139, 92, 246, 0.4); border-radius: 12px; padding: 25px 40px; display: inline-block;">
                <span style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #ffffff; font-family: monospace;">${verificationCode}</span>
              </div>
              
              <p style="margin: 25px 0 0 0; color: #6b7280; font-size: 13px;">
                This code will expire in <strong style="color: #ec4899;">10 minutes</strong>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background: rgba(0, 0, 0, 0.3); border-radius: 0 0 16px 16px; border-top: 1px solid rgba(99, 102, 241, 0.1);">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 13px;">
                      If you didn't request this code, please ignore this email.
                    </p>
                    <p style="margin: 15px 0 0 0; color: #4b5563; font-size: 12px;">
                      © ${new Date().getFullYear()} TECHNOVA. All rights reserved.
                    </p>
                    <p style="margin: 10px 0 0 0;">
                      <a href="https://globaltechnova.com" style="color: #06b6d4; text-decoration: none; font-size: 12px;">globaltechnova.com</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  const emailInfo = await transporter.sendMail(mailOptions);

  if (emailInfo.accepted.length) {
    console.log(`✅ Verification code sent successfully to: ${toEmail}`);
    return true;
  }

  console.log(`❌ Failed to send verification code to: ${toEmail}`);
  return false;
};