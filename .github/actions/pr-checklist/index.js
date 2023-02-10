const core = require("@actions/core");

const MATCHING_CHARS = /(\^|\.\*|$)/g;

/**
 *
 * @param {RegExp[]} patterns
 * @param {string[]} inputs
 * @returns
 */
function testFiles(patterns, inputs) {
  const found = [];
  const missing = [];
  for (const pattern of patterns) {
    if (!pattern.source) {
      continue;
    }
    let exists = false;
    for (const fileIn of inputs) {
      if (pattern.test(fileIn)) {
        exists = true;
        break;
      }
    }
    if (exists) {
      found.push(pattern.source.replace(MATCHING_CHARS, ""));
    } else {
      missing.push(pattern.source.replace(MATCHING_CHARS, ""));
    }
  }
  return { found: found, missing: missing };
}

try {
  const filesChanged = core.getInput("files-changed").split("__I__");
  const filesRequired = core
    .getInput("files-required")
    .split("__I__")
    .map((pattern) => new RegExp(pattern));
  const filesOptional = core
    .getInput("files-optional")
    .split("__I__")
    .map((pattern) => new RegExp(pattern));
  const found = [];
  const missing = [];
  const skipped = [];
  const required = testFiles(filesRequired, filesChanged);
  const optional = testFiles(filesOptional, filesChanged);
  missing.push(...required.missing);
  skipped.push(...optional.missing);
  found.push(...required.found);
  found.push(...optional.found);
  core.setOutput("missing", missing.join("__I__"));
  core.setOutput("skipped", skipped.join("__I__"));
  core.setOutput("found", found.join("__I__"));
} catch (error) {
  core.setFailed(error.message);
}
