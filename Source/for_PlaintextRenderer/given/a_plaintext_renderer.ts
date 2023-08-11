// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NullLogger } from '@woksin/github-actions.shared.logging';
import { PlaintextRenderer } from '../../PlaintextRenderer';

export const a_plaintext_renderer = () => new PlaintextRenderer(new NullLogger());
