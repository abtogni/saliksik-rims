import { prop, getModelForClass } from "@typegoose/typegoose";

export class Panelist{

    @prop({ type: () => String })
    public honorific?: string;

    @prop({type: () => String})
    public firstName!: string;

    @prop({type: () => String})
    public middleName? : string;

    @prop({type: () => String})
    public lastName!: string;

    @prop({type: () => String})
    public suffix?: string;

    @prop({type: () => String})
    public degree?: string;

}

export const PanelistModel = getModelForClass(Panelist, {schemaOptions: {timestamps: true}}); //