const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));


app.use(routes);

sequelize.sync({
	force: false
}).then(() => {
	app.listen(PORT , () => console.log('Now listening on port:', PORT));
});
  