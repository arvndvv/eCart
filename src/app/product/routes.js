const router = require('express').Router();
const productController = require('./controller');
const multerInstance = require('../../config/multer');

router.post("/", productController.restrictUser, multerInstance.upload.single('image'), productController.createProduct);
router.get('/', productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.restrictUser, productController.removeProduct);

module.exports = router;