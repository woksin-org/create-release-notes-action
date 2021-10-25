// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ILogger } from '@dolittle/github-actions.shared.logging';

import { IRenderReleaseNotes } from './IRenderReleaseNotes';
import { ReleaseNotes } from './ReleaseNotes';

/**
 * Represents an implementation of {IRenderReleaseNotes} that returns the original Markdown.
 */
export class MarkdownRenderer implements IRenderReleaseNotes {
    private readonly _logger: ILogger;

    constructor(private logger: ILogger) {
        this._logger = logger;
    }

    /** @inheritdoc */
    render(releaseNotes: ReleaseNotes): string {
        return releaseNotes.map(token => token.raw).join('');
    }
}
