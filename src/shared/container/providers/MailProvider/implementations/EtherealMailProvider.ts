import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import nodemailer, { Transporter } from 'nodemailer'

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transpoter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
      })

      this.client = transpoter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe Gobarber <equipe@gobarber.com>',
      to,
      subject: 'Recuperação de senha ✔',
      text: body,
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }

}
