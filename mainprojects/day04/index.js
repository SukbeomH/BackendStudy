// 라이브러리 설치, 임포트
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
// Swagger 파일 아웃소싱 & 임포트
import { options } from './swagger/config.js'
// 데이터 베이스 임포트
import { usersData , coffeeData } from './DATABASE/DB.js'
const app = express()
const port = 3000
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

//서버가 듣고있나요?
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//사용자 데이터 조회
app.get('/users', (req, res) => {
    res.send(usersData)
})

//커피 목록 조회
app.get('/starbucks', (req, res) => {
    res.send(coffeeData)
})