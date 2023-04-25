const app = require('./app')
const mongoose = require("mongoose")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected succfull to DB")
    app.listen(process.env.PORT, () => console.log(`server app listening on port ${process.env.PORT}!`))
}).catch((err) => {
    console.log(err)
})
