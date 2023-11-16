import { prop, getModelForClass, pre, ReturnModelType } from "@typegoose/typegoose";
import validator from 'validator';
import bcrypt from 'bcrypt';



@pre<User>('save', async function(next: () => void){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


export class User{
    @prop({ type: () => String, required: [true, 'Please enter your faculty ID number'], unique: true })
    public userID!: string;

    @prop({ type: () => String, required: [true, 'Please enter an email'], unique: true, lowercase: true, validate: [validator.isEmail, 'Please enter a valid email']})
    public email!: string;

    @prop({ type: () => String, required: true })
    public userType!: string;

    @prop({ type: () => String, required: [true, 'Please enter a password'], minlength: [6, 'Minimum password length is 6 characters'] })
    public password!: string;

    @prop({type: () => String})
    public firstName!: string;

    @prop({type: () => String})
    public middleName? : string;

    @prop({type: () => String})
    public lastName!: string;

    @prop({type: () => String})
    public suffix?: string;

    @prop({type: () => String})
    public researchIDs?: string[];

    @prop({type: () => Array<number>})
    public publishedResearchCount?: number;

    public static async login (this: ReturnModelType<typeof User>,userID: string, password: string, userType: string){
        const user = await this.findOne({ userID });
        if (user){
          const auth = await bcrypt.compare(password, user.password);
          if(auth){
            if (userType === user.userType){
              return user;
            }
            throw Error('User is invalid');
          }
          throw Error('Password is invalid');
        }
        throw Error('User is invalid');
    }
}




export const UserModel = getModelForClass(User, {schemaOptions: {timestamps: true}});

