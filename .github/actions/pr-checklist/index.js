const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const filesChanged = core.getInput("files-changed");
  const splitby__I__ = filesChanged.split("__I__");
  if (splitby__I__.length <= 1) {
    process.exit(1);
  }
  for (const file of splitby__I__) {
    console.log("__file__:", file);
  }
} catch (error) {
  core.setFailed(error.message);
}
