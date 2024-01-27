import { prop, getModelForClass } from "@typegoose/typegoose";

export class Presentation{

    @prop({ type: () => Date})
    public presentationDate!: Date;

    @prop({ type: () => Array<string>})
    public researchIDs: string[] = [];

    @prop({ type: () => Array<string>})
    public panelistID?: string[];

    @prop({ type: () => String})
    public comments?: string;

    @prop({ type: () => Array<string>})
    public minutes?: string[];

}

export const PresentationModel = getModelForClass(Presentation, {schemaOptions: {timestamps: true}}); //