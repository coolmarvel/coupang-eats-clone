import { User } from '@/db/models/user';
import { Router } from 'express';

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).send(user);
  } catch (error) {
    console.error('유저 정보를 가져오던 중 에러 발생', error);
    res.sendStatus(500);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });

    res.status(200).send(user);
  } catch (error) {
    console.error('회원가입을 하던 중 에러 발생', error);
    res.sendStatus(500);
  }
});

export default router;
