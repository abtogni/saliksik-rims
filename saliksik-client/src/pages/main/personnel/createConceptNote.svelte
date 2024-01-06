<script lang="ts">
  import { A, Avatar, Badge, Button, Card, Datepicker, FloatingLabelInput, Heading, Helper, Hr, Indicator, Input, Label, Modal, MultiSelect, P, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Textarea, Toolbar, ToolbarButton, ToolbarGroup, Tooltip } from "flowbite-svelte";
  import { BookOutline, ClipboardOutline, ClockOutline, CodeOutline, EditOutline, ExclamationCircleOutline, FaceGrinOutline, FileLinesOutline, ImageOutline, MapPinAltSolid, PaperClipOutline, PapperPlaneOutline, TrashBinOutline, UploadOutline } from "flowbite-svelte-icons";
  import { onMount } from "svelte";
  import { DateInput } from "date-picker-svelte";
  import moment from "moment";

  let json = {},
    researchMembers: any[] = [],
    researchLeaders: any[] = [];

  var userData: any, users: any, userList: any;

  async function fetchUser() {
    const response = await fetch("/api/checkUser");
    userData = await response.json();
  }

  async function fetchUserList() {
    const response = await fetch("/api/user/getUsers");
    users = await response.json();
  }

  onMount(async () => {
    await Promise.all([fetchUser(), fetchUserList()]);
    userList = users.map((user: any) => ({
      value: user._id,
      name: `${user.firstName} ${user.lastName}`,
    }));
  });

  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());
    json = {
      ...json,
      researchMembers,
      researchLeaders,
    };

    fetch("/api/research/createResearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response (e.g., redirect to a new page)
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
  let date = new Date();
</script>

<main>
  <form on:submit={submit} class="flex flex-wrap justify-center gap-2">
    <Card size="xl" class="gap-2 w-full">
      <div class="flex justify-between items-start gap-2">
        <P weight="semibold" size="base" class="">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</P>
        <a href="/" class="text-blue-700 text-sm font-medium w-44 text-right hover:underline">Edit Name</a>
      </div>
      <div class="flex justify-start items-center gap-2">
        <div><P weight="normal" class="flex items-center gap-2"><ClockOutline size="sm" /><!--{moment(p.createdAt).format("lll")}-->
          </P></div>
        <Tooltip arrow={false}>Last update</Tooltip>
        <Badge border large class="flex items-center gap-2"><Indicator color="yellow" class="" />No Status</Badge>
      </div>
    </Card>

    <Card size="xl" padding="none" class="gap-2 pt-6 w-full border-none shadow-none">
      <div class="flex justify-between items-start gap-2">
        <P weight="semibold" size="xl" class="">Create Concept Note</P>
        <div class="flex items-center gap-2">
          <Button type="submit" class="gap-2"><EditOutline size="sm" />Save As Draft</Button>
          <Button type="submit" class="gap-2"><UploadOutline size="sm" />Submit</Button>
          <Button type="submit" class="gap-2"><TrashBinOutline size="sm" />Delete</Button>
        </div>
      </div>
    </Card>

    <Card size="xl" class="gap-2 w-full">
      <FloatingLabelInput type="text" size="small" style="outlined" id="floating_filled" name="floating_filled" label="Research Title" required class="w-full">Research Title</FloatingLabelInput>
      <Helper class=" text-blue-700"></Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="floating_filled" name="floating_filled" label="Implementing Agency/Department" required class="w-full">Implementing Agency/Department</FloatingLabelInput>
      <Helper class=" text-blue-700"></Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="floating_filled" name="floating_filled" label="Cooperating Agency" required class="w-full">Cooperating Agency</FloatingLabelInput>
      <Helper class=" text-blue-700">State the name of agency to be tapped for funding/ co-implementing the project.</Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="floating_filled" name="floating_filled" label="Site/s of Implementation" required class="w-full">Site/s of Implementation</FloatingLabelInput>
      <Helper class=" text-blue-700"></Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="floating_filled" name="floating_filled" label="Total Project Cost" required class="w-full">Total Project Cost</FloatingLabelInput>
      <Helper class=" text-blue-700">Include the specific budget allocations for personnel service, maintenance and operations, equipment, trainings/workshops, and administrative costs.</Helper>
      <FloatingLabelInput type="text" size="small" style="outlined" id="floating_filled" name="floating_filled" label="Funding Source" required class="w-full">Funding Source</FloatingLabelInput>
      <Helper class=" text-blue-700">Specific funding source, including counterpart funds.</Helper>
      <div class="gap-2">
        <P weight="medium" size="base" for="researchLeaders">Project Duration</P>
        <DateInput bind:value={date} format="yyyy-MM-dd" required class=""/>
        <Helper class="pt-1 text-blue-700">Specific dates that the project will be undertaken (month/year); ideally to be completed minimum 1 year/ depending on the approved grant.</Helper>
      </div>
      <div class="gap-2">
        <P weight="medium" size="base" for="researchLeaders">Research Leader</P>
        <MultiSelect size="sm" items={userList} bind:value={researchLeaders} required />
        <Helper class="pt-2 text-orange-500"></Helper>
      </div>
    </Card>

    <Card size="xl" class="gap-2 w-full">
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
    </Card>

    <Card size="xl" class="gap-2 w-full">
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
    </Card>
    <Card size="xl" class="gap-2 w-full">
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
    </Card>
    <Card size="xl" class="gap-2 w-full">
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
    </Card>
    <Card size="xl" class="gap-2 w-full">
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
    </Card>
    <Card size="xl" class="gap-2 w-full">
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
    </Card>
    <Card size="xl" class="gap-2 w-full">
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
    </Card>
  </form>
</main>
