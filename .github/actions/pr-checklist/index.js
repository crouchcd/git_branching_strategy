const core = require("@actions/core");
// const github = require("@actions/github");

try {
  const filesChanged = core.getInput("files-changed");
  for (const file in filesChanged.split(" ")) {
    core.debug(`space:${file}`);
  }
  for (const file in filesChanged.split("__I__")) {
    core.debug(`__I__:${file}`);
  }
} catch (error) {
  core.setFailed(error.message);
}
