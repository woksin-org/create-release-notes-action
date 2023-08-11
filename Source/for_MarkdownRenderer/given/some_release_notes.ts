// Copyright (c) woksin-org. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Lexer } from 'marked';
import { ReleaseNotes } from '../../ReleaseNotes';

export const some_release_notes_input = `
## Version 1.0.0

Summary of the PR here. The GitHub release description is created from this comment so keep it nice and descriptive.

Remember to remove sections that you don't need or use.

### Added

- Describe the added features

### Changed

- Describe the outwards facing code change

### Fixed

- Describe the fix and the bug

### Removed

- Describe what was removed and why

### Security

- Describe the security issue and the fix

### Deprecated

- Describe the part of the code being deprecated and why

## Changelog

For all release notes, see [changelog](https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md)
`;

export const some_release_notes: ReleaseNotes = new Lexer().lex(some_release_notes_input);

export const expected_release_notes_output = `
Version 1.0.0:
Summary of the PR here. The GitHub release description is created from this comment so keep it nice and descriptive.

Remember to remove sections that you don't need or use.

Added:
- Describe the added features

Changed:
- Describe the outwards facing code change

Fixed:
- Describe the fix and the bug

Removed:
- Describe what was removed and why

Security:
- Describe the security issue and the fix

Deprecated:
- Describe the part of the code being deprecated and why

Changelog:
For all release notes, see changelog (https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md)
`;
