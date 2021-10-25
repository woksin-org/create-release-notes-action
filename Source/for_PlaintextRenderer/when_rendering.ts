// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';
import { expected_release_notes_output } from '../for_MarkdownRenderer/given/some_release_notes';

import { a_plaintext_renderer } from './given/a_plaintext_renderer';
import { some_release_notes } from './given/some_release_notes';

describe('for PlaintextRenderer', () => {
    describe('when rendering', () => {
        const renderer = a_plaintext_renderer();

        const rendered = renderer.render(some_release_notes);

        it('should return the expected output', () => expect(rendered.trim()).to.equal(expected_release_notes_output.trim()));
    });
});
