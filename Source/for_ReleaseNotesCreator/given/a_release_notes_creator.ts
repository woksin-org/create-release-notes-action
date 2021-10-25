// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NullLogger } from '@dolittle/github-actions.shared.logging';
import { ReleaseNotesCreator } from '../../ReleaseNotesCreator';

export const a_release_notes_creator = new ReleaseNotesCreator(new NullLogger());
