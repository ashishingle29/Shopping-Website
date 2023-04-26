import express from 'express'
import formidable from 'express-formidable';
import { checkAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { addCarouselController, deleteCarouselItemController, getCarouselItemsController, getCarouselPhotoController, updateCarouselController } from './../controllers/carouselController.js';

const router=express.Router();
router.post('/add',requireSignIn,checkAdmin,formidable(),addCarouselController);
router.put('/update/:id',requireSignIn,checkAdmin,formidable(),updateCarouselController);
router.get('/get-photo/:id',getCarouselPhotoController);
router.get('/get-items',getCarouselItemsController);
router.delete('/delete/:id',requireSignIn,checkAdmin,deleteCarouselItemController);



export default router;
