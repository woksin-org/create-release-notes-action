// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { a_release_notes_parser } from './given/a_release_notes_parser';
import { a_release_changelog_url, a_release_summary } from './given/release_data';
import { expect } from 'chai';
import { VersionNotProvided } from '../VersionNotProvided';

describe('for ReleaseParser', () => {
    describe('when version is empty', () => {
        const creator = a_release_notes_parser();

        let exception: unknown;
        try {
            creator.parse('', a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });

    describe('when version is whitespace', () => {
        const creator = a_release_notes_parser();

        let exception: unknown;
        try {
            creator.parse('      ', a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });

    describe('when version is null', () => {
        const creator = a_release_notes_parser();

        let exception: unknown;
        try {
            creator.parse(null as unknown as string, a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });

    describe('when version is undefined', () => {
        const creator = a_release_notes_parser();

        let exception: unknown;
        try {
            creator.parse(undefined as unknown as string, a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });
});
