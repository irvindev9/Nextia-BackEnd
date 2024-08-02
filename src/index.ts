import express, { Request, Response } from 'express';
const cors = require("cors");
const jwt = require("jsonwebtoken");

const userController = require('./controllers/usersController');
const invitationController = require('./controllers/invitationControllers');
const { verifyToken } = require('./auth/utils');

const { CORS_ORIGIN, SECRET_KEY, EXPIRE_IN } = require("../config");

const corsOptions = {
  origin: CORS_ORIGIN,
  optionsSuccessStatus: 200
}

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: true}));

app.post('/signup', (req: Request, res: Response) => {
  userController.signUp(req.body).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

app.post("/token", (req: Request, res: Response) => {
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

app.get("/protected", verifyToken, (req: Request, res: Response) => {
  return res.status(200).json({ message: "Tienes acceso" });
});

app.get("/logout", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Cerrando sesión" });
});

app.post("/recover", (req: Request, res: Response) => {
  if (!req.body.email) {
    return res.status(400).json({ message: "Email requerido" });
  }
  userController.recover(req.body.email).then((response: any) => {
    res.json({ message: "Correo enviado" });
  } ).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

app.post("/invitations", verifyToken, (req: Request|any, res: Response) => {
  invitationController.createInvitation(req.body, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

app.get("/invitations", verifyToken, (req: Request|any, res: Response) => {
  invitationController.getInvitations(req.body.page, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

app.get("/invitations/:id", verifyToken, (req: Request|any, res: Response) => {
  invitationController.getInvitation(req.params.id, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

app.put("/invitations/:id", verifyToken, (req: Request|any, res: Response) => {
  invitationController.updateInvitation(req.params.id, req.body, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

app.delete("/invitations/:id", verifyToken, (req: Request|any, res: Response) => {
  invitationController.deleteInvitation(req.params.id, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});