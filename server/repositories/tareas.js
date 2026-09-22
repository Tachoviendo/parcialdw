
import { myPool } from "../db/pool.js";
import { NotFoundError } from "../errors/errores.js";
const baseQuery = `SELECT * FROM tareas `;

class TareasRepository {

  

    async getAll() {
        const query = `
            ${baseQuery}
            ORDER BY creada DESC;
            `;

        const result = await myPool.query(query)

        return result.rows
        
    }

    async obtenerPorId(idTarea){
        const query = `
            ${baseQuery}
            WHERE id_tarea = $1;
        `;

        const result = await myPool.query(query,[idTarea])

        return result.rows[0]


    
  }

  async crear(idCreador, dto) {
        const query = `
          INSERT INTO tareas (id_creador, grupo, titulo, descripcion, prioridad)
          VALUES ($1, $2, $3, $4, COALESCE($5, '1:media'))
          RETURNING id_tarea;
        `;
        
        const result = await myPool.query(query, [idCreador, dto.grupo, dto.titulo, dto.descripcion, dto.prioridad])
        return result.rows[0]
    
  }

  async actualizar(idTarea, dto) {
    const query = `
      UPDATE tareas
      SET campo1=$2, campo2=$3, etc, etc
      WHERE id_tarea = $1;
    `;
    //TODO: Corregir y completar
  }

  async finalizar(idTarea, fecha) {
    const query = `
      UPDATE tareas
      SET terminada = $2
      WHERE id_tarea = $1 AND terminada IS NULL;
    `;

      const result = await myPool.query(query, [idTarea, fecha])
        return result.rows[0]


    //TODO: Completar. Ojo si la fecha viene vacía. Recuerden que CURRENT_TIMESTAMP hace referencia la fecha y hora actual
  }

  async eliminar(idTarea) {
    const query = `
      DELETE FROM tareas
      WHERE id_tarea = $1;
    `;

    const result = await myPool.query(query, [idTarea])
    if (result.rowCount !== 1)
      throw new NotFoundError("Tarea no encontrada.");
  }
}

export const tareasRepo = new TareasRepository();
