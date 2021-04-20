const sum = (a, b) => a + b;
describe('mock test', () => {
  it('sum', () => {
    const response = sum(1, 2);
    expect(response).toEqual(3);
  });
});
