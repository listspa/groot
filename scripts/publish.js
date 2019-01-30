const glob = require('glob');
const spawn = require('child_process').spawn;

const tgz = glob.sync('./dist/groot/listspa-groot-*.tgz');
if (tgz.length !== 1) {
  throw new Error("Expected to find exactly one tgz file in dist");
}

spawn('npm.cmd', ['publish', tgz[0]], {stdio: 'inherit'});
