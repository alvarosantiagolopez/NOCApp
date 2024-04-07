import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogRepositoryImpl } from './log.repository.impl';


describe('log.repository.impl', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLog: jest.fn(),
    }

    const logRepository = new LogRepositoryImpl(mockLogDatasource);

    beforeEach(() => {
        jest.clearAllMocks();
    })

    const log = new LogEntity({
        message: 'low',
        level: LogSeverityLevel.low,
        origin: 'log.repository.impl.test.ts'
    });


    test('saveLog should call the datasource with arguments', async () => {

        await logRepository.saveLog(log);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)


    });

    test('getLog should call the datasource with arguments', async () => {

        await logRepository.getLog(LogSeverityLevel.low);

        expect(mockLogDatasource.getLog).toHaveBeenCalledWith(LogSeverityLevel.low);

    });

});