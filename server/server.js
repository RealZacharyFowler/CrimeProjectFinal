const express = require("express");
const app = express();
const cors = require('cors');
require("../../crimeLogin/server/config/mongoose.config");
const cookieParser = require('cookie-parser')
require('dotenv').config();
require('./routes/crime.routes')(app);

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cors({credentials:true, origin:'http://localhost:3000'}));

app.use(cookieParser())

const UserRoutes = require('./routes/userRoutes');
UserRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));