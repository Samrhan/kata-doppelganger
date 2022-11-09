const test = require('tape')
const Calculator = require('../calculator')

class AuthorizerTest {
  authorize () {
    return false;
  }
}

test('should throw when not authorized', (t) => {
  const calculator = new Calculator(new AuthorizerTest())
  t.throws(() => calculator.divide(3, 4), 'Not authorized')
  t.end()
})
