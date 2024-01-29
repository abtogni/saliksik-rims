import { prop, getModelForClass } from "@typegoose/typegoose";

export class Presentation{

    @prop({ type: () => Date})
    public presentationDate!: Date;

    @prop({ type: () => Array<string>})
    public researchIDs!: string[];

    @prop({ type: () => Array<string>})
    public panelistNames?: string[];

    @prop({ type: () => String})
    public location!: string;


}

export const PresentationModel = getModelForClass(Presentation, {schemaOptions: {timestamps: true}}); //