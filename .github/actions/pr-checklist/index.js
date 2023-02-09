const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const filesChanged = core.getInput("files-changed");
  for (const file of filesChanged.split("__I__")) {
    console.log("FILE:", file);
  }
} catch (error) {
  core.setFailed(error.message);
}
