const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const filesChanged = core.getInput("files-changed");
  console.log("FILES:", filesChanged);
} catch (error) {
  core.setFailed(error.message);
}
