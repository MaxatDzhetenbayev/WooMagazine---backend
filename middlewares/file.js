import multer from 'multer';
import { v4 as uuid } from 'uuid';


const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'sources/images/')
	},
	filename: (req, file, cb) => {
		cb(null, uuid() + '-' + file.originalname)
	}
})


const fileTypes = ['image/png', 'image/jpg', 'image/jpeg']


const fileFilter = (req, file, cb) => {
	if (fileTypes.includes(file.mimetype)) {
		cb(null, true)
	} else {
		cb(null, false)
	}
}


export const mult = multer({ storage, fileFilter })