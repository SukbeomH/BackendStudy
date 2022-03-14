const reverseStr = require('../day08/Assignment/reverseStr.js')

test(`테스트 01 --------------------`, async function () {
  expect(reverseStr(['cODECAMP', 'iS', 'tHIS', 'eVERYONE', 'hELLO'])).toEqual(
    'Hello Everyone This Is Codecamp'
  )
})
