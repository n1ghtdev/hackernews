import jwt from 'jsonwebtoken';
import config from '../../config';

function getTokenFromHeader(req) {
  const headers = req.headers.authorization;

  if (/(Bearer|Token)/.test(headers && headers.split(' ').shift())) {
    return headers.split(' ').pop();
  }

  return null;
}

export async function isAuth(req, res, next) {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).send({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, config.jwtSecret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
    next();
  }
}
