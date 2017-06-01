"use strict";

/**
 * Represents a function for checking environment variables.
 * @param {Object} environmentVariables - environment variable object
 * @return {void}
 */
function checkEnvironmentVariables(environmentVariables) {

  var missingEnvVariables = [];

  if (environmentVariables) {
    Object.keys(environmentVariables).forEach(function (key) {

      if (!(process.env.hasOwnProperty(key) && process.env[key])) {
        missingEnvVariables.push(key);
      }
    });

    if (missingEnvVariables.length > 0) {
      console.error("There are some environment variables missing in the system: ", missingEnvVariables);
      throw new Error("There are some environment variables missing in the system: " + missingEnvVariables);
    }
  }
}

module.exports = checkEnvironmentVariables;
//# sourceMappingURL=checkEnvironmentVariables.js.map
