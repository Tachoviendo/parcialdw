import { tareaSchema, tareaShcemaPost } from "../schemas/tareaSchemas.js"
import { tareasRepo } from "../repositories/tareas.js"
import { Type } from "@sinclair/typebox"
import { NotFoundError, transformarErrorPostgres } from "../errors/errores.js"

const tareasRoutes = async (fastify, _opts) => {

    

    fastify.get("/tareas", {
        schema: {
            tags: ["tareas"],
            summary: "Listar todas las tareas!",
            response: {
                200: Type.Array(tareaSchema)
            }
        }  
    },
        async function (_request, _reply) {

            try {
                return await tareasRepo.getAll();
                
            } catch (error) {
                return NotFoundError
            }
            
        },
        
    )

    fastify.get("/tareas/:id_tarea", {
        schema: {
            tags: ["tareas"],
            summary: "Obtener una tarea!",
            params:Type.Object({
                id_tarea: Type.Integer()
            }),
            response: {
                200: tareaSchema
            }
        }  
    },
        async function (request, reply) {

            try {

                return await tareasRepo.obtenerPorId(request.params.id_tarea);
                
            } catch (error) {
                return NotFoundError
            }
            
        },
        
    )

    fastify.post("/tareas", {
        preHandler: [fastify.authenticate],

        schema: {
            security: [{ bearerAuth: [] }],
            tags: ["tareas"],
            summary: "crear una tarea",

            body:tareaShcemaPost,
            
            response: {
                200: tareaSchema
            }
        }  
    },
        async function (request, reply) {

            try {
                const tarea = await tareasRepo.crear(request.user.id_usuario, request.body)

                return reply.code(200).send(tarea)
            } catch (error) {
                throw transformarErrorPostgres(error)
            }
            
        },
        
    )

    fastify.post("/tareas/:id_tarea/finalizar", {
        preHandler: [fastify.authenticate],

        schema: {
            security: [{ bearerAuth: [] }],
            tags: ["tareas"],
            params:Type.Object({
                id_tarea: Type.Integer()
            }),

            summary: "finalizar una tarea",
            response: {
                200: tareaSchema
            }
        }  
    },
        async function (request, reply) {

            const tarea = await tareasRepo.finalizar(request.params.id_tarea)

            return reply.code(200).send(tarea)
            
        },

    )

    fastify.patch("/tareas/:id_tarea", {
        preHandler: [fastify.authenticate],

        schema: {
            security: [{ bearerAuth: [] }],
            tags: ["tareas"],
            summary: "editar una tarea",
            params:Type.Object({
                id_tarea: Type.Integer()
            }),
            body: Type.Partial(tareaShcemaPost),
            response: {
                200: tareaSchema
            }
        }
    },
        async function (request, reply) {

            try {
                const tarea = await tareasRepo.actualizar(request.params.id_tarea, request.body)

                return reply.code(200).send(tarea)
            } catch (error) {
                throw transformarErrorPostgres(error)
            }

        },

    )

    fastify.delete("/tareas/:id_tarea", {
        preHandler: [fastify.authenticate],

        schema: {
            security: [{ bearerAuth: [] }],
            tags: ["tareas"],
            summary: "eliminar una tarea",
            params:Type.Object({
                id_tarea: Type.Integer()
            }),
            response: {
                204: Type.Null()
            }
        }
    },
        async function (request, reply) {

            await tareasRepo.eliminar(request.params.id_tarea)

            return reply.code(204).send()

        },

    )

}

export default tareasRoutes;
