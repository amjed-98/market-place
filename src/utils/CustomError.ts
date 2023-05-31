export default class CustomError extends Error {
  isCustom: true;

  constructor(message: string) {
    super(message);
    this.isCustom = true;
  }
}
