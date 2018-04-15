import { JSONSerializeable } from './JSONSerializeable';
import { VersionedContext } from './VersionedContext';
import { URLValue } from '../value/URLValue';
import { Status as StatusSchema } from '../../dist/schema/Status';

/**
 * Describes the status of the system.
 */
export class Status extends VersionedContext implements JSONSerializeable {
    static $context = new URLValue('https://github.com/nRFCloud/models#Status');
    static $contextVersion = 1;

    /**
     * Whether the system is in maintenance mode.
     */
    readonly maintenance: boolean;

    /**
     * The global version of the system. This is merely a logical version identifier for the system as whole since
     * individual services may have their own version scheme.
     *
     * This is a semantic version string: http://semver.org/
     */
    readonly version: string;

    /**
     * Time of the status creation.
     */
    readonly time: Date;

    /**
     * @throws TypeError if invalid values are passed
     */
    constructor(
        maintenance: boolean,
        version: string,
        time: Date = new Date(),
    ) {
        super(Status.$context, Status.$contextVersion);
        this.maintenance = maintenance;
        this.version = version;
        this.time = time;
    }

    static fromJSON({
        $context,
        $contextVersion,
        maintenance,
        version,
        time,
    }: StatusSchema): Status {
        VersionedContext.checkContextVersion(Status, {
            $context: URLValue.fromString($context, [
                'Status.fromJSON()',
                '$context:URLValue',
            ]),
            $contextVersion: $contextVersion,
        });
        return new Status(maintenance, version, new Date(time));
    }

    toJSON(): StatusSchema {
        const { maintenance, version, time } = this;
        return {
            ...super.toJSON(),
            ...{ maintenance, version, time: time.toISOString() },
        };
    }
}
