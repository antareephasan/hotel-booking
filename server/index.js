const  express = require('express');
const app = express();
const port = 5000;
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

//routes imports
const authRoutes = require('./routes/auth');
const bookingRoutes = require("./routes/bookingApi");


dotenv.config();
app.use(express.json());
app.use(cors());

//mongoose
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(console.log("Connected to MONGODB"))
.catch(err => {
    console.log(err);
})

//routes
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);

//listening
app.listen(port, () =>  {
    console.log(`Hotel Booking app listening on port ${port}`);
})


