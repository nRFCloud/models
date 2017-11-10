import { LinkedEntitySchema } from '../../dist/generated/LinkedEntitySchema';
import { VersionedContext } from './VersionedContext';
import { Link } from './Link';
import { URLValue } from '../value/URLValue';

/**
 * Describes JSON data and provides $links between "entities".
 *
 * Inspired by https://json-ld.org/
 */
export abstract class LinkedEntity extends VersionedContext {
    readonly $links: Array<Link>;

    /**
     * @param {URLValue} $context context for this model
     * @param {number} $contextVersion version of the $context
     * @param {Array<Link>} $links Links between entities
     */
    constructor($context: URLValue, $contextVersion: number, $links: Array<Link> = []) {
        super($context, $contextVersion);
        $links.map(l => {
            if (!(l instanceof Link)) {
                throw new TypeError(`ModelContext: provided $links must contain "Link" instances: "${typeof l}" provided!`);
            }
        });
        this.$links = $links;
    }

    toJSON(): LinkedEntitySchema {
        return {
            ...super.toJSON(),
            ...{__links: this.$links.length ? this.$links.map(l => l.toJSON()) : undefined}
        };
    }
}
