/**
 * @swagger
 * /boilerplate:
 *   get:
 *      summary: 설명적어라
 *      tags: [태그써라]
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
