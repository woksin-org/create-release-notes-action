// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReleaseInformation } from './ReleaseInformation';
import { ReleaseNotes } from './ReleaseNotes';

/**
 * Defines a system that can create release notes from information about a release.
 */
export interface ICreateReleaseNotes {
    /**
     * Creates release notes from information about a release.
     * @param { ReleaseInformation} information - The information to create the release notes from.
     */
    createFrom(information: ReleaseInformation): ReleaseNotes;
}
