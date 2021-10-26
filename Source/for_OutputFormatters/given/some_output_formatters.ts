// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as sinon from 'ts-sinon';

import { IFormatOutputs } from '../../IFormatOutputs';

class MockFormatter implements IFormatOutputs {
    constructor(readonly type: string) {}

    format(output: string): string {
        return output;
    }
}

export const a_raw_formatter = () => sinon.stubObject(new MockFormatter('raw'));

export const another_raw_formatter = () => sinon.stubObject(new MockFormatter('raw'));

export const an_msbuild_formatter = () => sinon.stubObject(new MockFormatter('msbuild'));
