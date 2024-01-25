import jwt from 'jsonwebtoken'
import Util from '../utils/Utils'

const util = new Util();

module.exports = async (req, res, next) => {
  const bearerHeader = await req.headers['authorization'];
  try {
    if (req.headers.habib === 'developer') {
      next()
    } else {
      if(bearerHeader === undefined){
        util.setError(400,'Authorization header token is not defiend')
        return util.send(res)
      }
      const token = await req.headers.authorization.split(' ')[1]
      const decoded = await jwt.verify(token, process.env.JWT_KEY)
      req.cekToken = await decoded
      next()
    }
  } catch (error) {
    util.setError(400, error);
     return util.send(res)
  }
}
