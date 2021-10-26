// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { expect } from 'chai';

import { OutputFormatters } from '../OutputFormatters';
import { an_msbuild_formatter, a_raw_formatter } from './given/some_output_formatters';


describe('for OutputFormatters', () => {
    describe('when formatting', () => {
        const raw_formatter = a_raw_formatter();
        const msbuild_formatter = an_msbuild_formatter();
        const formatters = new OutputFormatters(raw_formatter, msbuild_formatter);

        raw_formatter.format.returns('raw format result');
        msbuild_formatter.format.returns('msbuild format result');

        const type = raw_formatter.type;
        const output = 'some_input string is here';

        const result = formatters.format(type, output);

        it('should call the raw formatter', () => expect(raw_formatter.format).to.be.calledOnceWith(output));
        it('should not call the msbuild formatter', () => expect(msbuild_formatter.format).to.not.be.called);
        it('should return the result from the raw formatter', () => expect(result).to.equal('raw format result'));
    });
});
