/**
 * @swagger
 * /users:
 *   get:
 *      summary: 회원 목록 조회
 *      tags: [users]
 *      parameter:
 *          - in: query
 *            name: number
 *            type: int
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              properties:
 *                                  email:
 *                                      type: string
 *                                      example: aaa@aaa.com
 *                                  name:
 *                                      type: string
 *                                      example: 철수
 *                                  phone:
 *                                      type: string
 *                                      example: 01099995555
 *                                  personal:
 *                                      type: string
 *                                      example: 781206-6745123
 *                                  prefer:
 *                                      type: string
 *                                      example: http://fedex.com
 *     
 */