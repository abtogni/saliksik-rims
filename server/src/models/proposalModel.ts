import { prop, getModelForClass } from "@typegoose/typegoose";

export class conceptNote{

    @prop({ type: () => String })
    public researchID!: string;

    @prop({ type: () => String })
    public implementingDept!: string;

    @prop({ type: () => String })
    public coopAgency!: string;

    @prop({ type: () => String })
    public siteImplementation!: string;

    @prop({ type: () => Date})
    public projectDuration!: Date;

    @prop({ type: () => Number})
    public totalCost!: number;

    @prop({ type: () => String})
    public fundingSource!: string;

    @prop({ type: () => String})
    public description!: string;

    @prop({ type: () => String})
    public significance!: string;
    
    @prop({ type: () => String})
    public objectives!: string;

    @prop({ type: () => String})
    public methodology!: string;

    @prop({ type: () => String})
    public technologyRoadmap?: string;

    @prop({ type: () => String})
    public expectedOutput!: string;

    @prop({ type: () => String})
    public workPlan!: string;

    @prop({ type: () => String})
    public proposalStatus!: string;


}


export const CNModel = getModelForClass(conceptNote, {schemaOptions: {timestamps: true}});