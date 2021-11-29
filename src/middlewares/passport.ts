import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { SEED_DEVELOP } from '../constants/constants';
import User from '../database/models/user';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SEED || SEED_DEVELOP,
};

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (e) {
    console.log(e);
  }
});
