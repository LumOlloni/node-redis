enum StatusMessage {
  BADREQUEST = 400,
  FORBIDDEN = 403,
  NOTFOUND = 404,
  SUCCESS = 200,
  UNUTHORIZED = 401,
  SERVER_ERROR = 500,
  REDIS_ERROR_CONNECTION = 500
}

export {StatusMessage}