// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { MSbuildOutputFormatter } from '../MSbuildOutputFormatter';

describe('for MSbuildOutputFormatter', () => {
    describe('when formatting', () => {
        const formatter = new MSbuildOutputFormatter();

        const output = 'Some very complicated; ,, string! 😁';
        const expected = 'Some very complicated%3B %2C%2C string! 😁';

        const result = formatter.format(output);

        it('should pass the output straight through', () => expect(result).to.equal(expected));
    });
});
