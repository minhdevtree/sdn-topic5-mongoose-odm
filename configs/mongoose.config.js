const db = require('../models/index');

db.mongoose
    .connect(process.env.MONGODB_URI, {
        dbName: process.env.DB_NAME,
    })
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(error => {
        console.log('MongoDB connection error: ', error);
    });

db.mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db');
});

db.mongoose.connection.on('error', err => {
    console.log(err.message);
});

db.mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', async () => {
    await db.mongoose.connection.close();
    process.exit(0);
});
