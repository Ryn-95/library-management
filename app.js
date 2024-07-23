const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes'); // Assurez-vous que ce fichier existe
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/books', bookRoutes); // Assurez-vous que ce fichier existe

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});