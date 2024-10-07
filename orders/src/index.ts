import mongoose from 'mongoose';
import { app } from './app';
import { KafkaConsumer } from '@fayisorg/common-modules';

(async () => {
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
    if(!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if(!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
    app.listen(3000,() => {
        console.log('Listening on port 3000!!!!!');
    });
})();