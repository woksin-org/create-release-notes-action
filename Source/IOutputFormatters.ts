// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { OutputFormat } from './OutputFormat';

/**
 * Defines a system that can knows about { @link IFormatOutputs }.
 */
export interface IOutputFormatters {
    /**
     * Checks whether a formatter is defined for the specified output format.
     * @param type - The output format type.
     */
    canFormat(type: OutputFormat): boolean;

    /**
     * Formats the provided output string using the specified output format.
     * @param type - The output format type.
     * @param output - The output string to format.
     * @returns A new formatted string.
     */
    format(type: OutputFormat, output: string): string;
}
