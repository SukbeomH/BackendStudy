/**
 * @swagger
 * /tokens/phone:
 *     post:
 *       parameter:
 *         - in: path
 *       tags:
 *         - phone
 *       summary: 전화번호를 보내면 토큰 생성
 *       description: Send the Phone number to get Token
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 phone: "01012348765"
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *                type: string
 *                example:
 *                  01043215678으로 인증번호 (재)전송됨
 *     patch:
 *       tags:
 *         - phone
 *       summary: 인증번호 입력으로 인증을 완료
 *       description: Complete the Auth
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 phone: "01045671234"
 *                 token: "962137"
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *                type: boolean
 *                example:
 *                  true
 * /user:
 *     post:
 *       tags:
 *         - user
 *       summary: 새로운 유저 생성, 가입
 *       description: Register New User
 *       requestBody:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 name: 다나와
 *                 email: brenthong93@gmail.com
 *                 personal: 930101-1111111
 *                 prefer: http://www.danawa.com/
 *                 pwd: "1234"
 *                 phone: "01012345432"
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *               type: string
 *               example:
 *                 624049d34ccad6d254e0f479
 *       responses:
 *         "422":
 *           description: Token Auth error
 *           content:
 *             application/json:
 *              schema:
 *               type: string
 *               example:
 *                 에러 : 핸드폰번호가 인증되지 않았습니다
 * /users:
 *     get:
 *       tags:
 *         - users
 *       summary: 가입된 유저들의 리스트를 가져옴
 *       description: Get users list
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *               type: object
 *               example:
 *                 {
 *                      "_id": "62404a87b01a668e48ab1395",
 *                      "name": "고길동",
 *                      "email": "brenthong93@gmail.com",
 *                      "personal": "667101-*******",
 *                      "prefer": "http://www.naver.com/",
 *                      "pwd": "1234",
 *                      "phone": "01066136228",
 *                      "og": {
 *                          "title": "네이버",
 *                          "url": "https://www.naver.com/",
 *                          "image": "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
 *                          "description": "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                            },
 *                      "__v": 0
 *                  }
 * /starbucks:
 *     get:
 *       tags:
 *         - starbucks
 *       summary: 커피 리스트를 가져옴
 *       description: Get coffee list
 *       responses:
 *         "200":
 *           description: Successful response
 *           content:
 *             application/json:
 *              schema:
 *               type: object
 *               example:
 *                      {
 *                           "_id": "623d899ec5653ef8f0a51fa2",
 *                           "name": "에스프레소 콘 파나",
 *                           "img": "https://image.istarbucks.co.kr/upload/store/skuimg/2021/04/[30]_20210415144252244.jpg",
 *                           "__v": 0
 *                       }
 *
 */
