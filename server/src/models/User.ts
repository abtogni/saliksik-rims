import mongoose, { Document, Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
});

// Pre-save hook to hash the password before saving to the database
userSchema.pre<IUser>('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email: string, password: string): Promise<IUser | null> {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw new Error('Invalid password');
    }
    throw new Error('Invalid email');
  };
  
  const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
  
  export default User;
 
  
  