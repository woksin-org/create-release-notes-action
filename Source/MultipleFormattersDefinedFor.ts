// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OutputFormat } from './OutputFormat';

/**
 * The exception that gets thrown when multiple output formatters is defined for the same type.
 */
 export class MultipleFormattersDefinedFor extends Error {
    /**
     * Initializes a new instance of {@link MultipleFormattersDefinedFor}
     * @param type The format type.
     */
    constructor(type: OutputFormat, original: Function, duplicate: Function) {
        super(`The format type '${type}' has multiple formatters defined. The original is '${original.name}' and the duplicate is '${duplicate.name}'`);
    }
}
