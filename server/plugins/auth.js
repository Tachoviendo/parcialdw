import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
export default fp(async (fastify) => {
  const secreto = process.env.JWT_SECRET;
  if (!secreto) throw new Error("No especificaste FASTIFY_SECRET");
  fastify.register(jwt, {
    secret: secreto,
  });
  fastify.decorate("authenticate", async function (request, reply) {
    await request.jwtVerify();
  });
});
