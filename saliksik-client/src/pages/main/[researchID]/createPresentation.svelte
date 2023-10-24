<script lang="ts">
  let json = {};
  let isSubmitting = false;
  let submissionError: any = null;

  async function submitForm(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    json = Object.fromEntries(formData.entries());

    isSubmitting = true;
    submissionError = null;

    try {
      const response = await fetch('/api/research/createPresentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (response.ok) {
        window.location.href = '/main/';
      } else {
        console.error('Submission failed');
        submissionError = 'Submission failed';
      }
    } catch (error) {
      console.error('Network error:', error);
      submissionError = 'Network error';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit={submitForm}>
    
    <div class="mb-4">
      <label class="block text-white font-bold mb-2" for="presentationDate">
        Presentation Date
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus-border-black"
        type="date"
        id="presentationDate"
        name="presentationDate"
      />
    </div>
    
    <div class="mb-4">
      <label class="block text-white font-bold mb-2" for="presentationTime">
        Presentation Time
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus-border-black"
        type="time"
        id="presentationTime"
        name="presentationTime"
      />
    </div>
    
    <div class="mb-4">
      <label class="block text-white font-bold mb-2" for="researchID">
        Research ID
      </label>
      <input
        class="w-64 h-9 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus-border-black"
        type="number"
        id="researchID"
        name="researchID"
      />
    </div>
    
    <button
      class="w-64 h-10 bg-red-800 hover-bg-red-900 shadow-lg text-white font-bold py-2 px-4 mb-6 border rounded"
      type="submit"
      disabled={isSubmitting}
    >
      {#if isSubmitting}
        Submitting...
      {:else}
        Submit
      {/if}
    </button>
  </form>

  {#if submissionError}
    <p>Error: {submissionError}</p>
  {/if}

  
      
    
    