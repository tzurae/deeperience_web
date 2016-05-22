import path from 'path';
import multer from 'multer';

// parse multipart/form-data
let uploadToDisk = multer({
  dest: path.join(__dirname, '../../public/uploads'),
});

let uploadToMemory = multer({
  storage: multer.memoryStorage(),
});

export default {
  disk: uploadToDisk,
  memory: uploadToMemory,
};
