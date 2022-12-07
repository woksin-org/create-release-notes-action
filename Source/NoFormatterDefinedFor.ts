// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OutputFormat } from './OutputFormat';

/**
 * The exception that gets thrown when trying to format output with a format type that has not formatter defined.
 */
 export class NoFormatterDefinedFor extends Error {
    /**
     * Initializes a new instance of {@link NoFormatterDefinedFor}.
     * @param {OutputFormat} type - The format type.
     */
    constructor(type: OutputFormat) {
        super(`The format type '${type}' has not formatter defined`);
    }
}
