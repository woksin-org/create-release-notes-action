// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';
import { NoFormatterDefinedFor } from '../NoFormatterDefinedFor';

import { OutputFormatters } from '../OutputFormatters';
import { an_msbuild_formatter, a_raw_formatter } from './given/some_output_formatters';

describe('for OutputFormatters', () => {
    describe('when formatting with a formatter that is not provided', () => {
        const formatters = new OutputFormatters(a_raw_formatter(), an_msbuild_formatter());

        let exception: unknown;
        try {
            formatters.format('some other format', 'some output string');
        } catch (error) {
            exception = error;
        }

        it('should fail', () => expect(exception).to.be.instanceOf(NoFormatterDefinedFor));
    });
});
