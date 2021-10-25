// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_release_notes_parser } from './given/a_release_notes_parser';
import { a_release_changelog_url, a_release_summary, a_release_version } from './given/release_data';
import { expect } from 'chai';

describe('for ReleaseParser', () => {
    describe('when all inputs are valid', () => {
        const creator = a_release_notes_parser();

        const version = a_release_version;
        const body = a_release_summary;
        const changelogURL = a_release_changelog_url;

        const releaseNotes = creator.parse(version, body, changelogURL);

        it('should return a result', () => expect(releaseNotes).to.not.be.undefined);
        it('should have the correct version', () => expect(releaseNotes.version).to.equal(version));
        it('should have a changelog URL', () => expect(releaseNotes.hasChangelogURL).to.be.true);
        it('should have the correct changelog URL', () => expect(releaseNotes.changelogURL).to.equal(changelogURL));
        it('should parse the summary', () => expect(releaseNotes.body.length).to.equal(22));
    });
});
