const sender = require('../mail-sender')
const test = require('tape')
const { MailSender, Request } = sender
test('send v1', (t) => {
  let call = 0
  const httpClient = {
    post: (url, request) => {
      t.equal(request instanceof Request, true, 'should be a request')
      t.equal(url, 'https://api.mailsender.com/v3/', 'should be the url')
      t.equal(request.name, 'John', 'should be the name')
      t.equal(request.email, 'john.doe@live.com', 'should be the mail')
      t.equal(request.subject, 'New notification', 'should be the subject')
      t.equal(request.message, 'Hello world', 'should be the message')
      call++
    }
  }
  const mailSender = new MailSender(httpClient)
  mailSender.sendV1({ name: 'John', email: 'john.doe@live.com' }, 'Hello world')
  t.equal(call, 1, 'should call the http client once')
  t.end()
})

test('send v2', (t) => {
  let call = 0
  const httpClient = {
    post: (url, request) => {
      t.equal(request instanceof Request, true, 'should be a request')
      t.equal(url, 'https://api.mailsender.com/v3/', 'should be the url')
      t.equal(request.name, 'John', 'should be the name')
      t.equal(request.email, 'john.doe@live.com', 'should be the mail')
      t.equal(request.subject, 'New notification', 'should be the subject')
      t.equal(request.message, 'Hello world', 'should be the message')
      call++
      return { code: call === 1 ? 503 : 200 }
    }
  }
  const mailSender = new MailSender(httpClient)
  mailSender.sendV2({ name: 'John', email: 'john.doe@live.com' }, 'Hello world')
  t.equal(call, 2, 'should be called twice')
  t.end()
})
