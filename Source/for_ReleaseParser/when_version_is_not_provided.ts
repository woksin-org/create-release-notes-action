// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { VersionNotProvided } from '../VersionNotProvided';
import { a_release_notes_parser } from './given/a_release_notes_parser';
import { a_release_changelog_url, a_release_summary } from './given/release_data';

describe('for ReleaseParser', () => {
    describe('when version is empty', () => {
        const parser = a_release_notes_parser();

        let exception: unknown;
        try {
            parser.parse('', a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });

    describe('when version is whitespace', () => {
        const parser = a_release_notes_parser();

        let exception: unknown;
        try {
            parser.parse('      ', a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });

    describe('when version is null', () => {
        const parser = a_release_notes_parser();

        let exception: unknown;
        try {
            parser.parse(null as unknown as string, a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });

    describe('when version is undefined', () => {
        const parser = a_release_notes_parser();

        let exception: unknown;
        try {
            parser.parse(undefined as unknown as string, a_release_summary, a_release_changelog_url);
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(VersionNotProvided));
    });
});
