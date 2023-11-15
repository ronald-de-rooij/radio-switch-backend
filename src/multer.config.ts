import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads', // Set the destination folder for uploaded files
    filename: (req, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.slice(
        file.originalname.lastIndexOf('.'),
      );
      callback(null, `${uniqueSuffix + extension}`);
    },
  }),
  limits: {
    fileSize: 20000000, // 20MB - TODO - make this configurable
  },
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('File is not an image'), false);
    }

    callback(null, true);
  },
};

export default multerOptions;
