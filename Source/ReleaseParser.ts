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

    /**
     * Initializes a new instance of the {ReleaseParser} class.
     * @param {ILogger} logger - The logger.
     */
    constructor(private logger: ILogger) {
        this._lexer = new Lexer();
        this._logger = logger;
    }

    /** @inheritdoc */
    parse(version: string, body: string, changelogURL?: string): ReleaseInformation {
        this._logger.debug('Parsing release information from:');
        this._logger.debug(` version: ${version}`);
        this._logger.debug(` body: ${body}`);
        this._logger.debug(` changelogURL: ${changelogURL}`);

        this.throwIfVersionNotProvided(version);

        const tokens = this._lexer.lex(body);
        const changelog = this.getChangelogURL(changelogURL);

        return {
            version,
            body: tokens,
            ...changelog,
        };
    }

    private throwIfVersionNotProvided(version: string) {
        if (version === undefined || version === null || version.trim() === '') {
            this._logger.error('Version not provided or whitespace');
            throw new VersionNotProvided();
        }
    }

    private getChangelogURL(changelogURL?: string): { hasChangelogURL: boolean, changelogURL: string } {
        if (changelogURL === undefined || changelogURL === null || changelogURL === '') {
            this._logger.debug('Changelog URL not provided');
            return {
                hasChangelogURL: false,
                changelogURL: '',
            };
        }

        try {
            this._logger.debug('Changelog URL provided');
            return {
                hasChangelogURL: true,
                changelogURL: new URL(changelogURL).toString(),
            };
        } catch {
            this._logger.error('Parsing changelog URL failed');
            throw new InvalidChangelogURL(changelogURL);
        }
    }
}
