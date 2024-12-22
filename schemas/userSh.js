import z from 'zod'

const userSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres.' })
    .max(25, { message: 'El nombre de usuario no puede tener más de 25 caracteres.' }),

  email: z
    .string()
    .email({ message: 'Debe ser un correo electrónico válido.' })
    .max(50, { message: 'El email no puede tener más de 50 caracteres.' }),

  password: z
    .string()
    .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
    .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula.' })
    .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula.' })
    .regex(/[0-9]/, { message: 'La contraseña debe contener al menos un número.' })
    .regex(/[^A-Za-z0-9]/, { message: 'La contraseña debe contener al menos un carácter especial.' })
})

export function validateUser (user) {
  return userSchema.safeParse(user)
}
export function validateUserLogin (user) {
  return userSchema.partial().safeParse(user)
}
