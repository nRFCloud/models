import { VersionedContextInterface } from './VersionedContext';

/**
 * Checks if v is of type t
 */
export const checkContext = (
    t: VersionedContextInterface & {
        new (...args: any[]): VersionedContextInterface;
    },
) => (v?: any): boolean =>
    v &&
    v.constructor &&
    v.constructor.name === t.name &&
    '$context' in v &&
    v.$context.equals(t.$context) &&
    '$contextVersion' in v &&
    v.$contextVersion === t.$contextVersion;
