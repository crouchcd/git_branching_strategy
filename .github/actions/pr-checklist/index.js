const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const filesChanged = core.getMultilineInput("files-changed");
  for (const file in filesChanged) {
    core.debug("multiline:", file);
  }
  const filesChangedSingle = core.getInput("files-changed");
  for (const file in filesChangedSingle.split("\n")) {
    core.debug("newline:", file);
  }
  for (const file in filesChangedSingle.split(" ")) {
    core.debug("space:", file);
  }
} catch (error) {
  core.setFailed(error.message);
}
