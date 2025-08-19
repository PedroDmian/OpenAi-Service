export class Authentication extends Error {
  public readonly code: number;
  public readonly details?: any[];

  constructor(message: string, details?: any[]) {
    super(message);

    this.name = 'Authentication';
    this.code = 401;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, Authentication);
    }
  }
}
