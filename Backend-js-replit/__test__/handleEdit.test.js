const handleEdit = require('../day06/Assignment/handleEdit.js')

  test(`테스트 01 --------------------`, async function () {
    expect(handleEdit('preferbaik', 'develope')).toEqual({
      nickname: 'preferbaik',
      interests: ['develope'],
      bio: '제 닉네임은 preferbaik입니다. 취미는 develope입니다.'
    })
  })

  test(`테스트 02 --------------------`, async function () {
    expect(handleEdit('뚜비', '방탈출, 테니스, 멍 때리기')).toEqual({
      nickname: '뚜비',
      interests: ['방탈출', '테니스', '멍 때리기'],
      bio: '제 닉네임은 뚜비입니다. 취미는 방탈출,테니스,멍 때리기입니다.'
    })
  })


