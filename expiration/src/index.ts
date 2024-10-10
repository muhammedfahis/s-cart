import { KafkaConsumer } from "@fayisorg/common-modules";
import { startKafkaConsumer } from "./helper";

(async () => {
  const kafkaConsumer = new KafkaConsumer(); // Instantiate once
  
  const shutdown = async (signal: string) => {
      console.log(`Received ${signal}. Shutting down...`);
      try {
          await kafkaConsumer.disconnectConsumer();
          console.log('KafkaConsumer has been disconnected.');
          process.exit(0); // Graceful exit
      } catch (error) {
          console.error('Error during shutdown:', error);
          process.exit(1); // Error exit
      }
  };

  try {
      // Listen for termination signals (SIGINT and SIGTERM)
      process.on('SIGINT', () => shutdown('SIGINT'));
      process.on('SIGTERM', () => shutdown('SIGTERM'));
      await startKafkaConsumer(); // Ensure this has proper error handling

  } catch (err) {
      console.error('Failed to start Kafka Consumer:', err);
      process.exit(1); // Exit on failure
  }
})();




