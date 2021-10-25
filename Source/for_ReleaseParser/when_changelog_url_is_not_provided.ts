// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_release_notes_parser } from './given/a_release_notes_parser';
import { a_release_summary, a_release_version } from './given/release_data';
import { expect } from 'chai';

describe('for ReleaseParser', () => {
    describe('when all changelog url is empty', () => {
        const creator = a_release_notes_parser();

        const releaseNotes = creator.parse(a_release_version, a_release_summary, '');

        it('should return a result', () => expect(releaseNotes).to.not.be.undefined);
        it('should not have a changelog URL', () => expect(releaseNotes.hasChangelogURL).to.be.false);
        it('should return an empty changelog URL', () => expect(releaseNotes.changelogURL).to.equal(''));
    });

    describe('when all changelog url is null', () => {
        const creator = a_release_notes_parser();

        const releaseNotes = creator.parse(a_release_version, a_release_summary, null as unknown as string);

        it('should return a result', () => expect(releaseNotes).to.not.be.undefined);
        it('should not have a changelog URL', () => expect(releaseNotes.hasChangelogURL).to.be.false);
        it('should return an empty changelog URL', () => expect(releaseNotes.changelogURL).to.equal(''));
    });

    describe('when all changelog url is undefined', () => {
        const creator = a_release_notes_parser();

        const releaseNotes = creator.parse(a_release_version, a_release_summary, undefined);

        it('should return a result', () => expect(releaseNotes).to.not.be.undefined);
        it('should not have a changelog URL', () => expect(releaseNotes.hasChangelogURL).to.be.false);
        it('should return an empty changelog URL', () => expect(releaseNotes.changelogURL).to.equal(''));
    });
});
