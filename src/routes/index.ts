import express from 'express';
const usersRoutes = require('./users');
const invitationsRoutes = require('./invitations');

const router = express.Router();

router.use('/', usersRoutes);
router.use('/invitations', invitationsRoutes);

module.exports = router;

