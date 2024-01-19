import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
