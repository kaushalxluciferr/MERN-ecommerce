import multer from 'multer';


const upload = multer({ 
    storage: multer.diskStorage({}),
    limits:{fileSize:500000} });

export default upload;
