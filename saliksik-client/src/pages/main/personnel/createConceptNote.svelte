<script lang="ts">
  import { Alert, Badge, Button, Card, FloatingLabelInput, Helper, Indicator, Label, MultiSelect, P, Select, Textarea, Toolbar, ToolbarButton, ToolbarGroup, Tooltip, Dropdown, DropdownItem } from "flowbite-svelte";
  import { ClockOutline, CodeOutline, EditOutline, FaceGrinOutline, FileCirclePlusOutline, ImageOutline, MapPinAltSolid, PaperClipOutline, PapperPlaneOutline, QuestionCircleOutline, TrashBinOutline, UploadOutline, UserAddOutline, UserOutline, DotsHorizontalOutline } from "flowbite-svelte-icons";
  import { DateInput } from "date-picker-svelte";
  import { researches } from "../../../components/store";

  let json = {};
  let researchID : any;
  let researches = $researchData.map((r) => {
    return {value: r._id, name: r.researchTitle}
  });

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());
    json = {
      ...json,
      researchID,
      projectDuration,
    };

    fetch("/api/research/createProposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/main/";
        } else {
          // Handle errors or authentication failures
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

<main>
  <Alert dismissable color="blue" class="border-l-8 w-full mb-2">
    <div class="flex items-center gap-2">
      <QuestionCircleOutline slot="icon" size="sm" />
      <span class="text-lg font-medium">Create Concept Note</span>
    </div>
    <p class="mt-2 text-sm">Insert helper text</p>
  </Alert>

  <div class="flex justify-center gap-2 mb-10">
    <div class="grid grid-flow-row col-start-2 col-span-3 items-center gap-2 w-1/2 sm:w-full md:w-full lg:w-11/12 xl:w-8/12 2xl:w-3/4">
      <!---->
      <div class="flex justify-between items-center w-full">
        <div class="flex items-center gap-2">
          <FileCirclePlusOutline size="md" class="text-blue-700" />
          <P weight="bold" size="xl" class="text-gray-900">Create Concept Note</P>
        </div>

        <div class="flex items-center gap-2">
          <Button color="blue" size="sm" class="flex items-center gap-2 rounded-md"><UserAddOutline size="sm" />Save as Draft</Button>
          <Button outline color="blue" size="sm" class="flex items-center gap-2 rounded-md"><UserAddOutline size="sm" />Submit</Button>
        </div>
      </div>

    <Card size="xl" class="gap-2 w-full">
      <Select class="mt-2" items={researches} bind:value={researchID} />
      <Helper class=" text-blue-700"></Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="implementingDept" name="implementingDept" label="Implementing Agency/Department" required class="w-full">Implementing Agency/Department</FloatingLabelInput>
      <Helper class=" text-blue-700"></Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="coopAgency" name="coopAgency" label="Cooperating Agency" required class="w-full">Cooperating Agency</FloatingLabelInput>
      <Helper class=" text-blue-700">State the name of agency to be tapped for funding/ co-implementing the project.</Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="siteImplementation" name="siteImplementation" label="Site/s of Implementation" required class="w-full">Site/s of Implementation</FloatingLabelInput>
      <Helper class=" text-blue-700"></Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="totalCost" name="totalCost" label="Total Project Cost" required class="w-full">Total Project Cost</FloatingLabelInput>
      <Helper class=" text-blue-700">Include the specific budget allocations for personnel service, maintenance and operations, equipment, trainings/workshops, and administrative costs.</Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="fundingSource" name="fundingSource" label="Funding Source" required class="w-full">Funding Source</FloatingLabelInput>
      <Helper class=" text-blue-700">Specific funding source, including counterpart funds.</Helper>
      <div class="gap-2">
        <P weight="medium" size="base" for="researchLeaders">Project Duration</P>
        <DateInput bind:value={projectDuration} format="yyyy-MM-dd" required class=""/>
        <Helper class="pt-1 text-blue-700">Specific dates that the project will be undertaken (month/year); ideally to be completed minimum 1 year/ depending on the approved grant.</Helper>
      </div>
    </Card>

        <!--project description-->
        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 bg-white">
          <P weight="semibold" size="lg">Project Description</P>
          <Textarea id="editor" rows="15" class="mb-0 p-0">
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
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline size="sm" class="rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class=" text-blue-700">Formally written declaration of the project and its idea and context to explain the goals and objectives to be reached and other relevant information that explains the need for the project and aims to describe the amount of work planned for implementation; refers to a simple explanation or depiction of the project that can be used as communication material.</Helper>
        </div>

        <!--significance-->
        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 bg-white">
          <P weight="semibold" size="xl">Significance</P><Textarea id="editor" rows="15" class="mb-0 p-0">
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
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline size="sm" class="rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class=" text-blue-700">Refers to the alignment to UNC research agenda/ UN SDG / tapped agency provided in the matrix attached; review of literature may refer to the following: (a) related researches that have been conducted, state-of-the-art or current technologies from which the project will take off; (b) scientific/technical merit; (c) results of related research conducted by the same Project Leader, if any; (d) Prior Art Search, and; (e) other relevant.</Helper>
        </div>

        <!--objectives-->
        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 bg-white">
          <P weight="semibold" size="lg">Objectives</P>
          <Textarea id="editor" rows="15" class="mb-0 p-0">
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
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline size="sm" class="rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class=" text-blue-700">Statements of the general and specific purposes to address the problem areas of the project; must anchor to the UNC agenda/ SDG/ grant giving body’s agenda.</Helper>
        </div>

        <!--methodology-->
        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 bg-white">
          <P weight="semibold" size="lg">Methodology</P>
          <Textarea id="editor" rows="15" class="mb-0 p-0">
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
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline size="sm" class="rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class=" text-blue-700">Discuss the following: (a) variables or parameters to be measured and evaluated or analyzed; (b) treatments to be used and their layout; (c) experimental procedures and design; (d) statistical analysis; (e) evaluation method and observations to be made, strategies for implementation (Conceptual/Analytical framework).</Helper>
        </div>

        <!--technology roadmap-->
        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 bg-white">
          <P weight="semibold" size="lg">Technology Roadmap</P>
          <Textarea id="editor" rows="15" class="mb-0 p-0">
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
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline size="sm" class="rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class=" text-blue-700">(if applicable) A visual document that communicates the plan for technology.</Helper>
        </div>

        <!--expected outputs-->
        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 bg-white">
          <P weight="semibold" size="lg">Expected Outputs (6Ps)</P>
          <Textarea id="editor" rows="15" class="mb-0 p-0">
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
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline size="sm" class="rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class=" text-blue-700">Deliverables of the project based on the 6Ps metrics of DOST/ typical grants suggested deliverables (Publication, Patent/Intellectual Property, Product, People Service, Place and Partnership, and Policy).</Helper>
        </div>

        <!--work plan-->
        <div class="grid grid-flow-row items-center gap-2 shadow-lg border rounded-md p-3 bg-white">
          <P weight="semibold" size="lg">Work Plan</P>
          <Textarea id="editor" rows="15" class="mb-0 p-0">
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
              <ToolbarButton name="send" slot="end"><PapperPlaneOutline size="sm" class="rotate-45" /></ToolbarButton>
            </Toolbar>
          </Textarea>
          <Helper class=" text-blue-700">Specific activity to be undertaken per month in a gantt chart to produce the promised results to attain the objectives of the project.</Helper>
        </div>
      </form>
    </div>
  </div>
</main>
