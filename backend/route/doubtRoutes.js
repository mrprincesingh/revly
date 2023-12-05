import express from 'express';
import * as doubtController from '../controllers/doubtController.js';
import { authenticate } from '../utils/authentication.js';

const router = express.Router();

router.post('/create', authenticate, doubtController.createDoubt);
router.get('/history', authenticate, doubtController.getDoubtHistory);

router.put('/edit/:doubtId', doubtController.editDoubt);

router.delete('/delete/:doubtId', doubtController.deleteDoubt);



export default router;
