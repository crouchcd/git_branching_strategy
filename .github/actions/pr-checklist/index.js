const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const filesChanged = core.getMultilineInput("files-changed");
  for (const file in filesChanged) {
    console.log("multiline:", file);
  }
  const filesChangedSingle = core.getInput("files-changed");
  for (const file in filesChangedSingle.split("\n")) {
    console.log("newline:", file);
  }
  for (const file in filesChangedSingle.split(" ")) {
    console.log("space:", file);
  }
} catch (error) {
  core.setFailed(error.message);
}
