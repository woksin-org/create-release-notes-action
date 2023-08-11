// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NullLogger } from '@woksin/github-actions.shared.logging';
import { ReleaseParser } from '../../ReleaseParser';

export const a_release_notes_parser = () => new ReleaseParser(new NullLogger());
