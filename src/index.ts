export * from './value/URLValue';
export * from './model/Link';
export * from './model/List';
export * from './model/LinkedEntity';
export * from './model/VersionedContext';
export * from './model/ApiIndex';
export * from './model/Status';
export * from './model/HttpProblem';
export * from './model/JSONSerializeable';
export * from './model/checkContext';
export * from './error/BadRequestError';
export * from './error/AccessDeniedError';
export * from './error/EntityNotFoundError';
export * from './error/ApplicationError';

export const schemas = [
    require('./model/schema/ApiIndex.json'),
    require('./model/schema/HttpProblem.json'),
    require('./model/schema/Link.json'),
    require('./model/schema/LinkedEntity.json'),
    require('./model/schema/List.json'),
    require('./model/schema/Status.json'),
    require('./model/schema/VersionedContext.json'),
];
