const pencil = require('../day10/Assignment/pencil.js')


test(`테스트 01 --------------------`, async function() {
  expect(pencil(25)).toEqual(3);
});

test(`테스트 02 --------------------`, async function() {
  expect(pencil(178)).toEqual(15);
});