// import { Request } from 'express';
// import * as dotenv from 'dotenv';
// import aws from 'aws-sdk';
// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import { v4 as uuidv4 } from 'uuid';
// import path from 'path';
// import { config } from '../config/config';

// dotenv.config();

// aws.config.update({
//   secretAccessKey: config.awsConfig.SECRET_ACCESS_KEY,
//   accessKeyId: config.awsConfig.ACCESS_KEY_ID,
//   region: config.awsConfig.REGION,
// });

// const s3 = new aws.S3();

// // const fileFilter = (req: any, file: any, cb: any) => {
// //   if (
// //     file.mimetype === 'image/jpeg' ||
// //     file.mimetype === 'image/jpg' ||
// //     file.mimetype === 'image/png'
// //   ) {
// //     cb(null, true);
// //   } else {
// //     cb(new Error('Invalid Mine type, only JPEG and PNG'));
// //   }
// // };

// const upload = multer({
//   storage: multerS3({
//     // fileFilter,
//     s3: s3,
//     bucket: (req: any, file: any, cb) => {
//       let bucketName = '';

//       if (req.route.path === '/pet') {
//         bucketName = config.awsConfig.PET_BUCKET_FOLDER;
//       }

//       if (req.route.path === '/user') {
//         bucketName = config.awsConfig.USER_BUCKET_FOLDER;
//       }
//       cb(null, `${config.awsConfig.BUCKET}/${bucketName}`);
//     },
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     metadata: function (req: Request, file: any, cb) {
//       cb(null, { fieldName: `_petsLove_${uuidv4()}_${path.extname(file.originalname)}` });
//     },
//     key: function (req: Request, file: any, cb) {
//       cb(null, `_petsLove_${uuidv4()}_${path.extname(file.originalname)}`);
//     },
//   }),
// });

// export default upload;
