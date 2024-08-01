import express, { Request, Response } from 'express';
const cors = require("cors");
const userController = require('./controllers/usersController');

const { CORS_ORIGIN } = require("../config");

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});