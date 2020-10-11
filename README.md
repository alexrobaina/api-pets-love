## How to run this project in you localhost?

1 - You need to install nodejs: https://nodejs.org/

2 - Install mongodb and run database

* Run MongoDB using docker: ```npm run mongodb```

* Or install it manually: https://docs.mongodb.com/manual/

3 - Rename .env.example to .env and fill in the credentials. The defaults is enough to make the api run, but you beed S3 credentials for image upload and gmail credentials to send forgot password emails.

4 - When you clone this project you need install dependencies with: ```npm install```

5 - Finally execute: ```npm run dev```

:D