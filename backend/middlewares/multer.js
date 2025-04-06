import multer from "multer";

const storage = multer.memoryStorage(); // You can also use diskStorage if you want to save it
const upload = multer({ storage: storage });
export default upload;
