import express from 'express';
import { getEmployee } from '../controllers/employeeController';

const router = express.Router();

router.get('/', getEmployee);

export default router;
