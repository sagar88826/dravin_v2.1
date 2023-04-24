const app = require('./app')
const mongoose = require("mongoose")
const cloudinary = require("cloudinary").v2

const port = 8000

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
}).catch((err) => {
    console.log(err)
})

app.listen(port, () => console.log(`server app listening on port ${port}!`))