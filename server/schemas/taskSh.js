import z from 'zod'

const taskSchema = z.object({
  user_id: z.string().uuid({ message: 'El ID de usuario debe ser un UUID válido.' }),
  title: z.string().max(255, { message: 'El título no puede tener más de 255 caracteres.' }),
  description: z.string().optional(),
  due_date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: 'La fecha de vencimiento debe ser una fecha válida.' })
})

export function validateTask (task) {
  return taskSchema.safeParse(task)
}
