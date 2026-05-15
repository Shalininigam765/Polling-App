import express, {Router} from 'express';
import {createPoll, getAllPolls, getPollBySharedId, voteOnPoll} from '../controller/poll.controller.js'
import verifyJWT from '../middleware/auth.middleware.js'

const router = Router()

router.post('/create', verifyJWT, createPoll)

router.get('/', getAllPolls)

router.get('/vote/:shareId', getPollBySharedId)

export default router
