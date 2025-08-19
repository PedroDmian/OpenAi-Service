export class BadRequest extends Error {
  public readonly code: number;
  public readonly details?: any[];

  constructor(message: string, code?: number, details?: any[]) {
    super(message);

    this.name = 'BadRequest';
    this.code = code ?? 400;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequest);
    }
  }
}
