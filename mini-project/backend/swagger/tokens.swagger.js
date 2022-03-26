/**
 * @swagger
 * /tokens/phone:
 *   get:
 *      summary: Send phone number and get token, validation
 *      tags: [tokens]
 *      parameter:
 *          - in: path
 *            name: phone
 *            type: str
 *      responses:
 *          200:
 *              description: 성공
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              properties:
 *                                  number:
 *                                      type: int
 *                                      example: 2
 *                                  writer:
 *                                      type: string
 *                                      example: 철수
 *                                  title:
 *                                      type: string
 *                                      example: 제목
 *                                  contents:
 *                                      type: string
 *                                      example: 내용입니다
 *
 */
