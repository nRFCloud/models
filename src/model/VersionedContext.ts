import { URLValue, URLValueType } from '../value/URLValue';
import { VersionedContext as VersionedContextSchema } from '../../dist/schema/VersionedContext';

const t = require('tcomb');
const PositiveIntegerType = t.refinement(
    t.Integer,
    (n: number) => n >= 1,
    'PositiveIntegerType',
);

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
        this.$context = URLValueType($context, [
            'VersionedContext()',
            '$context:URLValue',
        ]);
        this.$contextVersion = PositiveIntegerType($contextVersion, [
            'VersionedContext()',
            '$contextVersion:int>=1',
        ]);
    }

    toJSON(): VersionedContextSchema {
        return {
            $context: this.$context.toString(),
            $contextVersion: this.$contextVersion,
        };
    }

    static checkContextVersion(
        expected: { $context: URLValue; $contextVersion: number },
        actual: { $context: URLValue; $contextVersion: number },
    ) {
        if (!expected.$context.equals(actual.$context)) {
            throw new TypeError(
                `Expected "${expected.$context}" but got "${actual.$context}`,
            );
        }
        if (expected.$contextVersion !== actual.$contextVersion) {
            throw new TypeError(
                `Expected "${expected.$contextVersion}" but got "${
                    actual.$contextVersion
                }`,
            );
        }
    }
}
