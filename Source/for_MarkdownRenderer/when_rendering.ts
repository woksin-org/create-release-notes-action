// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { a_markdown_renderer } from './given/a_markdown_renderer';
import { some_release_notes, some_release_notes_input } from './given/some_release_notes';

describe('for MarkdownRenderer', () => {
    describe('when rendering', () => {
        const renderer = a_markdown_renderer();

        const rendered = renderer.render(some_release_notes);

        it('should return the same as the input', () => expect(rendered.trim()).to.equal(some_release_notes_input.trim()));
    });
});
