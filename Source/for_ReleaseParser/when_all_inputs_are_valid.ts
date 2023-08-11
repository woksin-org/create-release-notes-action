// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { a_release_notes_parser } from './given/a_release_notes_parser';
import { a_release_changelog_url, a_release_summary, a_release_version } from './given/release_data';

describe('for ReleaseParser', () => {
    describe('when all inputs are valid', () => {
        const parser = a_release_notes_parser();

        const version = a_release_version;
        const body = a_release_summary;
        const changelogURL = a_release_changelog_url;

        const information = parser.parse(version, body, changelogURL);

        it('should return a result', () => expect(information).to.not.be.undefined);
        it('should have the correct version', () => expect(information.version).to.equal(version));
        it('should have a changelog URL', () => expect(information.hasChangelogURL).to.be.true);
        it('should have the correct changelog URL', () => expect(information.changelogURL).to.equal(changelogURL));
        it('should parse the summary', () => expect(information.body.length).to.equal(22));
    });
});
