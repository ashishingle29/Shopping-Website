import express from 'express'
import { checkAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import {
  addProductController,
  brainTreePaymentController,
  brainTreeTokenController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  getSingleProductPhotoController,
  productByCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  relatedProductController,
  searchProductController,
  updateProductController,
} from "./../controllers/productController.js";
import formidable from 'express-formidable';

const  router=express.Router();


router.post('/add-product',requireSignIn,checkAdmin,formidable(),addProductController);
router.delete('/delete-product/:id',requireSignIn,checkAdmin,deleteProductController);
router.put('/update-product/:id',requireSignIn,checkAdmin,formidable(),updateProductController);


router.get('/get-products',getProductsController);
router.get('/get-product/:slug',getSingleProductController);
router.get('/get-photo/:id',getSingleProductPhotoController);

router.post('/product-filters',productFiltersController);

router.get('/product-count',productCountController);
router.get("/product-list/:page", productListController);
router.get("/search/:keyword", searchProductController);
router.get("/related-product/:pid/:cid", relatedProductController);
router.get("/category-product/:slug", productByCategoryController);

router.get("/braintree/token",brainTreeTokenController);
router.post("/braintree/payment",requireSignIn,brainTreePaymentController);
export default router;
