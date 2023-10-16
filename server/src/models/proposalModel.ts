import { prop, getModelForClass } from "@typegoose/typegoose";

export class conceptNote{

    @prop()
    public researchID!: string;

    @prop()
    public implementingDept!: string;

    @prop()
    public coopAgency!: string;

    @prop()
    public siteImplementation!: string;

    @prop()
    public projectDuration!: Date;

    @prop()
    public totalCost!: number;

    @prop()
    public fundingSource!: string;

    @prop()
    public description!: string;

    @prop()
    public significance!: string;
    
    @prop()
    public objectives!: string;

    @prop()
    public methodology!: string;

    @prop()
    public technologyRoadmap?: string;

    @prop()
    public expectedOutput!: string;

    @prop()
    public workPlan!: string;

    @prop()
    public proposalStatus!: string;


}


export const CNModel = getModelForClass(conceptNote, {schemaOptions: {timestamps: true}});