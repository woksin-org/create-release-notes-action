// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { a_release_notes_creator } from './given/a_release_notes_creator';
import {
    release_body_with_summary_as_first_title,
    release_body_with_summary_as_first_title_depth_4,
    release_body_with_summary_as_first_title_without_blank_line_after,
    release_body_with_summary_as_first_title_with_some_extra_text,
} from './given/some_release_bodies';
import { expectReleaseNotes } from './given/expect';

describe('for PlaintextRenderer', () => {
    describe('when creating and the first title is summary in standard format', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '1.0.0',
            body: release_body_with_summary_as_first_title,
            hasChangelogURL: true,
            changelogURL: 'https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md',
        });

        it('should replace the first header with the version', () => expectReleaseNotes(releaseNotes).withHeading('## Version 1.0.0\n\n', 'Version 1.0.0', 2));
        it('should not prepend the version header to the summary header', () => expect(releaseNotes[1].type).to.not.equal('heading'));
        it('should append a changelog section', () => expectReleaseNotes(releaseNotes).withChangelog('https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md'));
    });

    describe('when creating and the first title is summary with different depth', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '0.0.0',
            body: release_body_with_summary_as_first_title_depth_4,
            hasChangelogURL: true,
            changelogURL: 'https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md',
        });

        it('should replace the first header with the version', () => expectReleaseNotes(releaseNotes).withHeading('#### Version 0.0.0\n\n', 'Version 0.0.0', 4));
        it('should not prepend the version header to the summary header', () => expect(releaseNotes[1].type).to.not.equal('heading'));
        it('should append a changelog section', () => expectReleaseNotes(releaseNotes).withChangelog('https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md'));
    });

    describe('when creating and the first title is summary without blank lines after', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '2.1.0-prerelease',
            body: release_body_with_summary_as_first_title_without_blank_line_after,
            hasChangelogURL: true,
            changelogURL: 'https://dolittle.io',
        });

        it('should replace the first header with the version', () => expectReleaseNotes(releaseNotes).withHeading('## Version 2.1.0-prerelease\n', 'Version 2.1.0-prerelease', 2));
        it('should not prepend the version header to the summary header', () => expect(releaseNotes[1].type).to.not.equal('heading'));
        it('should append a changelog section', () => expectReleaseNotes(releaseNotes).withChangelog('https://dolittle.io'));
    });

    describe('when creating and the first title is summary with extra text after', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '10.1.1-prerelease.1',
            body: release_body_with_summary_as_first_title_with_some_extra_text,
            hasChangelogURL: true,
            changelogURL: 'https://dolittle.io',
        });


        it('should replace the first header with the version', () => expectReleaseNotes(releaseNotes).withHeading('## Version 10.1.1-prerelease.1\n\n', 'Version 10.1.1-prerelease.1', 2));
        it('should not prepend the version header to the summary header', () => expect(releaseNotes[1].type).to.not.equal('heading'));
        it('should append a changelog section', () => expectReleaseNotes(releaseNotes).withChangelog('https://dolittle.io'));
    });
});
