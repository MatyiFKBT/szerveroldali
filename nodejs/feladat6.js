//szerver
const express = require('express');
const app = express();

app.use((request, response, next) => {
    console.log((new Date()).toString(), request.ip)
    next()
})

app.use((request, response, next) => {
    request.name = "Valaki"
    next()
})

// /welcome/Győző
app.get('/', (request, response) => {
    // const name = request.query.name
    const name = request.name
    response.json({
        message: `Hello ${name}!`
    })
})

const port = process.env.PORT || 4000;
app.listen(port, function() {
    console.log('Server is running!');
});