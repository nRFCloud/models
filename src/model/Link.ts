import {URLValue} from '../value/URLValue';
import {VersionedContext} from './VersionedContext';
import {JSONSerializeable} from './JSONSerializeable';
import {LinkSchema} from '../../dist/generated/LinkSchema';

/**
 * Describes a link.
 */
export class Link extends VersionedContext implements JSONSerializeable {
    static $context = new URLValue('https://github.com/nRFCloud/models#Link');
    static $contextVersion = 1;
    readonly href: URLValue;
    readonly subject: URLValue;
    readonly rel: string;

    /**
     * @param {URLValue} href URL to retrieve the link
     * @param {URLValue} subject Context of the linked item
     * @param {String} rel Label of the relation
     * @throws TypeError if invalid values are passed
     */
    constructor(href: URLValue, subject: URLValue, rel?: string) {
        super(Link.$context, Link.$contextVersion);
        if (!(href instanceof URLValue)) {
            throw new TypeError(`Link: provided href is not an URI: "${href}"!`);
        }
        if (!(subject instanceof URLValue)) {
            throw new TypeError(`Link: provided subject is not an URI: "${subject}"!`);
        }
        this.href = href;
        this.subject = subject;
        this.rel = rel;
    }

    static fromJSON({__context, __contextVersion, href, subject, rel}: LinkSchema): Link {
        VersionedContext.checkContextVersion(Link, {$context: URLValue.fromString(__context, ['Link.fromJSON()', '$context:URLValue']), $contextVersion: __contextVersion});
        return new Link(URLValue.fromString(href, ['Link.fromJSON()', 'href:URLValue']), URLValue.fromString(subject, ['Link.fromJSON()', 'subject:URLValue']), rel);
    }

    toJSON(): LinkSchema {
        const {href, subject, rel} = this;
        return {
            ...super.toJSON(),
            ...{href: href.toString(), subject: subject.toString(), rel}
        };
    }
}
