const sender = require('../mail-sender')
const { MailSender, Request } = sender

const httpClient = {
  post: jest.fn()
}

describe('Mail Sender', () => {
  const mailSender = new MailSender(httpClient)

  beforeEach(() => {
    httpClient.post.mockClear()
  })

  it('should pass the argument in the right order on V1', () => {
    const user = { name: 'John', email: 'john.doe@live.com' }
    const message = 'Hello world'
    const request = new Request(user.name, user.email, 'New notification', message)

    mailSender.sendV1(user, message)
    expect(httpClient.post).toHaveBeenCalledTimes(1)
    expect(httpClient.post).toHaveBeenCalledWith('https://api.mailsender.com/v3/', request)
  })

  it('should call the http client again on 503', () => {
    const user = { name: 'John', email: 'john.doe@live.com' }
    const message = 'Hello world'
    const request = new Request(user.name, user.email, 'New notification', message)

    httpClient.post.mockReturnValueOnce({ code: 503 })
    mailSender.sendV2(user, message)
    expect(httpClient.post).toHaveBeenCalledTimes(2)
    expect(httpClient.post).toHaveBeenNthCalledWith(2, 'https://api.mailsender.com/v3/', request)
  })
})
