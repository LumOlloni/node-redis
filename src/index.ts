import server from "./server";

const FASTIFY_PORT = Number(process.env.FASTIFY_PORT)
 || 3006;

const start = () => {
  try {
    server.listen({ port: FASTIFY_PORT });
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start();