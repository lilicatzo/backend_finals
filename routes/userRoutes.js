const express = require('express');
const { body } = require('express-validator');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/', [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], userController.createUser);

router.get('/:id', userController.getUser);

router.put('/:id', [
    body('username').optional().isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').optional().isEmail().withMessage('Invalid email address')
], userController.updateUser);

router.delete('/:id', userController.deactivateUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], userController.login);

module.exports = router;
