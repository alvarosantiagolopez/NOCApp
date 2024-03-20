import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";


(async () => {
    main()
})();


async function main() {

    await MongoDatabase.connect({
        mongoURL: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    // Server.start();
}