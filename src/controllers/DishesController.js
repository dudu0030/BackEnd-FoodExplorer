const knex = require("../database/knex");

class DishesController {
    async create(request, response) {
        const { name, description, price } = request.body;

        const id = await knex("dishes").insert({
            name,
            description,
            price
        });

        response.json();

    }

    async show(request, response) {
        const { id } = request.params;

        const dish = await knex("dishes").where({ id }).first();

        return response.json(dish);
    }

    async delete(request, response) {
        const { id } = request.params;

        await knex("dishes").where({ id }).delete();

        return response.json();
    }

    async index(request, response) {
        const { name } = request.query;

        const dishes = await knex("dishes")
        .whereLike("name", `%${name}%`)
        .orderBy("name");

        return response.json(dishes);
    }
}

module.exports = DishesController;