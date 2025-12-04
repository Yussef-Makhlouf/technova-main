export const emailTemplate = ({ link, linkData, subject }) => {
    return `<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        body {
            margin: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a0f1e 0%, #1a1f3a 100%);
            padding: 40px 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: linear-gradient(135deg, #0d1428 0%, #1a1f3a 100%);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4), 0 0 1px rgba(139, 92, 246, 0.3);
            border: 1px solid rgba(139, 92, 246, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #0a0f1e 0%, #1a1f3a 100%);
            padding: 30px 20px;
            text-align: center;
            border-bottom: 1px solid rgba(139, 92, 246, 0.2);
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%);
        }
        .header img {
            max-height: 50px;
            margin-bottom: 15px;
        }
        .logo-text {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 2px;
            margin: 10px 0;
        }
        .header a {
            color: #06b6d4;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        .header a:hover {
            color: #8b5cf6;
        }
        .content {
            padding: 40px 30px;
            text-align: center;
            color: #e2e8f0;
        }
        .content h1 {
            background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 20px;
            line-height: 1.3;
        }
        .content p {
            color: #94a3b8;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 14px 32px;
            background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
            border: none;
            letter-spacing: 0.5px;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 25px rgba(139, 92, 246, 0.4);
        }
        .footer {
            padding: 25px 30px;
            text-align: center;
            color: #64748b;
            font-size: 13px;
            background: rgba(10, 15, 30, 0.5);
            border-top: 1px solid rgba(139, 92, 246, 0.1);
        }
        .footer a {
            color: #06b6d4;
            text-decoration: none;
        }
        .footer a:hover {
            color: #8b5cf6;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%);
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo-text">TECHNOVA</div>
            <div><a href="https://globaltechnova.com/" target="_blank">View in Website</a></div>
        </div>
        <div class="content">
            <h1>${subject}</h1>
            <div class="divider"></div>
            <p>Click the button below to continue:</p>
            <a href="${link}" class="button">${linkData}</a>
        </div>
        <div class="footer">
            Stay in touch<br/>
            &copy; ${new Date().getFullYear()} TECHNOVA. All rights reserved.
        </div>
    </div>
</body>
</html>`;

}
