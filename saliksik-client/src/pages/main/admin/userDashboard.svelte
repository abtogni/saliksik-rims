<script>
  import { Button, Card, Heading, Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from "flowbite-svelte";
  import { BookOutline } from "flowbite-svelte-icons";

</script>

<main>
  <Heading tag="h1" class="mb-6 text-xl">Dashboard</Heading>
  <Card size="lg" class="w-full">
    <div>
      Search for research

      <div class="flex justify-between">
        <div class="w-full">
          <Heading tag="h1" class="text-lg divide-dashed">Recently Updated Researches</Heading>
        </div>
        <div class="w-24 flex flex-wrap justify-around items-stretch">
          <BookOutline />
          <BookOutline />
          <BookOutline />
        </div>
      </div>
      <!--look for icons-->
      Slim down research list Expand research list Refresh research list
      <Table class="table-fixed">
        <TableHead>
          <TableHeadCell class="w-3/4">Research Title</TableHeadCell>
          <TableHeadCell></TableHeadCell>
        </TableHead>

        <TableBody>
          <TableBodyRow>
            <TableBodyCell class="whitespace-normal ">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</TableBodyCell>
            <TableBodyCell class="flex flex-wrap justify-evenly items-stretch">
              <BookOutline />
              <BookOutline />
              <BookOutline />
              <BookOutline />
            </TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </Table>
    </div>

    <Card padding="none" class="border-none shadow-none">
      <div>
        Research Title
        <!--look for icons-->
        Research status Word count Date updated Status
      </div>

      <div>
        <!--look for icons-->
        Copy research link to clipboard Edit article View article Delete article
      </div>
    </Card>

    <Button>Create Research Proposal</Button>
  </Card>
</main>
