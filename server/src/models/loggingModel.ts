import { prop, getModelForClass } from "@typegoose/typegoose";


export class Log{

    @prop({ type: () => String})
    public logType?: string;

    @prop({ type: () => String})
    public logDescription?: string;

    @prop({ type: () => Array<string>})
    public userIDs?: string[];

}


export const loggingModel = getModelForClass(Log, {schemaOptions: {timestamps: true}});