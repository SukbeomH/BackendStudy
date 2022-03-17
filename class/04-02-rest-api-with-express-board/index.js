const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/boards', (요청, 응답) => {
  // 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
  const 보드덩어리 = [
    {number: 1, writer: "철수", title:"nameOfArticle", contents:"shit posts"},
    {number: 2, writer: "철수", title:"nameOfArticle", contents:"shit posts"},
    {number: 3, writer: "철수", title:"nameOfArticle", contents:"shit posts"},
    {number: 4, writer: "철수", title:"nameOfArticle", contents:"shit posts"},
  ]
  // 2. 꺼내온 결과를 응답으로 보내기
  응답.send('보드덩어리 나가신다')
})

app.post('/boards', (req, res) => {
  // 1. 데이터를 등록하는 로직  => DB에 저장하기
    // 프론트에서 데이터 받아오기
    // 콘솔로 받아온 데이터 찍어서 보기
  
  
  // 2. 저장 결과를 받아와서 알려주기
  res.send('등록성공 SHIT POSTS')
  console.log(req)
})
