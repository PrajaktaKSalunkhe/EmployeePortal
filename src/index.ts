import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use('/employees', employeeRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
