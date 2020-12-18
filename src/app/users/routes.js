const router = require("express").Router();
const userController = require("./controller");
router.post("/register", userController.regUser);
router.post("/login", userController.authUser);
router.get("/", userController.informUser);
// router.get("/", cartController.getCart);
// router.delete("/empty-cart", cartController.emptyCart);
// router.delete('/subtract/:id', cartController.subtractItem);

// router.delete('/remove/:id', cartController.removeItem);
module.exports = router;