import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user';

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

      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      const user = userRecord.toObject();

      return { user, token };
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
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();

      return { user, token };
      // eslint-disable-next-line no-else-return
    } else {
      throw new Error('Invalid Password');
    }
  }

  static generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        // eslint-disable-next-line no-underscore-dangle
        _id: user._id,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      process.env.JWT_SECRET,
    );
  }
}
