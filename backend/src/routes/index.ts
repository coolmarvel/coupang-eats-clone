import { Router } from 'express';

import userRouter from './user';
import menuRouter from './menu';
import orderRouter from './order';
import storeRouter from './store';
import imageRouter from './image';
import reviewRouter from './review';

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
router.use('/menu', menuRouter);
router.use('/order', orderRouter);
router.use('/store', storeRouter);
router.use('/image', imageRouter);
router.use('/review', reviewRouter);

export default router;
