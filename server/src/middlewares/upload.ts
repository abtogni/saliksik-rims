import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        const folder = req.headers["addFolder"];
        const id = req.params.id;
        const dir = folder == "true" ? `./public/uploads/${id}/conceptNote` : `./public/uploads/${id}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const fileName = req.headers["filename"] || "undefined";
        const extension = path.extname(file.originalname);
        cb(null, `${fileName}${extension}`);
    }
});

export const upload = multer({ storage });
