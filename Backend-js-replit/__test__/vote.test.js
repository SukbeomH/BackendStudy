const vote = require('../day09/Assignment/vote.js')

test(`테스트 01 --------------------`, async function() {
  expect(vote("BACBACCACCBDEDE")).toEqual('C');
});