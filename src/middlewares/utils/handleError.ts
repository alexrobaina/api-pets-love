export const handleError = (
  res: any,
  error: Error,
  message: string,
  status: number = 500,
) => {
  console.error(error)
  res.locals.error = { status, message, error }
  return
}
