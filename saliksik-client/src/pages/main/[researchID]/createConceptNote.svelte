<script lang="ts">
  import { Alert, Button, Card, FloatingLabelInput, Helper, Input, P, Textarea, Toolbar, ToolbarButton, ToolbarGroup } from "flowbite-svelte";
  import { CodeOutline, FaceGrinOutline, FileCirclePlusOutline, ImageOutline, MapPinAltSolid, PaperClipOutline, PapperPlaneOutline, QuestionCircleOutline, UserAddOutline } from "flowbite-svelte-icons";
  import { DateInput } from "date-picker-svelte";
  import { selectedResearchInfo, updateResearch } from "../../../components/store";
  import { goto } from "@roxi/routify";

  

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    let json = Object.fromEntries(formData.entries());
    let data = { researchStatus: 'Concept Note Approval' ,conceptNote: {} };
    data.conceptNote = {
      ...json,
      projectDuration,
    };

    fetch(`/api/research/updateResearch?researchID=${$selectedResearchInfo._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          //To edit
          $goto("/main/");
        } else {
          console.error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Network error:", error);
      });
  }

  //for pop-up admin-buttons
  let saveAsDraft = false;
  let submitResearchProposal = false;

  //date picker
  let projectDuration = new Date();
</script>

<main class="p-4">
  <div class="flex justify-center gap-2 mb-10">
    <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-3/4">

      <form on:submit={submit} class="flex flex-wrap justify-start items-center gap-2 w-full">
        <div class="flex flex-wrap justify-start items-center w-full mb-2">
          <div class="flex justify-between items-center w-full">
            <div class="flex items-center gap-2">
              <FileCirclePlusOutline size="md" class="text-blue-700" />
              <P size="xl" weight="bold" class="text-gray-900">Create Concept Note</P>
            </div>
            <div class="flex items-center gap-2">
              <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><UserAddOutline size="sm" />Save as Draft</Button>
              <Button type="submit" outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><UserAddOutline size="sm" />Submit</Button>
            </div>
          </div>
          <P size="sm" weight="normal" class="text-gray-500">Fill out all empty fields with the appropriate texts. Put "N/A" if not applicable and "To Be Followed" as it states.</P>
        </div>

        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <div class="flex flex-wrap items-center gap-1">
            <P weight="medium" size="base">Implementing Agency/Department</P>
            <Input type="text" size="sm" id="implementingDept" name="implementingDept" label="Implementing Agency/Department" required class="rounded-md focus:ring-blue-700 focus:border-blue-700 text-gray-500"></Input>
            <Helper class=" text-gray-500"></Helper>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <P weight="medium" size="base">Cooperating Agency</P>
            <Input type="text" size="sm" id="coopAgency" name="coopAgency" label="Cooperating Agency" required class="rounded-md text-gray-500 focus:ring-blue-500 focus:border-blue-500"></Input>
            <Helper class=" text-gray-500">State the name of agency to be tapped for funding/ co-implementing the project.</Helper>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <P weight="medium" size="base">Site/s of Implementation</P>
            <Input type="text" size="sm" id="siteImplementation" name="siteImplementation" label="Site/s of Implementation" required class="rounded-md text-gray-500 focus:ring-blue-500 focus:border-blue-500"></Input>
            <Helper class=" text-gray-500">Site/s of Implementation</Helper>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <P weight="medium" size="base">Total Project Cost</P>
            <Input type="text" size="sm" id="totalCost" name="totalCost" label="Total Project Cost" required class="rounded-md text-gray-500 focus:ring-blue-500 focus:border-blue-500"></Input>
            <Helper class=" text-gray-500">Include the specific budget allocations for personnel service, maintenance and operations, equipment, trainings/workshops, and administrative costs.</Helper>
          </div>
          <div class="flex flex-wrap items-center gap-1">
            <P weight="medium" size="base">Funding Source</P>
            <Input type="text" size="sm" id="fundingSource" name="fundingSource" label="Funding Source" required class="rounded-md text-gray-500 focus:ring-blue-500 focus:border-blue-500"></Input>
            <Helper class=" text-gray-500">Specific funding source, including counterpart funds.</Helper>
          </div>

          <div class="flex flex-wrap items-center gap-1">
            <P weight="medium" size="base" for="researchLeaders">Project Duration</P>
            <DateInput bind:value={projectDuration} format="yyyy-MM-dd" placeholder="yyyy-MM-dd" required --date-picker-highlight-border="#1d4ed8" --date-picker-highlight-shadow="none" --date-input-width="100%" class="w-full rounded-md text-gray-500 " />
            <Helper class=" text-gray-500">Specific dates that the project will be undertaken (month/year); ideally to be completed minimum 1 year/ depending on the approved grant.</Helper>
          </div>
        </div>

        <!--project description-->
        <div class="grid grid-flow-row items-center gap-1 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <P weight="semibold" size="lg">Project Description</P>
          <Textarea id="description" name="description" rows="15" class="mb-0 p-0">
            <Toolbar slot="header" embedded class="m-0 p-0">
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid size="sm" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              
            </Toolbar>
          </Textarea>
          <Helper class=" text-gray-500">Formally written declaration of the project and its idea and context to explain the goals and objectives to be reached and other relevant information that explains the need for the project and aims to describe the amount of work planned for implementation; refers to a simple explanation or depiction of the project that can be used as communication material.</Helper>
        </div>

        <!--significance-->
        <div class="grid grid-flow-row items-center gap-1 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <P weight="semibold" size="xl">Significance</P>
          <Textarea id="significance" name="significance" rows="15" class="mb-0 p-0">
            <Toolbar slot="header" embedded class="m-0 p-0">
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid size="sm" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              
            </Toolbar>
          </Textarea>
          <Helper class=" text-gray-500">Refers to the alignment to UNC research agenda/ UN SDG / tapped agency provided in the matrix attached; review of literature may refer to the following: (a) related researches that have been conducted, state-of-the-art or current technologies from which the project will take off; (b) scientific/technical merit; (c) results of related research conducted by the same Project Leader, if any; (d) Prior Art Search, and; (e) other relevant.</Helper>
        </div>

        <!--objectives-->
        <div class="grid grid-flow-row items-center gap-1 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <P weight="semibold" size="lg">Objectives</P>
          <Textarea id="objectives" name="objectives" rows="15" class="mb-0 p-0">
            <Toolbar slot="header" embedded class="m-0 p-0">
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid size="sm" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              
            </Toolbar>
          </Textarea>
          <Helper class=" text-gray-500">Statements of the general and specific purposes to address the problem areas of the project; must anchor to the UNC agenda/ SDG/ grant giving body’s agenda.</Helper>
        </div>

        <!--methodology-->
        <div class="grid grid-flow-row items-center gap-1 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <P weight="semibold" size="lg">Methodology</P>
          <Textarea id="methodology" name="methodology" rows="15" class="mb-0 p-0">
            <Toolbar slot="header" embedded class="m-0 p-0">
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid size="sm" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              
            </Toolbar>
          </Textarea>
          <Helper class=" text-gray-500">Discuss the following: (a) variables or parameters to be measured and evaluated or analyzed; (b) treatments to be used and their layout; (c) experimental procedures and design; (d) statistical analysis; (e) evaluation method and observations to be made, strategies for implementation (Conceptual/Analytical framework).</Helper>
        </div>

        <!--technology roadmap-->
        <div class="grid grid-flow-row items-center gap-1 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <P weight="semibold" size="lg">Technology Roadmap</P>
          <Textarea id="technologyRoadmap" name="technologyRoadmap" rows="15" class="mb-0 p-0">
            <Toolbar slot="header" embedded class="m-0 p-0">
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid size="sm" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              
            </Toolbar>
          </Textarea>
          <Helper class=" text-gray-500">(if applicable) A visual document that communicates the plan for technology.</Helper>
        </div>

        <!--expected outputs-->
        <div class="grid grid-flow-row items-center gap-1 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <P weight="semibold" size="lg">Expected Outputs (6Ps)</P>
          <Textarea id="expectedOutput" name="expectedOutput" rows="15" class="mb-0 p-0">
            <Toolbar slot="header" embedded class="m-0 p-0">
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid size="sm" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              
            </Toolbar>
          </Textarea>
          <Helper class=" text-gray-500">Deliverables of the project based on the 6Ps metrics of DOST/ typical grants suggested deliverables (Publication, Patent/Intellectual Property, Product, People Service, Place and Partnership, and Policy).</Helper>
        </div>

        <!--work plan-->
        <div class="grid grid-flow-row items-center gap-1 shadow-lg border rounded-md p-3 mb-4 w-full bg-white">
          <P weight="semibold" size="lg">Work Plan</P>
          <Textarea id="workPlan" name="workPlan" rows="15" class="mb-0 p-0">
            <Toolbar slot="header" embedded class="m-0 p-0">
              <ToolbarGroup>
                <ToolbarButton name="Attach file"><PaperClipOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Embed map"><MapPinAltSolid size="sm" /></ToolbarButton>
                <ToolbarButton name="Upload image"><ImageOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarButton name="Format code"><CodeOutline size="sm" /></ToolbarButton>
                <ToolbarButton name="Add emoji"><FaceGrinOutline size="sm" /></ToolbarButton>
              </ToolbarGroup>
              
            </Toolbar>
          </Textarea>
          <Helper class=" text-gray-500">Specific activity to be undertaken per month in a gantt chart to produce the promised results to attain the objectives of the project.</Helper>
        </div>
      </form>
    </div>
  </div>

  <div class="h-96"></div>
</main>
