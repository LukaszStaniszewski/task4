const jwt = require('jsonwebtoken')

const privateKey = process.env.JSON_TOKEN_PRIVATE_KEY
const publicKey = process.env.JSON_TOKEN_PUBLIC_KEY

exports.signJwt = (payload, options) => {
options = options || '1m'

  return jwt.sign(payload, privateKey, { expiresIn: options})
}

exports.verifyJwt = (token) => {

  try{
    const decoded = jwt.verify(token, privateKey)
    return {  valid: true,
          expired: false,
          decoded,
          status: decoded?.status
    }
  }catch(error){ 
    console.error(error);
   return {valid: false,
          expired: true,
          decoded: null,
          message: error.message === "jwt-expired",
    }
  }
}
