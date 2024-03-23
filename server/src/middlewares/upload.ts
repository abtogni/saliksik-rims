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
        const originalname = file.originalname;
        const folder = req.headers["addFolder"];
        const id = req.params.id;
        const dir = folder == "true" ? `./public/uploads/${id}/conceptNote` : `./public/uploads/${id}`;
        const ext = path.extname(originalname);
        const basename = path.basename(originalname, ext);

        let count = 0;
        let filename = originalname;

        while (fs.existsSync(path.join(dir, filename))) {
            count++;
            filename = `${basename}_${count}${ext}`;
        }

        cb(null, filename);
    }
});

export const upload = multer({ storage });
