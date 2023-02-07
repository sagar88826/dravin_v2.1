const app = require('./app')
const mongoose = require("mongoose")
const port = 8000

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected succfull to DB")
}).catch((err) => {
    console.log(er)
})

app.listen(port, () => console.log(`server app listening on port ${port}!`))