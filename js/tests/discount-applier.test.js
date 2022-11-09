const test = require('tape')
const DiscountApplier = require('../discount-applier')

test('apply v1', (t) => {
  let call = 0
  const users = ['user1']
  const discount = '10%'
  const notifier = {
    notify: (user, message) => {
      call += 1
      t.equals(user, users[0], 'should notify user1')
    }
  }
  const discountApplier = new DiscountApplier(notifier)

  discountApplier.applyV1(discount, users, notifier)
  t.equals(call, 1, 'should notify 1 user')
  t.end()
})

test('apply v2', (t) => {
  let call = 0
  const users = ['user1', 'user2']
  const discount = '10%'
  const notifier = {
    notify: (user, message) => {
      t.equals(user, users[call], 'should notify the right user')
      t.equals(message, `You've got a new discount of ${discount}`, 'should notify the right message')
      call += 1
    }
  }
  const discountApplier = new DiscountApplier(notifier)

  discountApplier.applyV1(discount, users, notifier)
  t.equals(call, 2, 'should notify 2 user')
  t.end()
})
