// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { MultipleFormattersDefinedFor } from '../MultipleFormattersDefinedFor';
import { OutputFormatters } from '../OutputFormatters';
import { another_raw_formatter, a_raw_formatter } from './given/some_output_formatters';

describe('for OutputFormatters', () => {
    describe('when constructing from multiple formatters are defined for the same type', () => {
        let exception: unknown;
        try {
            new OutputFormatters(a_raw_formatter(), another_raw_formatter());
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(MultipleFormattersDefinedFor));
    });
});
