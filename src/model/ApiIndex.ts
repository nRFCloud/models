import { JSONSerializeable } from './JSONSerializeable';
import { VersionedContext } from './VersionedContext';
import { URLValue } from '../value/URLValue';
import { Link, LinkType } from './Link';
import { ApiIndexSchema } from '../../dist/generated/ApiIndexSchema';

/**
 * Describes entry points of an API
 */
export class ApiIndex extends VersionedContext implements JSONSerializeable {
    static $context = new URLValue('https://github.com/nRFCloud/models#ApiIndex');
    static $contextVersion = 1;
    readonly links: Array<Link>;

    /**
     * @param {Array} links Links in the index
     * @throws TypeError if invalid values are passed
     */
    constructor(links: Array<Link>) {
        super(ApiIndex.$context, ApiIndex.$contextVersion);
        this.links = links.map(l => LinkType(l, ['ApiIndex()', 'links:Link[]']));
    }

    static fromJSON({__context, __contextVersion, links}: ApiIndexSchema): ApiIndex {
        VersionedContext.checkContextVersion(ApiIndex, {
            $context: URLValue.fromString(__context, ['List.fromJSON()', '$context:URLValue']),
            $contextVersion: __contextVersion
        });
        return new ApiIndex(links.map(l => Link.fromJSON(l)));
    }

    toJSON(): ApiIndexSchema {
        const {links} = this;
        return {...super.toJSON(), ...{links: links.map(l => l.toJSON())}};
    }
}
