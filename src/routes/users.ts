import express, { Request, Response } from 'express';
const jwt = require('jsonwebtoken');
const userController = require('../controllers/usersController');
const { verifyToken } = require('../auth/utils');

const { SECRET_KEY, EXPIRE_IN } = require("../config");

const router = express.Router();

router.post('/signup', (req: Request, res: Response) => {
  userController.signUp(req.body).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

router.post("/token", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email y contraseña requeridos" });
    }

    if (userController.checkUser(email, password)) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: EXPIRE_IN });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Falló la autenticación" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Ocurrio un error interno" });
  }
});

router.get("/protected", verifyToken, (req: Request, res: Response) => {
  return res.status(200).json({ message: "Tienes acceso" });
});

router.get("/logout", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Cerrando sesión" });
});

router.post("/recover", (req: Request, res: Response) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Email requerido" });
  }
  userController.recover(req.body.email).then((response: any) => {
    res.json({ message: "Correo enviado, revise su bandeja de entrada" });
  } ).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

module.exports = router;