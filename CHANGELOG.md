# [1.1.1] - 2021-10-26 [PR: #4](https://github.com/dolittle/create-release-notes-action/pull/4)
## Summary

Fixed a little typo in the "output-format" input printing.

### Fixed

- Typo in input printing


# [1.1.0] - 2021-10-26 [PR: #3](https://github.com/dolittle/create-release-notes-action/pull/3)
## Summary

Introducing output formatters to cater to special string handling of different build tools.

### Added

- Input parameter to select output formatting
- Raw output formatting for doing noting with the output string (default)
- MSbuild output formatter that escapes commas and semicolons


# [1.0.0] - 2021-10-25 [PR: #2](https://github.com/dolittle/create-release-notes-action/pull/2)
## Summary

This first release introduces the Create Release Notes action. It receives a release summary, a version and an optional changelog URL and modifies the release summary to say which version was released in the header, and adds a link to the changelog at the bottom.

These are rendered both back to the original Markdown format, and as a plain text string - to be used for release notes in packages such as NuGet.


