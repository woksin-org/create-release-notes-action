// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NullLogger } from '@woksin/github-actions.shared.logging';
import { MarkdownRenderer } from '../../MarkdownRenderer';

export const a_markdown_renderer = () => new MarkdownRenderer(new NullLogger());
