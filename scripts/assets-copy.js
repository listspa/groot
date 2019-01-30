const wrench = require('wrench');
const fs = require('fs');

fs.copyFileSync('./README.md', './dist/groot/README.md');
wrench.copyDirSyncRecursive('./projects/groot/src/style', './dist/groot/style', {
  forceDelete: true
});
wrench.copyDirSyncRecursive('./projects/groot/src/assets', './dist/groot/assets', {
  forceDelete: true
});

console.log('Asset files successfully copied!');
