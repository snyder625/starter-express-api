import express from 'express';
import { addProduct, addReview, allProducts, deleteProduct, specificProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', allProducts)
router.get('/:id', specificProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.post('/', addProduct)
router.put('/:productId/reviews', addReview)

export default router