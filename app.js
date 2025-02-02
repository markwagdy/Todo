const express = require('express');

const app = express();
const port = 3000;





app.use(express.json());

const todoRoutes = require('./routes/todoRoutes');

app.use('/todos', todoRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


