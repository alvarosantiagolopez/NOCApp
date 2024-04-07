import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe('CheckService UseCase', () => {

    const mockRepository = [{
        saveLog: jest.fn(),
        getLog: jest.fn(),
    }]

    const sucessCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckServiceMultiple(
        mockRepository,
        sucessCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('should call successCallback when fetch returns true', async () => {


        const wasOk = await checkService.execute('https://google.com');

        expect(wasOk).toBe(true);
        expect(sucessCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();

        expect(mockRepository[0].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )

    });

    test('should call errorCallback when fetch returns false', async () => {


        const wasOk = await checkService.execute('https://googledsadasdaq.com');

        expect(wasOk).toBe(false);
        expect(sucessCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepository[0].saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )

    });


});