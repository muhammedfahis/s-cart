import { KafkaConsumer } from "@fayisorg/common-modules";
import { startKafkaConsumer } from "./helper";

(async () => {
    try {
      const shutdown = async () => {
        try {
            const kafkaConsumer = new KafkaConsumer();
            await kafkaConsumer.disconnectConsumer();
            console.log('KafkaConsumer has been disconnected.');
            process.exit(0);
        } catch (error) {
            console.error('Error during shutdown:', error);
            process.exit(1);
        }
    };
    
    // Listen for termination signals
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
      await startKafkaConsumer()

    } catch (err) {
        console.log(err);
    }
})();



