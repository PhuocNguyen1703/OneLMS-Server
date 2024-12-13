import { StatusCodes } from 'http-status-codes'

export class EntityError extends Error {
  fields: { message: string; field: string }[]
  status = StatusCodes.UNPROCESSABLE_ENTITY
  constructor(fields: { message: string; field: string }[]) {
    super(`Request can't be processed because of invalid data`)
    this.fields = fields
  }
}

export class AuthError extends Error {
  status = StatusCodes.UNAUTHORIZED
  constructor(message: string) {
    super(message)
  }
}

export class ForbiddenError extends Error {
  status = StatusCodes.FORBIDDEN
  constructor(message: string) {
    super(message)
  }
}

export class CustomError extends Error {
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    super(message)
    this.status = status
  }
}

export const errorTypes = [EntityError, AuthError, ForbiddenError, CustomError]
