import { prop, getModelForClass } from "@typegoose/typegoose";

export class Research {
    @prop({ type: () => String })
    public researchTitle!: string;

    @prop({ type: () => Array<string> })
    public researchLeaders!: string[];

    @prop({ type: () => String })
    public researchStatus!: string;

    @prop({ type: () => conceptNote})
    public conceptNote?: conceptNote;

    @prop({ type: () => Presentation})
    public initialPresentation?: Presentation;

    @prop({ type: () => Presentation})
    public finalPresentation?: Presentation;
}

class conceptNote {
    @prop({ type: () => String })
    public implementingDept!: string;

    @prop({ type: () => String })
    public coopAgency!: string;

    @prop({ type: () => String })
    public siteImplementation!: string;

    @prop({ type: () => String })
    public projectDuration!: string;

    @prop({ type: () => Number })
    public totalCost!: number;

    @prop({ type: () => String })
    public fundingSource!: string;

    @prop({ type: () => String })
    public description!: string;

    @prop({ type: () => String })
    public significance!: string;

    @prop({ type: () => String })
    public objectives!: string;

    @prop({ type: () => String })
    public methodology!: string;

    @prop({ type: () => String })
    public technologyRoadmap?: string;

    @prop({ type: () => String })
    public expectedOutput!: string;

    @prop({ type: () => String })
    public workPlan!: string;

}

class Presentation{
    @prop({ type: () => Array<string>})
    public comments?: string[];
}

export const ResearchModel = getModelForClass(Research, { schemaOptions: { timestamps: true } });
