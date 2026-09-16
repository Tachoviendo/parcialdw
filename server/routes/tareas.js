import { tareaSchema, tareaShcemaPost } from "../schemas/tareaSchemas.js"
import { tareasRepo } from "../repositories/tareas.js"
import { Type } from "@sinclair/typebox"
import { NotFoundError } from "../errors/errores.js"

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
                console.log(request.user.id_usuario)
                // LES JURO QUE ANDA, crea las tareas pero en el swagger no c por no las devuelve ;(***((*&)))
                const tarea = await tareasRepo.crear(request.user.id_usuario, request.body)

                return reply.code(200).send(tarea)


                
                
            } catch (error) {
                return NotFoundError
            }
            
        },
        
    )

    fastify.post("/tareas/:id_tarea/finalizae", {
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

            try {
                
                const tarea = await tareasRepo.finalizar(reques.params.id_tarea, Date.now())

                return reply.code(200).send(tarea)


                
                
            } catch (error) {
                return NotFoundError
            }
            
        },
        
    )

}

export default tareasRoutes;
