import { HttpResource } from '../HttpResource';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class BadRequestResource extends HttpResource {
  constructor(message?: unknown) {
    super({
      statusCode: StatusCodes.BAD_REQUEST,
      error: {
        errorMessage: message || getReasonPhrase(StatusCodes.BAD_REQUEST),
      },
    });
  }
}
