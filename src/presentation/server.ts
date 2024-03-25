
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
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

        // const logs = await logRepository.getLog(LogSeverityLevel.low);
        // console.log(logs)

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'https://google.com';
                new CheckServiceMultiple(
                    [fsLogRepository, mongoLogRepository, postgresLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.log(error)
                ).execute(url)
            }
        );

    }

}