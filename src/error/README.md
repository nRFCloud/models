In order for `instanceof` to work, the prototype has to be set explicitly.

    Object.setPrototypeOf(this, CustomError.prototype);

See https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
