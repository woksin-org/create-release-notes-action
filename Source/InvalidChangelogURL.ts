// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * The exception that gets thrown when an invalid changelog URL is provided for the release.
 */
 export class InvalidChangelogURL extends Error {
    /**
     * Initializes a new instance of {@link InvalidChangelogURL}.
     * @param {string} url - The provided changelog url.
     */
    constructor(url: string) {
        super(`The provided "changelog-url" (${url}) input was not a valid URL.`);
    }
}
