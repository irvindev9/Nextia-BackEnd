import express, { Response, Request } from 'express';
const invitationController = require('../controllers/invitationControllers');
const { verifyToken } = require('../auth/utils');

const router = express.Router();

router.post("/", verifyToken, (req: Request|any, res: Response) => {
  invitationController.createInvitation(req.body, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

router.get("/", verifyToken, (req: Request|any, res: Response) => {
  invitationController.getInvitations(req.query.page, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

router.get("/:id", verifyToken, (req: Request|any, res: Response) => {
  invitationController.getInvitation(req.params.id, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

router.put("/:id", verifyToken, (req: Request|any, res: Response) => {
  invitationController.updateInvitation(req.params.id, req.body, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

router.delete("/:id", verifyToken, (req: Request|any, res: Response) => {
  invitationController.deleteInvitation(req.params.id, req.email).then((response: any) => {
    res.json(response);
  }).catch((error: any) => {
    res.json(JSON.stringify(error.sqlMessage || error));
  });
});

module.exports = router;
