// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { OutputFormatters } from '../OutputFormatters';
import { an_msbuild_formatter, a_raw_formatter } from './given/some_output_formatters';

describe('for OutputFormatters', () => {
    describe('when constructing from multiple formatters are defined for diffent_types', () => {
        let exception: unknown;
        try {
            new OutputFormatters(a_raw_formatter(), an_msbuild_formatter());
        } catch (error) {
            exception = error;
        }

        it('should fail not fail', () => expect(exception).to.be.undefined);
    });
});
