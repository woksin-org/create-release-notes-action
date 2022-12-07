// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IFormatOutputs } from './IFormatOutputs';
import { IOutputFormatters } from './IOutputFormatters';
import { MultipleFormattersDefinedFor } from './MultipleFormattersDefinedFor';
import { NoFormatterDefinedFor } from './NoFormatterDefinedFor';
import { OutputFormat } from './OutputFormat';

/**
 * Represents an implementation of {IOutputFormatters}.
 */
export class OutputFormatters implements IOutputFormatters {
    private readonly _formatters: Map<OutputFormat, IFormatOutputs>;

    /**
     * Initializes a new instance of the {OutputFormatters} class.
     * @param {...IFormatOutputs} formatters - The formatters.
     */
    constructor(...formatters: IFormatOutputs[]) {
        this._formatters = new Map<OutputFormat, IFormatOutputs>();
        for (const formatter of formatters) {
            const type = formatter.type;
            if (this._formatters.has(type)) {
                throw new MultipleFormattersDefinedFor(type, (this._formatters.get(type) as Object).constructor, (formatter as Object).constructor);
            }

            this._formatters.set(type, formatter);
        }
    }

    /** @inheritdoc */
    canFormat(type: OutputFormat): boolean {
        return this._formatters.has(type);
    }

    /** @inheritdoc */
    format(type: OutputFormat, output: string): string {
        this.throwIfNoFormatterDefinedFor(type);
        return this._formatters.get(type)!.format(output);
    }

    private throwIfNoFormatterDefinedFor(type: OutputFormat) {
        if (!this._formatters.has(type)) {
            throw new NoFormatterDefinedFor(type);
        }
    }
}
