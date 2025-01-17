import fastify from 'fastify'
import dbConnection from './plugins/mongodb'
import usersRoutes from './http/routes/users.routes'

const server = fastify({
	logger: true
})

server.register(dbConnection)
server.register(usersRoutes, { prefix: 'users' })

server.listen({ port: 3000 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}

	console.log(`Server listening on port ${address.split(':').pop()}`)
})
