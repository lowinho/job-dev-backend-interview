import multer from "multer";
import { extname, resolve } from "path";

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
    fileFilter: (req: any, file: any, callback: any) => {
        if (
          file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
              //@ts-ignore
            return callback(new multer.MulterError('Type file error'));
        }

        return callback(null, true);
    },

    storage: multer.diskStorage({
        destination: (req, file, callback) => {
    
            callback(null, resolve(__dirname, "..", "uploads", "images", "product"));
        },
        // nome do arquivo salvo
        filename: (req, file, callback) => {
            callback(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
        },
    }),
};
