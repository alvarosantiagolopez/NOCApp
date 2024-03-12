import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


export abstract class LogRepository {
    abstract savLog(log: LogEntity): Promise<void>;
    abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
