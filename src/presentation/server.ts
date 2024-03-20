import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailsLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const logRepository = new LogRepositoryImpl(
    // new FileSystemDatasource()
    new MongoLogDatasource(),
);

const emailService = new EmailService();


export class Server {

    public static async start() {

        console.log('Server started...')

        //TODO: Mandar emails
        // new SendEmailsLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(['alvarosantiagolopez97@gmail.com', 'alvaromj97@gmail.com'])
        // const emailResult = await emailService.sendEmailWithFileSystemLogs(
        //     ['alvarosantiagolopez97@gmail.com', 'alvaromj97@gmail.com']
        // );

        // console.log('Result:', emailResult)

        // console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)

        const logs = await logRepository.getLog(LogSeverityLevel.low);
        console.log(logs)

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google24dsfs.com';
        //         new CheckService(
        //             logRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //     }
        // );

    }

}