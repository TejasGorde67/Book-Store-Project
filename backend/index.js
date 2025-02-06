// import express from "express";
// import mongoose from 'mongoose';
// import booksRoute from './routes/booksRoute.js';
// import cors from 'cors';
// import path from "path";

// const PORT = process.env.PORT || 5555;

// const mongoDBURL = process.env.MONGO_URI;

// const app = express();

// const __dirname = path.resolve();


// //middleware for parsing request body
// app.use(express.json());


// //middleware for handling CORS policy
// app.use(cors());


// app.get('/', (request, response) => {
//     console.log(request)
//     return response.status(234).send('Welcome')
// })


// app.use('/books', booksRoute);


// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }


// mongoose
//     .connect(mongoDBURL)
//     .then(() => {
//         console.log('App connected to Database')
//         app.listen(PORT, () => {
//             console.log(`App is listening to port : ${PORT}`);
//         });
//     })
//     .catch((error) => {
//         console.log(error);
//     })

import express from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGO_URI;

const app = express();
const __dirname = path.resolve();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome");
});

app.use("/books", booksRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to Database");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });
