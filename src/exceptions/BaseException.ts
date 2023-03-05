import { Exception } from "../interface";
import { StatusMessage } from './index'

class BaseException implements Exception{
  private message: string;
  private statusCode: number;

  constructor(message: string , statusCode: number) {
    this.message = message;
    this.statusCode = statusCode;
  }

  getMessage(): string {
    return this.message;
  }
  getStatusCode(): number {
    return this.statusCode;
  }
}

class ServerException extends BaseException {
  constructor(message: string) {
    super(message , StatusMessage.SERVER_ERROR);
  }
}

class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message , StatusMessage.NOTFOUND);
  }
}

class BadRequestException extends BaseException {
  constructor(message: string) {
    super(message , StatusMessage.BADREQUEST);
  }
}

class RedisException extends BaseException {
  constructor(message: string) {
    super(message , StatusMessage.REDIS_ERROR_CONNECTION);
  }
}
export { NotFoundException, BadRequestException, RedisException , ServerException }



