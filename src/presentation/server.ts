import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.server";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
)


export class Server {

    public static async start() {

        console.log('Server started...')

        const emailService = new EmailService();
        const emailResult = await emailService.sendEmailWithFileSystemLogs(
            ['alvarosantiagolopez97@gmail.com', 'alvaromj97@gmail.com']
        );

        console.log('Result:', emailResult)

        console.log(envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY)

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log(`${url} is ok`),
        //             (error) => console.log(error)
        //         ).execute(url)
        //         //new CheckService().execute('http://localhost:3000')
        //     }
        // );

    }

}