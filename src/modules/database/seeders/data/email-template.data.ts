import {
  EmailTemplateScope,
  EmailTemplateStatus,
} from '@common/constants/enum/email.enum';

export const emailTemplateData = [
  {
    title: 'Verification code received',
    content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signup</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    body {
      font-family: 'Inter', Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #7BB58C;
      color: #ffffff;
      text-align: center;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .content {
      padding: 20px;
      font-size: 16px;
      color: #333;
      line-height: 1.5;
    }
    .code {
      font-size: 32px;
      font-weight: 400;
      letter-spacing: 2px;
      text-align: center;
      padding: 15px;
      background: #f7f7f9;
      border-radius: 5px;
      margin: 20px 0;
    }
    .footer {
      text-align: left;
      font-size: 14px;
      color: #000000;
      padding: 15px;
      font-weight: bold;
    }
  </style>
</head>
<body>
<div class="container">
  <div class="header">Verify Email Address</div>
  <div class="content">
    <p>Please verify your email address. Use the verification code below:</p>
    <div class="code">{{otp}}</div>
    <p>For security reasons, we recommend that you do not share this code with anyone.</p>
    <p>Thank you for your cooperation. We hope you have a great experience with our system.</p>
  </div>
  <div class="footer">Sincerely,<br>Redeemer</div>
</div>
</body>
</html>
`,
    scope: EmailTemplateScope.OTP,
    status: EmailTemplateStatus.ACTIVE,
  },
];
