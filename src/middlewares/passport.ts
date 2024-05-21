import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { config } from '../config/config'
// import User from '../database/models/user';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SEED,
}

export default new Strategy(opts, async (payload, done) => {
  try {
    // const user = await User.findById(payload.id);
    const user = true
    if (user) {
      return done(null, user)
    }
    return done(null, false)
  } catch (error) {
    console.log(error)
  }
})
