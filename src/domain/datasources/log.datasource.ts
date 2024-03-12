import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


export abstract class LogDatasource {
    abstract savLog(log: LogEntity): Promise<void>;
    abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}

