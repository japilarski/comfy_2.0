import { APIGatewayProxyResult } from "aws-lambda";
import { BaseResource } from "../BaseResource";

export type HttpErrorResponse = {
  requestId?: string;
  errorCode?: unknown;
  errorMessage?: unknown;
};

export type HttpResourceParams = {
  statusCode: number;
  error?: HttpErrorResponse;
  body?: unknown;
  headers?: { [key: string]: string };
};

export class HttpResource extends BaseResource<APIGatewayProxyResult>{
  readonly params: HttpResourceParams;

  protected constructor(params: HttpResourceParams) {
    super();
    this.params = params;
  
    if(params.body == null && params.error == null) {
      throw new Error('Either body or error must be provided to HttpResource');
    }
  }

  toObject(): APIGatewayProxyResult {
    const body = this.params.body ? this.params.body : this.params.error;

    let response: APIGatewayProxyResult = {
      statusCode: this.params.statusCode,
      body: JSON.stringify(body),
    };

    response = this.params.headers ? { ...response, headers: this.params.headers } : response;

    return response;
  }
}