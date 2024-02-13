import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    role: { type: String, required: true },
    affiliation: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    suffix: { type: String },
    email: { type: String },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },

    
}, {timestamps: true});

export const UserModel = mongoose.model('User', UserSchema);

//GET
export const getUsers = () => UserModel.find();
export const getUserByUserID = (userID: string) => UserModel.findOne({ userID });
export const getUserByName = (firstName: string, lastName: string) => UserModel.findOne({ firstName, lastName });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const getUserById = (id: string) => UserModel.findById(id);

//POST
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());


//PATCH
export const deleteUserByID = (id: string) => UserModel.findByIdAndDelete(id); 

//DELETE
export const updateUserByID = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values); 
