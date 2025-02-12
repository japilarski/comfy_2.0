import { HttpResource } from '../HttpResource';
import { StatusCodes } from 'http-status-codes';

export class OkResource extends HttpResource {
  constructor(body: unknown) {
    super({
      statusCode: StatusCodes.OK,
      body,
    });
  }
}
