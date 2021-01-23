const router = require("express").Router();
const { validateUser } = require("../middlewares/authmiddleware");
const userController = require("./controller");
router.post("/register", userController.regUser);
router.post("/login", userController.authUser);
app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname + './frontEnd/dist/expense-app/index.html'));
});

router.use("/", validateUser, userController.bypassLogin);
// router.get("/", cartController.getCart);
// router.delete("/empty-cart", cartController.emptyCart);
// router.delete('/subtract/:id', cartController.subtractItem);

// router.delete('/remove/:id', cartController.removeItem);
module.exports = router;