// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ILogger } from '@dolittle/github-actions.shared.logging';
import { Lexer } from 'marked';
import { InvalidChangelogURL } from './InvalidChangelogURL';

import { IParseReleaseInformation } from './IParseReleaseInformation';
import { ReleaseInformation } from './ReleaseInformation';
import { VersionNotProvided } from './VersionNotProvided';

/**
 * Represents an implementation of {IParseReleaseInformation}.
 */
export class ReleaseParser implements IParseReleaseInformation {
    private readonly _lexer: Lexer;
    private readonly _logger: ILogger;

    constructor(private logger: ILogger) {
        this._lexer = new Lexer();
        this._logger = logger;
    }

    /** @inheritdoc */
    parse(version: string, body: string, changelogURL?: string): ReleaseInformation {
        this.throwIfVersionNotProvided(version);

        const tokens = this._lexer.lex(body);
        const changelog = this.getChangelogURL(changelogURL);

        return {
            version: version,
            body: tokens,
            ...changelog,
        };
    }

    private throwIfVersionNotProvided(version: string) {
        if (version === undefined || version === null || version.trim() === '') {
            throw new VersionNotProvided();
        }
    }

    private getChangelogURL(changelogURL?: string): { hasChangelogURL: boolean, changelogURL: string } {
        if (changelogURL === undefined || changelogURL === null || changelogURL === '') {
            return {
                hasChangelogURL: false,
                changelogURL: '',
            };
        }

        try {
            return {
                hasChangelogURL: true,
                changelogURL: new URL(changelogURL).toString(),
            };
        } catch {
            throw new InvalidChangelogURL(changelogURL);
        }
    }
}
