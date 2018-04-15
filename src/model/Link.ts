import { URLValue, URLValueType } from '../value/URLValue';
import { VersionedContext } from './VersionedContext';
import { JSONSerializeable } from './JSONSerializeable';
import { Link as LinkSchema } from '../../dist/schema/Link';
import { checkContext } from './checkContext';

const t = require('tcomb');

/**
 * Describes a link.
 */
export class Link extends VersionedContext implements JSONSerializeable {
    static $context = new URLValue('https://github.com/nRFCloud/models#Link');
    static $contextVersion = 1;
    readonly href: URLValue;
    readonly subject: URLValue;
    readonly rel?: string;

    /**
     * @param {URLValue} href URL to retrieve the link
     * @param {URLValue} subject Context of the linked item
     * @param {String} rel Label of the relation
     * @throws TypeError if invalid values are passed
     */
    constructor(href: URLValue, subject: URLValue, rel?: string) {
        super(Link.$context, Link.$contextVersion);
        this.href = URLValueType(href, ['Link()', 'href:URLValue']);
        this.subject = URLValueType(subject, ['Link()', 'subject:URLValue']);
        this.rel = rel;
    }

    static fromJSON({$context, $contextVersion, href, subject, rel}: LinkSchema): Link {
        VersionedContext.checkContextVersion(Link, {$context: URLValue.fromString($context, ['Link.fromJSON()', '$context:URLValue']), $contextVersion: $contextVersion});
        return new Link(URLValue.fromString(href, ['Link.fromJSON()', 'href:URLValue']), URLValue.fromString(subject, ['Link.fromJSON()', 'subject:URLValue']), rel);
    }

    toJSON(): LinkSchema {
        const {href, subject, rel} = this;
        return {
            ...super.toJSON(),
            ...{href: href.toString(), subject: subject.toString(), rel},
        };
    }
}

export const LinkType = t.irreducible('LinkType', checkContext(Link));
export const MaybeLinkType = t.maybe(LinkType);
