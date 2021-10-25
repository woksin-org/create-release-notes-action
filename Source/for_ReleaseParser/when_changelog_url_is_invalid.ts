// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { InvalidChangelogURL } from '../InvalidChangelogURL';
import { a_release_notes_parser } from './given/a_release_notes_parser';
import { a_release_summary, a_release_version } from './given/release_data';

describe('for ReleaseParser', () => {
    describe('when all changelog url is invalid', () => {
        const parser = a_release_notes_parser();

        let exception: unknown;
        try {
            parser.parse(a_release_version, a_release_summary, 'some invalid url');
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(InvalidChangelogURL));
    });
});
