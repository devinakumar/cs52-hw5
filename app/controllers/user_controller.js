import jwt from 'jwt-simple';
import User from '../models/user_model';
import config from '../config.js';
// import * as users from '../models/user_model';

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  User.findOne({ email })
  .then(result => {
    if (result) {
      return res.status(422).send('This user already exists');
    } else {
      const user = new User();
      user.email = email;
      user.password = password;
      user.username = username;
      return user.save();
    }
  }).then(result => {
    return res.send({ token: tokenForUser(result) });
  })
  .catch(error => {
    console.log(error);
    return res.send(`errror ${error}`);
  });
};

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
