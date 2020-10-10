export const templateForgotPassword = (urlResetPassword: any) => {
  return `<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Pets</title>
      <style type="text/css">
      @import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap';
  
      body {
        display: flex;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 700;
        font-size: calc(10px + 4vw);
        color: #091e6e;
      }
  
      .container {
        background-color: #f6f4ff;
        max-height: 100%;
        max-width: 100%;
        margin: 20px;
        border-radius: 20px;
      }
  
      .primary {
        color: #091e6e;
        background-color: rgb(255, 255, 255);
        border: none;
        border-radius: 50px;
        font-size: calc(5px + 1vw);
        letter-spacing: 1.5px;
        padding: 13px;
        width: 23vw;
        transition: 0.3s;
        cursor: pointer;
        display: block;
        text-decoration: none;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 700;
      }
  
      .button-holder {
        margin: auto;
        display: block;
        width: fit-content;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left: 50px;
        padding-right: 50px
      }
  
      .primary:hover {
        background-color: #5E92F3;
        color: #ffffff;
        transform: translateY(-0.25em);
      }
  
      .primary:hover {
        box-shadow: 0 7px 22px -2px rgba(0, 0, 0, 0.25);
      }
  
      .primary:focus {
        background-color: #5E92F3;
        transform: translateY(-0.25em);
      }
  
      .primary:focus {
        box-shadow: 0 7px 22px -2px rgba(0, 0, 0, 0.25);
      }
  
      .image {
        margin-top: 40px;
        width: calc(150px + 15vw);
        height: auto;
        margin: auto;
        display: block;
      }

      .title {
        text-align: center;
        padding-top: 50px;
        margin-bottom: 24px;
        font-size: 25px;
        font-weight: 600;
        color: #091e6e;
      }
  
      .footer {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        margin-top: 50px;
        text-align: center;
        padding-bottom: 50px;
        font-style: normal;
        font-weight: 100;
        color: #091e6e;
      }

    </style>
</head>
  <body>
    <div class="container" bgcolor="#f6f4ff" border="0" cellpadding="0" cellspacing="0">
          <div class="title">Reset your password</div>
          <img class="image" src="https://elasticbeanstalk-us-west-1-867379966079.s3-us-west-1.amazonaws.com/forgot-password-image/forgotpassword.jpg"></img>
          <div class="button-holder">
              <a href="${urlResetPassword}" class="primary" type="button">Change Password</a>
          </div>
          <div class="footer">Pets love 🦜</div>
      </div> 
    </div>
  </body>
</html>`;
};
