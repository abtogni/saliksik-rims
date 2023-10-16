import { prop, getModelForClass } from "@typegoose/typegoose";

export class Presentation{

    @prop()
    public presentationDate!: Date;

    @prop()
    public presentationTime!: Date;

    @prop()
    public researchID!: number;

    @prop({ type: () => Array<string>})
    public panelistID!: string[];

    @prop()
    public comments?: string;

    @prop({ type: () => Array<string>})
    public minutes?: string[];

    @prop()
    public presentationStatus?: string;
}

export const PresentationModel = getModelForClass(Presentation, {schemaOptions: {timestamps: true}}); //