const wrench = require('wrench');
const fs = require('fs');

fs.copyFileSync('../../README.md', '../../dist/groot/README.md');
wrench.copyDirSyncRecursive('./src/style', '../../dist/groot/style', {
  forceDelete: true
});
wrench.copyDirSyncRecursive('./src/assets', '../../dist/groot/assets', {
  forceDelete: true
});

console.log('Asset files successfully copied!');
