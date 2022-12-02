
#!/usr/bin/env bash

for ((day=1;day<=25;day++));
do
  mkdir -p ${day};
  cd ${day};
  touch input.js;
  echo 'module.exports = {data:``};' >> input.js;
  touch script.js;
  echo "
  const { data } = require('./input');
  const lines = data.split('\n');

  const run = () => {

  };
  console.time('run');
  console.log(run());
  console.timeEnd('run');
  " >> script.js;
  cd ..;
done