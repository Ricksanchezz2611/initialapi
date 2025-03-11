const express = require("express");

const port = 3000;
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");


const app = express();;

//middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // ✅ Corrected
    max : 100,
});

app.use(limiter);

app.get("/", (req,res) => {
    res.json({
        message: "Welcome to the scalable API! 🚀",
    });
})

app.use((err,req,res,next) => {
    res.status(500).json({
        message: err.message,
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});