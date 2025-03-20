import { HttpResource } from '../HttpResource';
import { StatusCodes } from 'http-status-codes';

export class OkResource extends HttpResource {
  constructor(body: unknown) {
    super({
      statusCode: StatusCodes.OK,
      body,
      headers: {
        // TODO: there have to be a better way...
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
      },
    });
  }
}
