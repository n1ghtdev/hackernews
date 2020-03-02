import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';
import config from '../config';

export class AuthService {
  static async SignUp(authInput) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(authInput.password, salt);

      const userRecord = await UserModel.create({
        ...authInput,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });

      if (!userRecord) {
        throw new Error('User cannot be created');
      }

      const accessToken = this.generateAccessToken(userRecord);
      const refreshToken = this.generateRefreshToken(userRecord);
      await UserModel.updateOne({ _id: userRecord._id }, { refreshToken });

      const user = userRecord.toObject();
      delete user.password;
      delete user.refreshToken;

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async SignIn(email, password) {
    const userRecord = await UserModel.findOne({ email });

    if (!userRecord) {
      throw new Error("User doesn't exists");
    }

    const validPassword = await bcrypt.compare(password, userRecord.password);

    if (validPassword) {
      const accessToken = this.generateAccessToken(userRecord);
      const refreshToken = this.generateRefreshToken(userRecord);
      await UserModel.updateOne({ _id: userRecord._id }, { refreshToken });

      const user = userRecord.toObject();
      delete user.password;
      delete user.refreshToken;

      return { user, accessToken, refreshToken };
      // eslint-disable-next-line no-else-return
    } else {
      throw new Error('Invalid Password');
    }
  }

  static async updateTokens(token) {
    const payload = await jwt.verify(token, config.jwtRefreshSecret);

    if (!payload) {
      throw new Error('Invalid Token');
    }

    const userRecord = await UserModel.findOne({ _id: payload._id });
    if (!userRecord) {
      throw new Error('User not found');
    } else if (userRecord.refreshToken !== token) {
      throw new Error('Session expired');
    }

    const accessToken = this.generateAccessToken(userRecord);
    const refreshToken = this.generateRefreshToken(userRecord);

    await UserModel.updateOne({ _id: userRecord._id }, { refreshToken });

    const user = userRecord.toObject();
    delete user.password;
    delete user.refreshToken;

    return { user, accessToken, refreshToken };
  }

  static generateAccessToken(user) {
    return jwt.sign(
      {
        _id: user._id,
      },
      config.jwtSecret,
      {
        expiresIn: '30m',
      },
    );
  }

  static generateRefreshToken(user) {
    return jwt.sign(
      {
        _id: user._id,
      },
      config.jwtRefreshSecret,
      {
        expiresIn: '30d',
      },
    );
  }
}
