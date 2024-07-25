const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class DishImageController {
    async update(request, response) {
        const { dish_id } = request.params;
        const imageFilename = request.file;

        const diskStorage = new DiskStorage();

        const dish = await knex("dishes")
            .where({ id: dish_id })

        if(!dish) {
            throw new AppError("Não foi possivel atualizar a imagem do prato", 401);
        }

        if (dish.image) {
            await diskStorage.deleteFile(dish.image);
        }

        const filename = await diskStorage.saveFile(imageFilename);
        dish.image = filename;

        await knex("dishes")
            .where({ id: dish_id })
            .update({ image: filename });

        return response.json(dish);
    }
}

module.exports = DishImageController;