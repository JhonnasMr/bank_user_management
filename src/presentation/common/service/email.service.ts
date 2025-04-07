import nodemailer, { Transporter } from 'nodemailer';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    attachments?: Attachment[];
}

interface Attachment {
    path: string;
    filename: string;
}


export class EmailService {

    private transporter: Transporter;

    constructor(
        mailerService: string,
        mailerEmail: string,
        senderEmailPassword: string,
        private readonly postToProvider: boolean,
    ) {
        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: senderEmailPassword,
            }
        })
    }

    async sendEmail(options: SendEmailOptions) {

        const { to, subject, html, attachments = [] } = options;

        try {

            await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: html,
                // attachments: attachments,
            })

        } catch (error) {
            throw new Error(`Failed to send email: ${error}`);
        }
    }


}