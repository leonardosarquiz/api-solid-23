export class ResourceNotFounError extends Error {
  constructor() {
    super('Resource not found.')
  }
}