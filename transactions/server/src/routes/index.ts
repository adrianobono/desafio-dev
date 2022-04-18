import {Router} from 'express';
const router = Router();

import {inputData, getData } from '../controllers/index';

router.post('/postdata', inputData);
router.get('/getdata', getData);

export default router;