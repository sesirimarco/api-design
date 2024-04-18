import prisma from '../db';
import { createJWT, hashPassword, comparePassword } from '../modules/auth';

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  console.log({ users });
  res.json({ users });
};
export const createNewUser = async (req, res, next) => {
  try {
    const hash = await hashPassword(req.body.password);

    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hash,
      },
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (e) {
    e.type = 'input';
    next(e);
  }
};

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePassword(req.body.password, user.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: 'wrong data' });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
