const router = require("express").Router();
const userController = require("./controller");
router.post("/register", userController.regUser);
router.post("/auth", userController.authUser);
// router.get("/", cartController.getCart);
// router.delete("/empty-cart", cartController.emptyCart);
// router.delete('/subtract/:id', cartController.subtractItem);

// router.delete('/remove/:id', cartController.removeItem);
module.exports = router;