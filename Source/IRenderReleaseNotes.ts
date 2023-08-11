// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReleaseNotes } from './ReleaseNotes';

/**
 * Defines a system that can render release notes to a string.
 */
export interface IRenderReleaseNotes {
    /**
     * Renders the release notes to a string.
     * @param releaseNotes - The release notes to render.
     */
    render(releaseNotes: ReleaseNotes): string;
}
