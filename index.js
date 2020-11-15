const express = require('express')
const app = express()
const port = 3000

// route to create account
app.use("/createaccount",newUser)
// route to everything else...

//add mongoose connection




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
