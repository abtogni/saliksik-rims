import { prop, getModelForClass } from "@typegoose/typegoose";

export class Presentation{

    @prop({ type: () => Date})
    public presentationDate!: Date;

    @prop({ type: () => Date})
    public presentationTime!: Date;

    @prop({ type: () => Number})
    public researchID!: number;

    @prop({ type: () => Array<string>})
    public panelistID?: string[];

    @prop({ type: () => String})
    public comments?: string;

    @prop({ type: () => Array<string>})
    public minutes?: string[];

    @prop({ type: () => String})
    public presentationStatus?: string;
}

export const PresentationModel = getModelForClass(Presentation, {schemaOptions: {timestamps: true}}); //