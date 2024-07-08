const knex = require("../database/knex");

class DishesController {
    async create(request, response) {
        const { name, description, price, tags } = request.body;

        const [dish_id] = await knex("dishes").insert({
            name,
            description,
            price
        });

        const tagsInsert = tags.map(name => {
            return {
                dish_id,
                name
            }
        });

        await knex("tags").insert(tagsInsert);

        response.json();

    }

    async show(request, response) {
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();
        const tags = await knex("tags").where({ dish_id: id }).orderBy("name");

        return response.json({
            ...dish,
            tags
        });
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { name, tags } = request.query;

        let dishes;

        if(tags) {
            const filterTags = tags.split(',').map(tag => tag.trim());

            dishes = await knex("tags")
                .select([
                    "dishes.id",
                    "dishes.name",
                ])
                .whereIn("name", filterTags)
                .whereLike("dishes.name", `%${name}%`)
                .innerJoin("dishes", "tags.dish_id")
                .orderBy("dishes.name")

        } else {

            dishes = await knex("dishes")
                .whereLike("name", `%${name}%`)
                .orderBy("name");
        }

        const dishesWithTags = dishes.map(dish => {
            const dishTags = dishTags.filter(tag => tag.dish_id === dish.id);

            return {
                ...dish,
                tags: dishTags
            }
        });

        return response.json(dishesWithTags);
    }
}

module.exports = DishesController;