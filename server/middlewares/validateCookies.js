import jwt from 'jsonwebtoken'
export const validateSession = (req, res, next) => {
  const token = req.cookies.access_token
  if (!token) {
    req.session = { error: 'missing' }
    return next()
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.session = decoded
  } catch (error) {
    req.session = { error: 'invalid' }
  }
  next()
}
