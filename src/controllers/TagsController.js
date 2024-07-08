const knex = require("../database/knex");

class TagsController {
    async index(request, response) {
        const { dish_id } = request.params;

        const tags = await knex("tags")
            .where({ dish_id })

        return response.json(tags);
    }
}

module.exports = TagsController;