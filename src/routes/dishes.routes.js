const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const DishesController = require("../controllers/DishesController");
const DishImageController = require("../controllers/DishImageController");

const dishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const dishesController = new DishesController();
const dishImageController = new DishImageController();

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.delete("/:id", dishesController.delete);
dishesRoutes.patch("/image", upload.single("image"), dishImageController.update);

module.exports = dishesRoutes;