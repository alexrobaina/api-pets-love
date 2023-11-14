interface ErrorData {
  status: number
  message: string
  error: Error
}

export const handleError = ({
  res,
  error,
  message,
  status,
}: {
  res: any
  error: Error
  message: string
  status: number
}): void => {
  console.error(error)
  res.locals.error = { status, message, error } as ErrorData
  res.status(status).json({
    ok: false,
    message,
  })
}
