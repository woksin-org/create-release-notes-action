// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';
import { Tokens, TokensList } from 'marked';

export const expectReleaseNotes = (releaseNotes: TokensList) => ({
    withHeading: (raw: string, text: string, depth: number) => {
        expect(releaseNotes[0].type).to.equal('heading');
        const heading = releaseNotes[0] as Tokens.Heading;
        expect(heading.raw).to.equal(raw);
        expect(heading.text).to.equal(text);
        expect(heading.depth).to.equal(depth);
        expect(heading.tokens[0].type).to.equal('text');
        const token = heading.tokens[0] as Tokens.Text;
        expect(token.raw).to.equal(text);
        expect(token.text).to.equal(text);
    },

    withChangelog: (changelogURL: string) => {
        const secondToLastToken = releaseNotes[releaseNotes.length - 2];
        expect(secondToLastToken.type).to.equal('heading');
        const heading = secondToLastToken as Tokens.Heading;
        expect(heading.raw).to.equal('## Changelog\n\n');
        expect(heading.text).to.equal('Changelog');
        expect(heading.depth).to.equal(2);
        expect(heading.tokens[0].type).to.equal('text');
        const headingTextToken = heading.tokens[0] as Tokens.Text;
        expect(headingTextToken.raw).to.equal('Changelog');
        expect(headingTextToken.text).to.equal('Changelog');

        const lastToken = releaseNotes[releaseNotes.length - 1];
        expect(lastToken.type).to.equal('paragraph');
        const paragraph = lastToken as Tokens.Paragraph;
        expect(paragraph.raw).to.equal(`For all release notes, see [changelog](${changelogURL})`);
        expect(paragraph.text).to.equal(`For all release notes, see [changelog](${changelogURL})`);
        expect(paragraph.tokens.length).to.equal(2);
        expect(paragraph.tokens[0].type).to.eq('text');
        const paragraphTextToken = paragraph.tokens[0] as Tokens.Text;
        expect(paragraphTextToken.raw).to.equal('For all release notes, see ');
        expect(paragraphTextToken.text).to.equal('For all release notes, see ');
        expect(paragraph.tokens[1].type).to.eq('link');
        const paragraphLinkToken = paragraph.tokens[1] as Tokens.Link;
        expect(paragraphLinkToken.raw).to.equal(`[changelog](${changelogURL})`);
        expect(paragraphLinkToken.href).to.equal(changelogURL);
        expect(paragraphLinkToken.title).to.be.null;
        expect(paragraphLinkToken.text).to.equal('changelog');
        expect(paragraphLinkToken.tokens.length).to.equal(1);
        expect(paragraphLinkToken.tokens[0].type).to.equal('text');
        const paragraphLinkTextToken = paragraphLinkToken.tokens[0] as Tokens.Text;
        expect(paragraphLinkTextToken.raw).to.equal('changelog');
        expect(paragraphLinkTextToken.text).to.equal('changelog');
    },
});
