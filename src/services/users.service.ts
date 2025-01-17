import { User } from "../data/models/user.model";
import { UsersRepository } from "../data/repositories/users.repository";
import { hashPassword } from "../utils/auth.utils";

export class UsersService {
	repository: UsersRepository

	constructor(repository: UsersRepository) {
		this.repository = repository;
	}

	async createUser(user: Omit<User, '_id'>): Promise<User | null> {
		const userAlreadyExists = await this.repository.findOne({ email: user.email })

		if (userAlreadyExists) throw new Error('User already exists!')

		user.password = await hashPassword(user.password)
		user.followers = []
		user.following = []
		user.birthdate = new Date(user.birthdate)

		return this.repository.createUser(user)
	}

	async findUser(filters: Partial<User>): Promise<User> {
		const user = await this.repository.findOne(filters)

		if (!user) throw new Error('User not found')

		return user
	}

	async listUsers(user: Partial<User>): Promise<User[] | null> {
		return await this.repository.findAll(user)
	}

	async updateUser({ _id, ...user }: Partial<User>): Promise<User | null> {
		await this.findUser({ _id: _id })

		const updateUser = this.repository.updateUser({ _id, ...user })

		return updateUser
	}

	async deleteUser(userId: string): Promise<void> {
		await this.repository.deleteOne(userId)
	}

	async deleteMany(usersIds: string[]): Promise<void> {
		await this.repository.deleteAll(usersIds)
	}
}