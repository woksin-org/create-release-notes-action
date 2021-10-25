// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { a_release_notes_creator } from './given/a_release_notes_creator';
import {
    release_body_with_summary_as_first_title,
} from './given/some_release_bodies';

describe('for PlaintextRenderer', () => {
    describe('when creating and no changelog url is set', () => {
        const creator = a_release_notes_creator;

        const releaseNotes = creator.createFrom({
            version: '1.33.7',
            body: release_body_with_summary_as_first_title,
            hasChangelogURL: false,
            changelogURL: '',
        });

        it('should not append a changelog section', () => expect(releaseNotes[releaseNotes.length - 1].raw).to.equal('- Describe the part of the code being deprecated and why'));
    });
});
