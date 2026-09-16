import { Type } from "@sinclair/typebox"

export const tareaSchema = Type.Object({
    id_tarea: Type.Integer(),
    id_creador: Type.Integer(),
    grupo: Type.String(),
    titulo: Type.String({
        maxLength:100
    }),
    descripcion: Type.String(),
    prioridad: Type.String({
        maxLength: 10
    }),
    creada: Type.String({ 
        format: "date-time"
    }),
    terminada: Type.String({ 
        format: "date-time"
    }),
    estado: Type.String()
})

export const tareaShcemaPost = Type.Omit(tareaSchema, ["id_tarea", "id_creador", "creada", "terminada", "estado"])


