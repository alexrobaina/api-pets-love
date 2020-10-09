export const templateForgotPassword = (urlResetPassword: any) => {
  return `<html>
  <style type="text/css">
      @import 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap';
  
  
      body {
          background-color: #f6f4ff;
          font-family: 'Source Sans Pro', sans-serif;
          font-weight: 700;
          font-size: calc(10px + 4vw);
          color: #091e6e;
          text-align: center;
          display: flex;
      }
  
      #container {
          margin: auto;
          display: block;
          width: 100%;
  
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
  
      img {
          width: calc(150px + 15vw);
          height: calc(150px + 15vw);
          margin: auto;
          display: block;
      }
  
      footer {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 20px;
          font-style: normal;
          font-weight: 100;
          color: black;
          bottom: 0;
          position: fixed;
          width: 100%;
          margin: 30px 0;
  
  
      }
  </style>
  
  <body>
      <div id="container">
          <div class="app-name">Reset your password</div>
          <img src="/forgotten-password.jpg">
          <div class="button-holder">
              <a href="${urlResetPassword}" class="primary" type="button">Change Password</a>
          </div>
      </div>
      <footer>Pets love 🦜</footer>
  </body>
  
  </html>`;
};
