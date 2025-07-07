//this file is for multer middlreware the use of multer is 

import e from "express"
import multer from "multer"

const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

const upload = multer({storage})

export default upload