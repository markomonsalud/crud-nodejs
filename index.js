const express = require('express');
const app = express();

app.listen(3000, function() {
    console.log("Server is listening on port 3000");
});

app.get('/', (req, res) => {
//    res.json({"message": "Message"});
    res.send("First Route Test");
});

