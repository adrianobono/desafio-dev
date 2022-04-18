import {Router} from 'express';
const router = Router();

import {inputData } from '../controllers/index';

router.post('/data', inputData);

export default router;