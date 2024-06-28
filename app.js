const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const sequelize = require('./config/database');
const models = require('./models');   

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
});


sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync({ force: false }) 
    .then(() => {
        console.log('Database synchronized');
    })
    .catch(err => {
        console.error('Error synchronizing the database:', err);
    });

    function normalizePort(val) {
        const port = parseInt(val, 10);
        if (isNaN(port)) {
          // named pipe
          return val;
        }
        if (port >= 0) {
          // port number
          return port;
        }
        return false;
      }
      
// Server Initialization
const PORT = normalizePort(process.env.PORT);

app.listen(PORT, '127.0.0.1', function() {
    console.log(`Server is running on port ${PORT}`);
  });
  

module.exports = app;
