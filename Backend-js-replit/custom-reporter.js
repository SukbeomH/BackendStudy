class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig
    this._options = options
  }

  onRunStart() {
    console.log()
    console.log('......테스트 진행중......')
    console.log()
  }

  onRunComplete(_, results) {
    if (results.numFailedTestSuites === 0) {
      console.log('테스트를 모두 통과하셨습니다!!')
      console.log()
      return
    }

    console.log('------ 테스트 결과 ------')
    console.log(
      `통과한 테스트 : ${results.numPassedTests}개 / ${results.numTotalTests}개`
    )
    console.log(
      `실패한 테스트 : ${results.numFailedTests}개 / ${results.numTotalTests}개`
    )
    console.log(`-------------------------`)

    console.log()
    console.log(`[ 실패한 케이스 ]`)

    results.testResults[0].testResults.forEach((cur) => {
      if (cur.status === 'failed') {
        console.log()
        console.log(`${cur.title}`)
        console.log()

        if (cur.failureMessages[0].includes('Expected:')) {
          let [expected, received] = cur.failureMessages[0]
            .split('Expected:')[1]
            .split('Received:')

          if (received.includes('at')) {
            received = received.split('at')[0]
          }

          console.log(`* 기대 값 : ${expected}`)
          console.log(`* 실제로 리턴된 값 : ${received}`)
        } else {
          console.log(cur.failureMessages[0].split('at')[0])
        }
      }
    })
    console.log(`------------------------------`)
  }
}

module.exports = MyCustomReporter
