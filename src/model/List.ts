import { LinkedEntity } from './LinkedEntity';
import { JSONSerializeable } from './JSONSerializeable';
import { URLValue } from '../value/URLValue';
import { Link } from './Link';
import { List as ListSchema } from '../../dist/schema/List';

const t = require('tcomb');
const ZeroOrPositiveInteger = t.refinement(
    t.Integer,
    (n: number) => n >= 0,
    'ZeroOrPositiveInteger',
);

/**
 * Describes a list if items. Can contain links to e.g. fetch the next page in a resultset.
 */
export class List<T extends JSONSerializeable> extends LinkedEntity
    implements JSONSerializeable {
    static $context = new URLValue('https://github.com/nRFCloud/models#List');
    static $contextVersion = 1;
    readonly items: Array<T>;
    readonly total: number;
    readonly hasNext: boolean;
    readonly hasPrev: boolean;

    /**
     * @param {Array} items Items in the list
     * @param {number} total Total number of items for the query
     * @param {Array.<Link>} $links Links to navigate the result set
     * @throws TypeError if invalid values are passed
     */
    constructor(items: Array<T>, total: number, $links: Array<Link> = []) {
        super(List.$context, List.$contextVersion, $links);
        this.items = t.list(t.Any)(items, ['List()', 'items:any[]']);
        this.total = ZeroOrPositiveInteger(total, ['List()', 'total:int>=0']);
        this.hasNext =
            this.$links.filter(link => link.rel === 'next').length > 0;
        this.hasPrev =
            this.$links.filter(link => link.rel === 'prev').length > 0;
    }

    static fromJSON(
        { $context, $contextVersion, items, total, $links }: ListSchema,
        itemTransformer: Function,
    ): List<any> {
        LinkedEntity.checkContextVersion(List, {
            $context: URLValue.fromString($context, [
                'List.fromJSON()',
                '$context:URLValue',
            ]),
            $contextVersion: $contextVersion,
        });
        return new List(
            items.map(i => itemTransformer(i)),
            total,
            $links ? $links.map(l => Link.fromJSON(l)) : undefined,
        );
    }

    toJSON(): ListSchema {
        const { items, total } = this;
        const s = super.toJSON();
        return {
            ...s,
            $links: s.$links || [],
            ...{
                items: items.map(i => i.toJSON()),
                total,
            },
        };
    }
}
