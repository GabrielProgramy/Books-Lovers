import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import fastifyMongo from "@fastify/mongodb";

async function dbConnector(fastify: FastifyInstance, options: Object): Promise<void> {
	fastify.register(fastifyMongo, {
		...options,
		url: "mongodb://localhost:27017/book_lovers"
	})
}

export default fastifyPlugin(dbConnector) 