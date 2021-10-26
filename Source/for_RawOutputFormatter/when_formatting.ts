// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { RawOutputFormatter } from '../RawOutputFormatter';

describe('for RawOutputFormatter', () => {
    describe('when formatting', () => {
        const formatter = new RawOutputFormatter();

        const output = 'Some very complicated; , string! 😁';

        const result = formatter.format(output);

        it('should pass the output straight through', () => expect(result).to.equal(output));
    });
});
