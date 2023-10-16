import mongoose from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";

export class Research{
    @prop({ type: () => Array<number>})
    public conceptNotes?: number[];

    @prop({ type: () => String})
    public researchTitle!: string;
    
    @prop({ type: () => Array<string>})
    public researchLeaders!:  string[];

    @prop({ type: () => Array<string>})
    public researchMembers?: string[];

    @prop({ type: () => Array<number>})
    public presentations!: number[];

    @prop({ type: () => String})
    public researchStatus!: string;
}

export const ResearchModel = getModelForClass(Research, {schemaOptions: {timestamps: true}});