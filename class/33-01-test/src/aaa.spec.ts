it('더하기 테스트', () => {
  const a = 2;
  const b = 3;

  expect(a + b).toBe(5);
});

// test multiple it
describe('test group', () => {
  it('더하기 테스트', () => {
    const a = 2;
    const b = 3;

    expect(a + b).toBe(5);
  });
  it('곱하기 테스트', () => {
    const a = 2;
    const b = 3;

    expect(a * b).toBe(6);
  });
  it('더하기 테스트', () => {
    const a = 2;
    const b = 3;

    expect(a ** b).toBe(8);
  });
});

// 상품구매하기 테스트 예제
describe('상품구매 테스트', () => {
  beforeEach(() => {
    it('로그인은 했나?', () => {
      const result = true;
      expect(result).toBe(true);
    });
  });

  it('포인트 검증', () => {
    const result = true;
    expect(result).toBe(true);
  });
  it('상품 구매하기', () => {
    const result = true;
    expect(result).toBe(true);
  });
});
