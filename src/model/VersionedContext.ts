import {URLValue} from '../value/URLValue';
import {VersionedContextSchema} from '../../dist/generated/VersionedContextSchema';

export interface VersionedContextInterface {
    readonly $context: URLValue;
    readonly $contextVersion: number;
}

/**
 * Describes JSON data
 *
 * Inspired by https://json-ld.org/
 */
export abstract class VersionedContext implements VersionedContextInterface {
    readonly $context: URLValue;
    readonly $contextVersion: number;

    /**
     * @param {URLValue} $context context for this model
     * @param {number} $contextVersion version of the $context
     */
    constructor($context: URLValue, $contextVersion: number) {
        if (!($context instanceof URLValue)) {
            throw new TypeError(`VersionedContext: provided $context is not an URI: "${$context}"!`);
        }
        if ($contextVersion % 1 !== 0 || $contextVersion <= 0) {
            throw new TypeError(`VersionedContext: provided $contextVersion is not an integer > 0: "${$contextVersion}"!`);
        }
        this.$context = $context;
        this.$contextVersion = $contextVersion;
    }

    toJSON(): VersionedContextSchema {
        return {
            __context: this.$context.toString(),
            __contextVersion: this.$contextVersion,
        };
    }

    static checkContextVersion(expected: { $context: URLValue, $contextVersion: number }, actual: { $context: URLValue, $contextVersion: number }) {
        if (!expected.$context.equals(actual.$context)) {
            throw new TypeError(`Expected "${expected.$context}" but got "${actual.$context}`);
        }
        if (expected.$contextVersion !== actual.$contextVersion) {
            throw new TypeError(`Expected "${expected.$contextVersion}" but got "${actual.$contextVersion}`);
        }
    }
}
