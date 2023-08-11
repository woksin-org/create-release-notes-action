// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IFormatOutputs } from './IFormatOutputs';

/**
 * Represents an implementation of { @link IFormatOutputs } that escapes commas and semicolons for MSbuild arguments.
 */
export class MSbuildOutputFormatter implements IFormatOutputs {
    /** @inheritdoc */
    readonly type: string = 'msbuild';

    /** @inheritdoc */
    format(output: string): string {
        return output
            .replace(/,/g, '%2C')
            .replace(/;/g, '%3B')
            .replace(/"/g, '%22')
            .replace(/&/g, '%26');
    }
}
