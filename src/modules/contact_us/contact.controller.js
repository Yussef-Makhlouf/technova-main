import { sendContactUsEmailService } from "../../services/contactEmail.js";
import CustomError from "../../utilities/customError.js"

export const sendContactUsEmail = async (req, res, next) => {

  const { name, email, phone, message, service, services, projects } = req.body;

  // Support both 'service' (string) and 'services' (array) for backwards compatibility
  const servicesArray = services || (service ? [service] : []);
  // Handle projects array (optional field)
  const projectsArray = Array.isArray(projects) ? projects : [];

  if (!name || !email || !phone || !message || servicesArray.length === 0) {
    return next(new CustomError("Please provide name, email, message and at least one service", 400));
  }

  // optional: basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new CustomError("Invalid email format", 400));
  }

  try {
    await sendContactUsEmailService({ name, email, phone, services: servicesArray, projects: projectsArray, message });

    return res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return next(new CustomError("Failed to send email. Please try again later.", 500));
  }
};
