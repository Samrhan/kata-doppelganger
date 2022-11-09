const Calculator = require('../calculator')

const authorizer = {
  authorize : jest.fn().mockReturnValue(false),
}


describe('Calculator', ()=>{
  test('should throw when not authorized', ()=>{
    const calculator = new Calculator(authorizer)
    expect(() => calculator.divide(3, 4)).toThrow('Not authorized')
    expect(authorizer.authorize).toHaveBeenCalledTimes(1)
  })
})
