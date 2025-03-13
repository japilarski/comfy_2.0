# Branch Naming

A branch name consists of multiple segments, delimited with `-` symbol, that are appended together into a single string.
The segments consist of:

1. Branch prefix
2. Trello reference
3. Summary

The branch convention follows the pattern outlined below.

`BRANCH_PREFIX-TRELO_REF-SUMMARY`

Below is a list of allowed branch prefixes:

- chore - this should be used for small tasks that aren't always directly related to a planed workflow
- fix - this should be used for bugs or hot fixes
- feat - this should be used for feature development

Some examples:

- `feat-BL-123-add-new-frontend-page`
- `fix-BL-321-change-test-cost-calculation`
- `chore-NO_JIRA-update-maintainer-docs`
