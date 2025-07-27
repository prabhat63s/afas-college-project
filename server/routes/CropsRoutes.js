import express from 'express';
import { createCropController, deleteCropController, findCropController, getCropController, getSingleCrop, test, updateCropController } from '../controllers/cropController.js';

const router = express.Router();
router.post('/create-crop',createCropController);
router.put('/update-crop/:pid',updateCropController);
//get products
router.get('/get-crop',getCropController);
//single products
router.get("/get-crop/:slug",getSingleCrop);

//get the photo 

// router.get("/product-photo/:pid",productPhotoController);
//to delete products
router.delete('/delete-crop/:pid',deleteCropController);
router.get('/test',(req,res)=>{res.send("ok")});
//get the crop with the particular category
router.get("/find-crop/:id",findCropController);
export default router;