# GitHub Action - Create Release Notes
This GitHub action creates release notes from a release summary (usually a Pull Request body) formatted
like [this template](.github/PULL_REQUEST_TEMPLATE.md). The output can be used for packages published to
e.g. NuGet.

### Pre requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow) is available below.

For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file)

### Inputs
- `body` (required): The body of the release summary. Recommended format [PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md).
- `version` (required): The version released.
- `changelog-url`: If provided, a link to this URL will be appended to the bottom of the release notes.

### Outputs
- `markdown`: Release notes formatted as Markdown
- `plaintext`: Release notes formatted as plain text

### Example Workflow
```yaml
on:
  push:
    branches:
    - '**'
  pull_request:
    types: [closed]

name: GitHub action workflow name

jobs:
  context:
    name: Job name
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Establish context
        id: context
        uses: woksin-org/establish-context-action@v4
      - name: Create release notes
        uses: woksin-org/create-release-notes-action@v3
        with:
          body: ${{ steps.context.outputs.pr-body }}
          version: ${{ steps.context.outputs.new-version }}
          changelog-url: "https://github.com/dolittle/create-release-notes-action/blob/master/CHANGELOG.md"
        
```
## Contributing
We're always open for contributions and bug fixes!
