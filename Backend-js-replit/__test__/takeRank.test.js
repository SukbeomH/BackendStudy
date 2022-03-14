const takeRank = require('../day07/Assignment/takeRank.js')

test(`테스트 01 --------------------`, async function () {
  expect(takeRank([87, 89, 92, 100, 76])).toEqual([4, 3, 2, 1, 5])
})
