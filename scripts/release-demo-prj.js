const client = require('scp2');

client.scp('./dist/groot-tester/', {
  host: '192.168.232.41',
  username: 'root',
  password: 'mariano',
  path: '/work/apache/groot-doc'
}, err => {
  console.log(err);
});
