import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const id = req.params.id;
        const dir = `./public/uploads/${id}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const { id } = req.params;
        const extension = path.extname(file.originalname);
        cb(null, `${id}${extension}`);
    }
});

export const upload = multer({ storage });
