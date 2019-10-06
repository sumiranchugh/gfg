import ProductController from "./ProductController";
import { Router } from "express";
const router = Router();
const productController = new ProductController();
/* GET filtered products listing. */
router.get("/filter", productController.filterProducts);

/* GET top products listing. */
router.get("/", productController.getProducts);

export default router;
