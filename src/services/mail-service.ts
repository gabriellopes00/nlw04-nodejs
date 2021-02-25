import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

class MailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  async send(to: string, subject: string, variables: object, path: string) {
    const templateContent = fs.readFileSync(path).toString('utf-8')
    const mailTemplateParse = handlebars.compile(templateContent)
    const html = mailTemplateParse(variables)

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>'
    })

    console.log('Email sent:', message.messageId)
    console.log('Preview URL:', nodemailer.getTestMessageUrl(message))
  }
}

export default new MailService()
