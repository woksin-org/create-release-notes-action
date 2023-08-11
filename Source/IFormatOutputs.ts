// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * Defines a system that can format output strings.
 */
export interface IFormatOutputs {

    /**
     * The format type this formatter formats.
     */
    readonly type: string;

    /**
     * Formats the provided output string.
     * @param {string} output - The output string to format.
     * @returns {string} A new formatted string.
     */
    format(output: string): string;
}
