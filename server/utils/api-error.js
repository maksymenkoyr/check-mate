export default class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError(errors = []) {
    return new ApiError(401, 'user not authorized', errors)
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static ServerError(message, errors) {
    return new ApiError(500, message, errors)
  }
}