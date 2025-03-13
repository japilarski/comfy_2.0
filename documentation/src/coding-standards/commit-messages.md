# Commit Messages

All commits should follow [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/) format for the commit messages.

The prefixes which the version number are:

- `fix`: which represents bug fixes, and correlates to a SemVer patch.
- `feat`: which represents a new feature, and correlates to a SemVer minor.

Other helpful prefixes include:

- `docs`
- `test`

## Breaking Changes

Breaking changes are represented by adding an exclamation mark to the commit prefix.

Examples:

`feat!: Deprecate old API Version`
`fix!: Corrected spelling in response model`

## Adding Scope to commit messages

Additional context or scope can be indicated like so:

`fix(api): fixed business logic issue`

## How is this enforced?

This standard is automatically enforced using [Husky](https://typicode.github.io/husky/) hooks and [Commit Lint](https://commitlint.js.org)

## Additional Info

- The commit title is required, the body is not.
- Lines in a commit message should not exceed 100 characters
- It is required to have a colon separating the prefix from the tile.
