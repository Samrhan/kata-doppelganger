const DiscountApplier = require('../discount-applier')
const notifier = {
  notify: jest.fn()
}
describe('Discount Applier', () => {
  const discountApplier = new DiscountApplier(notifier)
  beforeEach(() => {
    notifier.notify.mockClear()
  })
  it('should call notify nth time on V1', () => {
    const users = ['user1']
    const discount = '10%'
    discountApplier.applyV1(discount, users)
    expect(notifier.notify).toHaveBeenCalledTimes(1)
  })
  it('should notify each user on V2', () => {
    const users = ['user1', 'user2']
    const discount = '10%'
    discountApplier.applyV2(discount, users)
    expect(notifier.notify).toHaveBeenCalledTimes(2)
    expect(notifier.notify).toHaveBeenCalledWith(users[0], `You've got a new discount of ${discount}`)
    expect(notifier.notify).toHaveBeenCalledWith(users[1], `You've got a new discount of ${discount}`)
  })
})
