const mongoose = require("mongoose");
module.exports = app => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }, (err) => {
        if (!err) {
            console.log('MongoDB Connection Succeeded.')
        } else {
            console.log('Error in DB connection: ' + err)
        }
    });
    
//     mongoose.connect(process.env.MONGODB_CONNECTION_STRING|| '', {
//         useUnifiedTopology: true,
//         useNewUrlParser: true,
//         useFindAndModify: false
//     }).then(res => console.log("connected")).catch(err => console.log(err));
//     // mongoose.Promise = global.Promise; //not needed for mongoose version 5 or above
//     process.on("SIGINT", cleanup);
//     process.on("SIGTERM", cleanup);
//     process.on("SIGHUP", cleanup);
//     if (app) {
//         app.set("mongoose", mongoose);
//     }
// };

// function cleanup() {
//     mongoose.connection.close(function() {
//         process.exit(0);
//     })
}