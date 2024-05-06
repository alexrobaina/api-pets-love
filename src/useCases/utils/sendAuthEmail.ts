import { config } from '../../config/config';
import { mailer } from '../../services/mailer';

export async function sendAuthEmail(email: string, token: string, texts: {
    subject: string;
    hello: string;
    loginDescription: string;
    login: string;
    warning: string;
    thanks: string;
    welcome: string;
}) {
  const loginUrl = `${config.HOST}/login?token=${token}`;
  
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login to Your Account</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #ace3d3;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border: 1px solid #ddd;
              border-radius: 8px;
              overflow: hidden;
          }
          .email-header {
              background-color: #4fb29c;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              border-top-left-radius: 7px;
              border-top-right-radius: 7px;
          }
          .email-body {
              padding: 20px;
              text-align: center;
              line-height: 1.5;
          }
          .email-footer {
              font-size: 12px;
              color: #777;
              padding: 20px;
              text-align: center;
              background-color: #f9f9f9;
              border-bottom-left-radius: 7px;
              border-bottom-right-radius: 7px;
          }
          .button {
              padding: 10px 20px;
              color: #ffffff !important;
              background-color: #1f423d;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
              display: inline-block;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="email-header">
              <h1>${texts.welcome} Pet's Love</h1>
          </div>
          <div class="email-body">
              <p>${texts.hello}</p>
              <p>${texts.loginDescription}</p>
              <a href="${loginUrl}" class="button">${texts.login}</a>
              <p>${texts.warning}</p>
          </div>
          <div class="email-footer">
              <p>${texts.thanks}</p>
              <p>&copy; 2023 Our Service, Inc.</p>
          </div>
      </div>
  </body>
  </html>
  `;

  const subject = `${texts.subject} Pet's Love`;
  const text = `${texts.hello}\n${texts.loginDescription}\n${loginUrl}\n${texts.warning}\n${texts.thanks}`;

  await mailer.send('alex@petslove.app', email, subject, text, html);
}
