## What

Describe very concisely what this Pull Request does.

## Why

Describe what motivated this Pull Request and why this was necessary. Link to the relevant JIRA Issue. Ex. Closes CIDC-1086

## How

Describe details of how you implemented the solution, outlining the major steps involved in adding this new feature or fixing this bug. Provide code-snippets if possible, showing example usage.

## Remarks

Add notes on possible known quirks/drawbacks of this solution.

## Checklist

Please include and complete the following checklist. You can mark an item as complete with the `- [x]` prefix:

- [ ] Tests - Added unit tests for new code, regression tests for bugs, and updated the integration tests if required
- [ ] Formatting & Linting - `black` has been used to standardize formatting
- [ ] Type Annotations - All new code has been type annotated in the function signatures using type hints
- [ ] Docstrings - Docstrings have been provided for functions
- [ ] Documentation - Documentation site in `docs/` has be regenerated and `README.md` and `CHANGELOG.md` have been updated to explain major changes & new features
- [ ] Package version - Bumped and commited the new package version using `poetry version <major|minor|patch>`
