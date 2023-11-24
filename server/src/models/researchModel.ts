import mongoose from "mongoose";
import { prop, getModelForClass } from "@typegoose/typegoose";

export class Research{

    @prop({ type: () => String})
    public researchTitle!: string;
    
    @prop({ type: () => Array<string>})
    public researchLeaders!:  string[];

    @prop({ type: () => Array<string>})
    public researchMembers?: string[];

    @prop({ type: () => String})
    public researchStatus!: string;

    @prop({ type: () => String})
    public researchAgency!: string;

    @prop({ type: () => String})
    public incentiveProof!: string;
}

export const ResearchModel = getModelForClass(Research, {schemaOptions: {timestamps: true}});