import {Router} from 'express'
import UserController from '../controllers/UserController';
import CheckAuth from "../middleware/check-auth" 
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './../next-tailwind/public/img/');
        // cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() 
        .replace(/-/, '').replace(/-/, '')
        .replace(/T/, '')
        .replace(/:/, '').replace(/:/, '')
        .replace(/\..+/, '') + '-'+ file.originalname.replaceAll(" ", "_") );
    }
});
const fileFilter = (req,file,cb) => {
    // tolak file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload = multer({ 
    storage: storage, 
    limits: { 
        fileSize : 1024 * 1024 * 5 // 5 MB
    },
    fileFilter:fileFilter
});

router.get('/users',CheckAuth,UserController.getAllUsers);
router.post('/users',UserController.addUser);
router.get('/users/:id',CheckAuth,UserController.getAUser);
router.put('/users/:id',CheckAuth,UserController.updatedUser);
router.delete('/users/:id',CheckAuth,UserController.deleteUser);
router.post('/users/upload/:id',upload.single('img_url'), CheckAuth,UserController.uploadUser);
router.post('/login',UserController.loginUser);


export default router;