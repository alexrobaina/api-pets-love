## How to run this project in you localhost?

1 - You need to install nodejs from https://nodejs.org/

2 - Rename .env.example to .env and fill in the credentials.
The defaults is enough to make the API run, but you need S3 credentials to do image-uploads and gmail credentials to send "forgot password"-emails.

3 - Install MongoDB and run a database

- Run MongoDB using docker: `npm run mongodb`

- Or install it manually: https://docs.mongodb.com/manual/

4 - When you've cloned this project you need to install the dependencies with `npm install`

5 - Finally execute `npm run dev`

:D
