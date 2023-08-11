// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { TokensList } from 'marked';

/**
 * Represents information about a release for a package.
 */
export type ReleaseInformation = {
    version: string;
    body: TokensList;
    hasChangelogURL: boolean;
    changelogURL: string;
};
