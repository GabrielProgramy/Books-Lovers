import { FastifyReply, FastifyRequest } from "fastify";
import { UsersService } from "../../services/users.service"
import { User } from "../../data/models/user.model";

export class UsersController {

	constructor(private usersService: UsersService) {

		this.usersService = usersService;
		this.createUser = this.createUser.bind(this)
	}

	async createUser(req: FastifyRequest<{ Body: User }>, reply: FastifyReply): Promise<FastifyReply> {
		const user = req.body

		const newUser = await this.usersService.createUser(user)

		return reply.code(201).send(newUser)
	}
}