import passport from 'passport'
import local from 'passport-local'
import { userModel } from '../dao/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'
import GitHubStrategy from 'passport-github2'
import GoogleStrategy from 'passport-google-oauth20'



const LocalStrategy = local.Strategy

const initialazePassport = () => {


    passport.use('google', new GoogleStrategy(
        {
        clientID: '73974643169-ddvbka69v8m1g3a8e2igfs286kodf6uu.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "http://localhost:5000/api/users/login/google/callback",
        passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({email: profile._json.email})
                if (user) {
                    return done(null, user)
                }
                const newUser = {
                    name: profile._json.name,
                    email: profile._json.email,
                    password: ''
                }
                const result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                console.log(error);
            }
         }
      ))

    passport.use('github', new GitHubStrategy(
        {
        clientID: 'Iv1.68b5d5a3cd41ad22',
        clientSecret: 'd2db33c407825d8a293a9b47fa8f6ed836e8f9da',
        callbackUrl: 'http://localhost:5000/api/users/login/github/callback'
        },
        async(accessToken, refreshToken, profile, done)=>{
            try {
                const user = await userModel.findOne({email: profile._json.email})
                if (user) {
                    return done(null, user)
                }
                const newUser = {
                    name: profile._json.name,
                    email: profile._json.email,
                    password: ''
                }
                const result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                console.log(error);
            }
        }
    ))

    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async(req, username, password, done) => {
            const {name, email} = req.body
            try {
                const user = await userModel.findOne({email: username})
                if(user){
                    return done(null, false, {message: 'Ya existe un usuario registrado con este mail'})
                }
                const newUser = {
                    name,
                    email,
                    password: createHash(password)
                }
                const result = await userModel.create(newUser)
                return done(null, result)
            } catch (error) {
                console.log('estamos aca', error);
                return done('Error al crear un usuario' + error, false)
            }
        }
    ))

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async(username, password, done) => { 
        try {
            const user = await userModel.findOne({email: username})
            if (!user) {
                return done(null, false, {message: 'Usuario/Password inexistente'})   
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, {message: 'Usuario/Password inexistente'})            
            }
            return done(null, user)
        } catch (error) {
            return done(error)
        }
     }
    ))


    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}


export default initialazePassport