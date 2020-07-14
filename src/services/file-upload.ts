import { Request } from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const SECRET_ACCESS_KEY = '9tVC4PAL6yamlQuJ/4t67P4KwWCEGV8l6+ASWjXo';
const ACCESS_KEY_ID = 'AKIA4T4676B7SGPAR4SC';
const REGION = 'us-west-1';
const BUCKET = 'elasticbeanstalk-us-west-1-867379966079';

aws.config.update({
  secretAccessKey: SECRET_ACCESS_KEY,
  accessKeyId: ACCESS_KEY_ID,
  region: REGION,
});

const s3 = new aws.S3();
//
//  const fileFilter = (req: any, file: any, cb: any) => {
//    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
//      cb(null, true)
//    } else {
//      cb(new Error('Invalid Mine type, only JPEG and PNG'))
//    }
// }

const upload = multer({
  storage: multerS3({
    // fileFilter,
    s3: s3,
    bucket: BUCKET,
    acl: 'public-read',
    metadata: function (req: Request, file: any, cb) {
      cb(null, { fieldName: `_petsLove_${uuidv4()}_${path.extname(file.originalname)}` });
    },
    key: function (req: Request, file: any, cb) {
      cb(null, `_petsLove_${uuidv4()}_${path.extname(file.originalname)}`);
    },
  }),
});

export default upload;
