import { LogEntity } from "../../entities/log.entity";
import { SendEmailsLogs } from "./send-email-logs";


describe('send-email-logs.ts', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    }

    const sendEmailLogs = new SendEmailsLogs(
        mockEmailService as any,
        mockRepository,
    );

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should call sendEmail and saveLog', async () => {

        const result = await sendEmailLogs.execute('alvaromj97@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "low",
            "message": "Log email sent",
            "origin": "send-email-logs.ts"
        })


    });

    test('should log in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false);

        const result = await sendEmailLogs.execute('alvaromj97@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1);
        expect(mockRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepository.saveLog).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "high",
            "message": "Error: Email log not sent",
            "origin": "send-email-logs.ts"
        })


    });


});