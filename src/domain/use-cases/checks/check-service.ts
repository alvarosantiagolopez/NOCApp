import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';
interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallBack = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly sucessCallback: SuccessCallBack,
        private readonly errorCallback: ErrorCallback,
    ) { }

    public async execute(url: string): Promise<boolean> {

        try {

            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`)
            }
            const log = new LogEntity({
                message: `Service ${url} working`,
                level: LogSeverityLevel.low,
                origin: 'check-service.ts'
            })
            this.logRepository.saveLog(log);
            this.sucessCallback && this.sucessCallback();

            return true;

        } catch (error) {

            const errorMessage = `${url} is not ok. ${error}`
            const log = new LogEntity({
                message: errorMessage,
                level: LogSeverityLevel.high,
                origin: 'check-service.ts'
            });
            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(`${errorMessage}`);

            return false
        }
    }


}