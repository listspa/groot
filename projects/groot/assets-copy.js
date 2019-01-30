var wrench = require('wrench');

wrench.copyDirSyncRecursive('./src/style', '../../dist/groot/style', {
  forceDelete: true
});
wrench.copyDirSyncRecursive('./src/assets', '../../dist/groot/assets', {
  forceDelete: true
});

console.log('Asset files successfully copied!');
