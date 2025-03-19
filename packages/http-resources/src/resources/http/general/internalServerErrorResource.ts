import { HttpResource } from '../HttpResource';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class InternalServerErrorResource extends HttpResource {
  constructor(message?: unknown) {
    super({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      error: {
        errorMessage: message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      },
    });
  }
}
