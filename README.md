# git_branching_strategy

Deploying an example Python package with GitHub Actions and feature/fix branches. Including my lessons learned.

## Lessons Learned

### Concept

The thought for the python package came from this [Tutorial](#tutorial). The feature/fix prefixed branches are designated to modify the python package. Pushing to main branch is disabled by [Branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule). When new code is added, the ideal workflow is to test it, format & lint it, and any other necessary checks before the Pull Request (PR) can be considered mergeable. Once the PR is merged, another workflow builds and deploys the code to PyPI. Branches that aren't feature/fix are considered non-package related (e.g., repo housekeeping, improvements to CI pipeline) and therefore don't trigger the CI workflow.

### Automated Pull Request checks

There is a [pull_request_template.md](.github/pull_request_template.md) that includes a checklist for PR reviews. Most of those checks are manual.
The one exception is a job that checks that the developer has bumped the package version. I like the simplicity of a PR checklist, but I can understand how a busy PR Reviewer might skim manual checks or skip them altogether. On the other hand, using automated workflows for every aspect of the project could become overkill. I think better to start simple and work towards finding a balance between simplicity/automated checks.

One simple/automated approach would be to use `git diff --name-only`, listing all of the modified files in this PR. Any expected file changes like `CHANGELOG`, `README`, github.io `docs/` could be checked for modification. It wouldn't care about what the modifications were. The manual checklist would still be used, but now with the aid of status checks for completing that checklist. It might look something like this in the PR comments section:

```
3 checks passed, 1 failed
|___ ✅ CHANGELOG modified
|___ ⏭️ README skipped
|___ ✅ docs/ modified
|___ ❌ pyproject.toml required
```

> The [pyproject.toml](pyproject.toml) file is required because it contains the package version for the next deployment. Everything else is optional and therefore won't cause the status checks to fail.

### Deployments

The syntax used in the [ci.yml](.github/workflows/ci.yml) file works well for handling the different states of a PR.

```yaml
on:
  pull_request:
    # Any actions that would push new code.
    # `closed` is considered because I want to run the workflow after merging the PR
    types: [opened, reopened, ..., closed]
    branches: [main]

jobs:
  pre_deployment:
    # any of the actions listed in `types` is fair game except if the action is closed
    if: github.action != 'closed'
    steps:

  deploy:
    # the PR has just been closed and merged into main
    if: github.event.pull_request.merged == true
    steps:
```

### Testing GitHub Actions Locally with act

I used act (https://github.com/nektos/act) in dry-run mode for the majority of my testing. I used dry-run to test which workflow steps will be executed based on different events + action combinations. I didn't have much success testing in a live environment because of missing software from the default images. I want to spend more time learning this aspect of the tool. The README includes guidance for curating images (https://github.com/nektos/act#runners).

### Poetry

This is my first time using poetry, but not my last. My approach for getting started with Python has been to use brew, pip, and virtualenv. It works fine enough. I do want to explore pyenv (https://github.com/pyenv/pyenv) in combination with poetry. I think poetry is getting me on the right track to a more manageable python/site-packages envionment.

Current method,

```sh
$ brew install python@<version>
$ /opt/homebrew/lib/python3.9/site-packages/pip install virtualenv
$ cd projects/my-python-package/
$ virtualenv venv -p /opt/homebrew/bin/python3.9
$ source venv/bin/activate
(venv) $ pip install -r requirements.txt
```

With poetry,

```sh
brew install pipx
pipx install poetry
cd projects/my-python-package/
poetry init
poetry add ...
```

## Tutorial

https://packaging.python.org/en/latest/tutorials/packaging-projects/

## References

- Test GitHub Actions locally with [act](https://github.com/nektos/act)
- Learn how to test different --eventpath payloads [webhooks events and payloads](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads)
- Poetry for dependency management and software packaging: https://python-poetry.org/docs/
