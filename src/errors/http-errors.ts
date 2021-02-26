export class HttpErrors {
  constructor(
    public readonly message: string,
    public readonly statusCode: number
  ) {}
}
