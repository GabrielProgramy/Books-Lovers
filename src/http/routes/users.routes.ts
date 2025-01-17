import { FastifyInstance } from "fastify";
import { UsersRepository } from "../../data/repositories/users.repository";
import { UsersService } from "../../services/users.service";
import { UsersController } from "../controller/users.controller";


export default async function usersRoutes(fastify: FastifyInstance) {
	if (fastify.mongo.db) {
		const repository = new UsersRepository(fastify.mongo.db)
		const service = new UsersService(repository)

		const controller = new UsersController(service)

		fastify.post('/create', controller.createUser)
	}
}