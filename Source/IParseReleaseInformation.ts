// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReleaseInformation } from './ReleaseInformation';

/**
 * Defines a system that can parse release information.
 */
export interface IParseReleaseInformation {
    /**
     * Parses release information from the provided details.
     * @param version - The version of the release.
     * @param body - The summary of the release.
     * @param changelogURL - The optional full changelog url.
     */
    parse(version: string, body: string, changelogURL?: string): ReleaseInformation;
}
