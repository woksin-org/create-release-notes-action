// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IFormatOutputs } from './IFormatOutputs';

/**
 * Represents an implementation of { @link IFormatOutputs } that passes the output straight through.
 */
export class RawOutputFormatter implements IFormatOutputs {
    /** @inheritdoc */
    readonly type: string = 'raw';

    /** @inheritdoc */
    format(output: string): string {
        return output;
    }
}
