export class ApplicationError extends Error {
    constructor(...params: any[]) {
        super(...params);
        this.name = ApplicationError.name;
        Error.captureStackTrace(this, ApplicationError);
        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}
