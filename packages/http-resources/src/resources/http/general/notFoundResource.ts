import { HttpResource } from '../HttpResource';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export class NotFoundResource extends HttpResource {
  constructor(message?: string) {
    super({
      statusCode: StatusCodes.NOT_FOUND,
      error: {
        errorMessage: message ?? getReasonPhrase(StatusCodes.NOT_FOUND),
      },
    });
  }
}
