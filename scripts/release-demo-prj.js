const client = require('scp2');

console.log('Copying demo app files...');
client.scp('./dist/groot-tester/', {
  host: '192.168.232.41',
  username: 'root',
  password: 'mariano',
  path: '/work/apache/groot-doc'
}, err => {
  if (err) {
    console.error('Cannot copy files!');
    console.error(err);
  } else {
    console.log('Copy complete!');
  }
});
