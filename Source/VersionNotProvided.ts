// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * The exception that gets thrown when no version is provided for the release.
 */
 export class VersionNotProvided extends Error {
    /**
     * Initializes a new instance of {@link VersionNotProvided}
     */
    constructor() {
        super('The required "version" input was not provided.');
    }
}
