const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/todos', todoRoutes);
app.use('/user',userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


