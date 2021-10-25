// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ILogger } from '@dolittle/github-actions.shared.logging';
import { Token, Tokens, TokensList, walkTokens } from 'marked';
import { ICreateReleaseNotes } from './ICreateReleaseNotes';

import { ReleaseInformation } from './ReleaseInformation';
import { ReleaseNotes } from './ReleaseNotes';

/**
 * Represents an implementation of {ICreateReleaseNotes}.
 */
export class ReleaseNotesCreator implements ICreateReleaseNotes {
    private readonly _summaryHeadingExpression = /^#+\s*Summary(?:\s*\S+)*(\s*)$/;

    private readonly _logger: ILogger;

    constructor(private logger: ILogger) {
        this._logger = logger;
    }

    /** @inheritdoc */
    createFrom(information: ReleaseInformation): ReleaseNotes {
        const body = this.cloneTokensList(information.body);
        this.replaceOrAddFirstHeaderWithVersion(information.version, body);
        this.appendChangelogURLIfSet(information.hasChangelogURL, information.changelogURL, body);
        return body;
    }

    private cloneTokensList(original: TokensList): TokensList {
        this._logger.debug('Cloning the original release summary');
        const tokens = original.slice();
        return Object.assign(tokens, { links: original.links });
    }

    private replaceOrAddFirstHeaderWithVersion(version: string, body: TokensList) {
        this._logger.debug(`Replacing or adding the first header to specify version '${version}'`);
        
        const headingText = 'Version ' + version;
        const headingToken: Tokens.Heading = {
            type: 'heading',
            depth: 2,
            raw: '## ' + headingText + '\n\n',
            text: headingText,
            tokens: [{ type: 'text', raw: headingText, text: headingText }]
        };
        
        if (this.firstTokenIsSummaryHeader(body[0])) {
            this._logger.debug('First token was a "## Summary" header, replacing it');
            
            const trailingWhitespace = this._summaryHeadingExpression.exec(body[0].raw)![1];
            headingToken.depth = body[0].depth;
            headingToken.raw = '#'.repeat(body[0].depth) + ' ' + headingText + trailingWhitespace;
            body[0] = headingToken;
        } else {
            this._logger.debug('First token was not a "## Summary" header, prepending a new one');
            body.splice(0, 0, headingToken);
        }
    }

    private firstTokenIsSummaryHeader(firstToken: Token): firstToken is Tokens.Heading {
        return firstToken !== undefined && firstToken.type === 'heading' && this._summaryHeadingExpression.test(firstToken.raw);
    }

    private appendChangelogURLIfSet(hasChangelogURL: boolean, changelogURL: string, body: TokensList) {
        if (hasChangelogURL) {
            this._logger.debug(`Appending a changelog section with URL '${changelogURL}'`);
            body.push(
                {
                    type: 'heading',
                    depth: 2,
                    raw: '## Changelog\n\n',
                    text: 'Changelog',
                    tokens: [{ type: 'text', raw: 'Changelog', text: 'Changelog' }],
                },
                {
                    type: 'paragraph',
                    raw: `For all release notes, see [changelog](${changelogURL})`,
                    text: `For all release notes, see [changelog](${changelogURL})`,
                    tokens: [
                        {
                            type: 'text',
                            raw: 'For all release notes, see ',
                            text: 'For all release notes, see ',
                        },
                        {
                            type: 'link',
                            raw: `[changelog](${changelogURL})`,
                            href: changelogURL,
                            title: null as unknown as string,
                            text: 'changelog',
                            tokens: [{ type: 'text', raw: 'changelog', text: 'changelog' }],
                        },
                    ],
                });
        } else {
            this._logger.debug('No changelog URL provided, not appending section');
        }
    }
}
