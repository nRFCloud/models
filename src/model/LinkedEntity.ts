import { LinkedEntity as LinkedEntitySchema } from '../../dist/schema/LinkedEntity';
import { VersionedContext } from './VersionedContext';
import { Link, LinkType } from './Link';
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
    constructor(
        $context: URLValue,
        $contextVersion: number,
        $links: Array<Link> = [],
    ) {
        super($context, $contextVersion);
        this.$links = $links.map(l =>
            LinkType(l, ['LinkedEntity()', '$links:Link[]']),
        );
    }

    toJSON(): LinkedEntitySchema {
        return {
            ...super.toJSON(),
            ...{
                $links: this.$links.length
                    ? this.$links.map(l => l.toJSON())
                    : [],
            },
        };
    }
}
