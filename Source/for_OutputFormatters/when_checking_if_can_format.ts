// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { OutputFormatters } from '../OutputFormatters';
import { an_msbuild_formatter, a_raw_formatter } from './given/some_output_formatters';


describe('for OutputFormatters', () => {
    const formatters = new OutputFormatters(a_raw_formatter(), an_msbuild_formatter());

    describe('when checking if can format for a formatter that is provided', () => {
        const result = formatters.canFormat(a_raw_formatter().type);

        it('should return true', () => expect(result).to.be.true);
    });

    describe('when checking if can format for a formatter that is not provided', () => {
        const result = formatters.canFormat('some other type');

        it('should return false', () => expect(result).to.be.false);
    });
});
