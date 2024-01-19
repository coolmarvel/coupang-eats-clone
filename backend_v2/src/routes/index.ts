import { Router } from 'express';

import userRouter from './user';

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

export default router;
