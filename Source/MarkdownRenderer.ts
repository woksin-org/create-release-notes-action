// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ILogger } from '@woksin/github-actions.shared.logging';

import { IRenderReleaseNotes } from './IRenderReleaseNotes';
import { ReleaseNotes } from './ReleaseNotes';

/**
 * Represents an implementation of {IRenderReleaseNotes} that returns the original Markdown.
 */
export class MarkdownRenderer implements IRenderReleaseNotes {
    private readonly _logger: ILogger;

    /**
     * Initializes a new instance of the {ILogger} class.
     * @param {ILogger} logger - The logger.
     */
    constructor(logger: ILogger) {
        this._logger = logger;
    }

    /** @inheritdoc */
    render(releaseNotes: ReleaseNotes): string {
        this._logger.debug('Rendering release notes as Markdown');
        return releaseNotes.map(token => token.raw).join('');
    }
}
