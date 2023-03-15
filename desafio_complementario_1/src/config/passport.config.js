import passport from 'passport'
import local from 'passport-local'
import { userModel } from '../dao/mongo/models/user.model.js'
import { createHash, isValidPassword } from '../utils.js'
import GoogleStrategy from 'passport-google-oauth20'
import jwt from 'passport-jwt'
import { cartModel } from '../dao/mongo/models/carts.model.js'
import config from './config.js'
import { CartService, UserService } from '../repository/index.js'
import CustomError from "../services/errors/customError.js";




const cookieExtractor = (req) => {
    let token = null
    if (req && req.cookies){
        token = req.cookies['coderCookieToken']
    }
    return token
}

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt
const LocalStrategy = local.Strategy

const initialazePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.jwtSecret

    }, async(jwt_payload, done)=>{

        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
            }
        }
    ))


    passport.use('google', new GoogleStrategy(
        {
        clientID: config.googleClientID,
        clientSecret: config.googleClientSecret,
        callbackURL: `${config.localHost}${config.googleCallBackUrlEndpoint}`,
        passReqToCallback: true,
        scope: [ 'profile', 'email' ],
        failureFlash: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const user = await UserService.getOne({email: profile._json.email})
                if (user) {
                    if (user?.strategy === 'google') {
                        return done(null, user)
                    }
                    if (user?.strategy !== 'google') {
                        return done(null, false, {message: 'user already created with other platform'})
                    }
                }
                const newCart = await CartService.create({})
                const newUser = {
                    name: profile._json.name,
                    email: profile._json.email,
                    password: '',
                    carts: [{
                        cart: newCart._id,
                        confirmed: false
                    }],
                    strategy: 'google'
                }
                const result = await UserService.create(newUser)
                req.user = result
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
                const user = await UserService.getOne({email: username})
                if(user){
                    return done(null, false, {messages: 'Ya existe un usuario registrado con este mail'})
                }
                const newCart = await CartService.create({})
                const newUser = {
                    name,
                    email,
                    password: createHash(password),
                    carts: [{
                        cart: newCart._id,
                    }],
                    strategy: 'local'
                }
                const result = await UserService.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error al crear un usuario' + error, false)
            }
        }
    ))

    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        session: false
    }, async(username, password, done) => { 
        try {
            const user = await UserService.getOne({email: username})
            if (!user) {
                return done(null, false, {messages: 'Usuario/Password inexistente'})   
            }
            if (user.strategy !== 'local') {
                return done(null, false, {messages: 'Usuario generado a traves de otra plataforma'})   
            }
            if (!isValidPassword(user, password)) {
                return done(null, false, {messages: 'Usuario/Password inexistente'})            
            }
            return done(null, user)
        } catch (error) {
            return done(error)
        }
     }
    ))

     // for sessions
    // passport.serializeUser((user, done) => {
    //     if (user._id) {
    //         return done(null, user._id)
    //     }
    //     if (user.user._doc._id) {
    //         return done(null, user.user._doc._id)
    //     }
    // })
    // passport.deserializeUser(async (id, done) => {
    //     const user = await userModel.findById(id)
    //     done(null, user)
    // })
}


export default initialazePassport