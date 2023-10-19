import { prop, getModelForClass, pre, ReturnModelType } from "@typegoose/typegoose";
import validator from 'validator';
import bcrypt from 'bcrypt';



@pre<User>('save', async function(next: () => void){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


export class User{
    @prop({ required: [true, 'Please enter your faculty ID number'],unique: true })
    public userID!: string;

    @prop({ required: [true, 'Please enter an email'], unique: true, lowercase: true, validate: [validator.isEmail, 'Please enter a valid email']})
    public email!: string;

    @prop({ required: true })
    public userType!: string;

    @prop({ required: [true, 'Please enter a password'], minlength: [6, 'Minimum password length is 6 characters'] })
    public password!: string;

    @prop()
    public firstName!: string;

    @prop()
    public middleName? : string;

    @prop()
    public lastName!: string;

    @prop()
    public suffix?: string;

    @prop()
    public researchIDs?: string[];

    @prop()
    public publishedResearchCount?: number;

    @prop()
    public avatarLink?: string;

    public static async login (this: ReturnModelType<typeof User>, email: string, password: string){
        const user = await this.findOne({ email });
        if (user){
          const auth = await bcrypt.compare(password, user.password);
          if(auth){
            return user;
          }
          throw Error('invalid password');
        }
        throw Error('invalid email');
    }
}




export const UserModel = getModelForClass(User, {schemaOptions: {timestamps: true}});

