// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { a_release_notes_creator } from './given/a_release_notes_creator';
import {
    release_body_with_content_before_summary_title,
    release_body_with_different_first_title,
    release_body_with_no_first_title,
} from './given/some_release_bodies';
import { expectReleaseNotes } from './given/expect';

describe('for PlaintextRenderer', () => {
    describe('when creating and there is no first title', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '12.0.0',
            body: release_body_with_no_first_title,
            hasChangelogURL: true,
            changelogURL: 'https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md',
        });

        it('should replace the first header with the version', () => expectReleaseNotes(releaseNotes).withHeading('## Version 12.0.0\n\n', 'Version 12.0.0', 2));
        it('should append a changelog section', () => expectReleaseNotes(releaseNotes).withChangelog('https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md'));
    });

    describe('when creating and there is a different first title', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '13.0.0',
            body: release_body_with_different_first_title,
            hasChangelogURL: true,
            changelogURL: 'https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md',
        });

        it('should replace the first header with the version', () => expectReleaseNotes(releaseNotes).withHeading('## Version 13.0.0\n\n', 'Version 13.0.0', 2));
        it('should leave the other title as it was', () => expect(releaseNotes[1]).to.equal(release_body_with_different_first_title[0]));
        it('should append a changelog section', () => expectReleaseNotes(releaseNotes).withChangelog('https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md'));
    });

    describe('when creating and there is content before the summary title', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '14.0.0',
            body: release_body_with_content_before_summary_title,
            hasChangelogURL: true,
            changelogURL: 'https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md',
        });

        it('should replace the first header with the version', () => expectReleaseNotes(releaseNotes).withHeading('## Version 14.0.0\n\n', 'Version 14.0.0', 2));
        it('should not touch the summary title', () => expect(releaseNotes[4]).to.equal(release_body_with_content_before_summary_title[3]));
        it('should append a changelog section', () => expectReleaseNotes(releaseNotes).withChangelog('https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md'));
    });
});
