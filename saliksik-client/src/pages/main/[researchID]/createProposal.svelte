<script lang="ts">
    let json = {};
  
  function submit(e: Event) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    json = Object.fromEntries(formData.entries());

    // Make an HTTP POST request to the API
    fetch('/api/research/createProposal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          // Handle a successful response (e.g., redirect to a new page)
          window.location.href = '/main/';
        } else {
          // Handle errors or authentication failures
          console.error('Login failed');
        }
      })
      .catch((error) => {
        console.error('Network error:', error);
      });
  }
    </script>
    
    <form on:submit={submit}>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="researchID">
            Research ID
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="text"
            id="researchID"
            name="researchID"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="implementingDept">
            Implementing Department
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="text"
            id="implementingDept"
            name="implementingDept"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="coopAgency">
            Cooperative Agency
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="text"
            id="coopAgency"
            name="coopAgency"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="siteImplementation">
            Site of Implementation
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="text"
            id="siteImplementation"
            name="siteImplementation"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="projectDuration">
            Project Duration
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="date"
            id="projectDuration"
            name="projectDuration"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="totalCost">
            Total Cost
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            type="number"
            id="totalCost"
            name="totalCost"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="fundingSource">
            Funding Source
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus-border-black"
            type="text"
            id="fundingSource"
            name="fundingSource"
          />
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="description">
            Description
          </label>
          <textarea
            class="w-64 h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            id="description"
            name="description"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="significance">
            Significance
          </label>
          <textarea
            class="w-64 h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            id="significance"
            name="significance"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="objectives">
            Objectives
          </label>
          <textarea
            class="w-64 h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            id="objectives"
            name="objectives"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="methodology">
            Methodology
          </label>
          <textarea
            class="w-64 h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            id="methodology"
            name="methodology"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="technologyRoadmap">
            Technology Roadmap
          </label>
          <textarea
            class="w-64 h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            id="technologyRoadmap"
            name="technologyRoadmap"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="expectedOutput">
            Expected Output
          </label>
          <textarea
            class="w-64 h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            id="expectedOutput"
            name="expectedOutput"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="workPlan">
            Work Plan
          </label>
          <textarea
            class="w-64 h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-black"
            id="workPlan"
            name="workPlan"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-white font-bold mb-2" for="proposalStatus">
            Proposal Status
          </label>
          <input
            class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus-border-black"
            type="text"
            id="proposalStatus"
            name="proposalStatus"
          />
        </div>
      
        <button
          class="w-64 h-10 bg-red-800 hover-bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
          type="submit"
        >
         Submit
        </button>
      </form>
      
      
    
    <pre>
      
      {JSON.stringify(json, null, 2)}
    </pre>
    
    <style>
      /* Your CSS styles go here */
    </style>
    