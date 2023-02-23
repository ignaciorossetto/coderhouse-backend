import dotenv from 'dotenv'
dotenv.config()

export default {
    port: process.env.PORT,
    localHost: process.env.DEV_LOCAL_HOST,
    mongoUrl: process.env.MONGO_URL,
    dbName: process.env.DB_NAME,
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    googleCallBackUrlEndpoint: process.env.GOOGLE_CALLBACK_URL_ENDPOINT,
    jwtSecret: process.env.JWT_SECRET,
}