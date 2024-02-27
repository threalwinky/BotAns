const express = require('express')
const app = express()

app.get('/', async(req, res) => {
    res.send('Working')
})

app.listen(3000, function(){
    console.log('Server started')
})