import { Router } from "express";
import {
    createUser,
    logIn,
    logOut,
    privateView,
    checkLogIn,
    githubLoginCallback,
    googleLoginCallback
} from '../controllers/users.controller.js'
import { auth } from "./views.router.js";
import passport from 'passport'



const router = Router()

router.post('/', passport.authenticate('register', {failureRedirect: '/register?register_status=failed'}), createUser)
router.post('/login', passport.authenticate('login',{failureRedirect: '/login?login_status=failed'}), logIn)
router.get('/login/github', passport.authenticate('github',{ scope: [ 'user:email' ] }), (req,res)=>{})
router.get('/login/github/callback', passport.authenticate('github',{failureRedirect: '/login?login_status=failed'}), githubLoginCallback)
router.get('/login/google', passport.authenticate('google',{ scope: [ 'email', 'profile' ] }), (req,res)=>{})
router.get('/login/google/callback', passport.authenticate('google',{successRedirect: 'http://localhost:5000/api/users/login/github/callback', failureRedirect: '/login?login_status=failed'}), googleLoginCallback)
router.get("/logout", logOut)
router.get("/check",auth, checkLogIn)
router.get("/private" ,privateView)
router.get("/failedregister", (req,res)=>{
    res.json({error: 'failed to create new user'})
})





export default router;
