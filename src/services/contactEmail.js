import nodemailer from 'nodemailer'

// TECHNOVA Futuristic Email Template
const createEmailTemplate = ({ name, email, phone, services, projects, message }) => {
  // Format services array into display string
  const servicesDisplay = Array.isArray(services) && services.length > 0
    ? services.join(', ')
    : (services || 'Not specified');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Message - TECHNOVA</title>
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
              <span style="display: inline-block; padding: 8px 20px; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); border-radius: 50px; color: #06b6d4; font-size: 12px; font-weight: 600; letter-spacing: 1px;">
                ● NEW MESSAGE RECEIVED
              </span>
            </td>
          </tr>
          
          <!-- Title -->
          <tr>
            <td style="padding: 20px 40px 10px 40px; text-align: center;">
              <h2 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff;">Contact Form Submission</h2>
              <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 14px;">A visitor has sent you a message through the website</p>
            </td>
          </tr>
          
          <!-- Content Box -->
          <tr>
            <td style="padding: 30px 40px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: rgba(255, 255, 255, 0.02); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.05);">
                
                <!-- Sender Name -->
                <tr>
                  <td style="padding: 20px 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td width="40" valign="top">
                          <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #06b6d4, #8b5cf6); border-radius: 10px; text-align: center; line-height: 40px; color: #ffffff; font-size: 18px; font-weight: 600;">
                            ${name.charAt(0).toUpperCase()}
                          </div>
                        </td>
                        <td style="padding-left: 15px;">
                          <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                          <p style="margin: 5px 0 0 0; color: #ffffff; font-size: 16px; font-weight: 500;">${name}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
                <!-- Sender Email -->
                <tr>
                  <td style="padding: 20px 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email Address</p>
                    <a href="mailto:${email}" style="display: inline-block; margin: 8px 0 0 0; color: #06b6d4; font-size: 15px; text-decoration: none; font-weight: 500;">${email}</a>
                  </td>
                </tr>
                
                <!-- Phone Number -->
                <tr>
                  <td style="padding: 20px 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">📱 Phone Number</p>
                    <a href="tel:${phone}" style="display: inline-block; margin: 8px 0 0 0; color: #8b5cf6; font-size: 15px; text-decoration: none; font-weight: 500;">${phone || 'Not provided'}</a>
                  </td>
                </tr>
                
                <!-- Services Interested -->
                <tr>
                  <td style="padding: 20px 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">🎯 Services Interested In</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                      ${Array.isArray(services) && services.length > 0
      ? services.map(service => `
                          <span style="display: inline-block; padding: 6px 14px; background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(6, 182, 212, 0.15)); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 20px; color: #c4b5fd; font-size: 13px; font-weight: 500; margin: 4px 4px 4px 0;">${service}</span>
                        `).join('')
      : `<span style="color: #9ca3af; font-size: 14px;">${services || 'Not specified'}</span>`
    }
                    </div>
                  </td>
                </tr>
                
                <!-- Message -->
                <tr>
                  <td style="padding: 25px;">
                    <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">💬 Message</p>
                    <div style="background: rgba(6, 182, 212, 0.05); border-left: 3px solid #06b6d4; border-radius: 0 8px 8px 0; padding: 20px;">
                      <p style="margin: 0; color: #e5e7eb; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
                    </div>
                  </td>
                </tr>
                
                <!-- Products Interested -->
                ${Array.isArray(projects) && projects.length > 0 ? `
                <tr>
                  <td style="padding: 20px 25px; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                    <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">🚀 AI Products Interest</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                      ${projects.map(product => `
                        <span style="display: inline-block; padding: 6px 14px; background: linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15)); border: 1px solid rgba(236, 72, 153, 0.3); border-radius: 20px; color: #f472b6; font-size: 13px; font-weight: 500; margin: 4px 4px 4px 0;">${product}</span>
                      `).join('')}
                    </div>
                  </td>
                </tr>
                ` : ''}
                
              </table>
            </td>
          </tr>
          
          <!-- Quick Reply Button -->
          <tr>
            <td style="padding: 0 40px 30px 40px; text-align: center;">
              <a href="mailto:${email}?subject=Re: Your message to TECHNOVA" style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #06b6d4, #8b5cf6); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; border-radius: 8px; text-transform: uppercase; letter-spacing: 1px;">
                Reply to ${name.split(' ')[0]} →
              </a>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background: rgba(0, 0, 0, 0.3); border-radius: 0 0 16px 16px; border-top: 1px solid rgba(99, 102, 241, 0.1);">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; color: #6b7280; font-size: 13px;">
                      This message was sent from your website's contact form
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

export const sendContactUsEmailService = async ({ name, email, phone, services, projects, message }) => {
  const smtpPort = parseInt(process.env.SMTP_PORT) || 465;
  const isSecure = smtpPort === 465; // True for 465, false for other ports

  console.log(`📧 Contact Form - SMTP Config: Host=${process.env.SMTP_HOST || 'mail.globaltechnova.com'}, Port=${smtpPort}, Secure=${isSecure}`);

  // Create transporter with proper timeout settings to prevent 504 Gateway Timeout
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
    connectionTimeout: 15000, // 15 seconds to connect
    greetingTimeout: 15000,   // 15 seconds for greeting
    socketTimeout: 30000,     // 30 seconds for socket operations
    // Disable pooling for simpler connection handling
    pool: false,
    // Debug output
    debug: true,
    logger: true
  });

  const mailOptions = {
    from: `"TECHNOVA Contact" <info@globaltechnova.com>`,
    replyTo: `"${name}" <${email}>`,
    to: process.env.OWNER || 'info@globaltechnova.com',
    subject: `✨ New Contact Message from ${name}`,
    html: createEmailTemplate({ name, email, phone, services, projects, message }),
  };

  await transporter.sendMail(mailOptions);

  return true;
};
