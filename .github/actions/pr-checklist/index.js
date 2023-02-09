const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const filesChanged = core.getMultilineInput("files-changed");
  if (filesChanged.length <= 1) {
    process.exit(1);
  }
  for (const file of filesChanged) {
    console.log("__file__:", file);
  }
} catch (error) {
  core.setFailed(error.message);
}
