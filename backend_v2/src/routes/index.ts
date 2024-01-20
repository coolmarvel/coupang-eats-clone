import { Router } from 'express';

import userRouter from './user';
import orderRouter from './order';

const router = Router();

router.get('/', (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.use('/user', userRouter);
router.use('/order', orderRouter);

export default router;
