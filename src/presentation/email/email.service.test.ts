import nodemailer from 'nodemailer';
import { EmailService, SendEmailOptions, Attachment } from './email.service';


describe('email.service', () => {


    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test('should send email', async () => {

        const options: SendEmailOptions = {
            to: 'alvaro@google.com',
            subject: 'test',
            htmlBody: '<h1>Test</h1>'
        }

        await emailService.sendEmail(options);

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: expect.any(Array),
            html: "<h1>Test</h1>",
            subject: "test",
            to: "alvaro@google.com",
        });

    });

    test('should send email with attachements', async () => {

        const email = 'alvaro@google.com'
        await emailService.sendEmailWithFileSystemLogs(email)

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: "Logs del servidor",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            ])
        });

    });

});