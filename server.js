const express = require('express');
const routes = require("./routes/routes")
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares

app.use(express.json());
app.use(express.static('public'));
//routes
app.use('/', routes);

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`));







