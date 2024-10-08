import { startKafkaConsumer } from "./helper";

(async () => {
    try {
   
      await startKafkaConsumer()

    } catch (err) {
        console.log(err);
    }
})();



