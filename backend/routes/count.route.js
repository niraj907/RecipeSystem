import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Counter of user');
});

export default router;
