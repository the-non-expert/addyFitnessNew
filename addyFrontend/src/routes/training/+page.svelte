<script>
  import IndividualCard from "../../lib/TrainingPageComponents/IndividualCard.svelte";
  import TrainingHero from "../../lib/TrainingPageComponents/TrainingHero.svelte";
  import PlanModal from "$lib/CommonComponents/PlanModal.svelte";
  import { fade } from "svelte/transition";
  import { trainingCardData } from "$lib/stores/TrainingCardData.js";

  let isModalOpen = false;
  let selectedPlan = null;
  let filteredCards = trainingCardData;
  let noResults = false;

  function handlePlanClick(event) {
    selectedPlan = event.detail;
    isModalOpen = true;
  }

  function handleModalClose() {
    isModalOpen = false;
    selectedPlan = null;
  }

  function handleSearchResults(event) {
    const { results } = event.detail;
    filteredCards = results;
    noResults = results.length === 0;
  }
</script>

<svelte:head>
  <title>Training | AddyFitness</title>
  <meta name="description" content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness." />
</svelte:head>

<TrainingHero on:search={handleSearchResults} />

{#if noResults}
  <div class="flex flex-col items-center justify-center py-16" transition:fade>
    <p class="text-xl text-gray-600 mb-2">No training programs found</p>
    <p class="text-gray-500">Try different search terms or browse all programs below</p>
  </div>
{:else}
  <div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-4" transition:fade>
    {#each filteredCards as individualData (individualData.id)}
      <IndividualCard
        individualCardData={individualData}
        on:planClick={handlePlanClick}
      />
    {/each}
  </div>
{/if}

{#if selectedPlan}
  <PlanModal
    isOpen={isModalOpen}
    planData={selectedPlan}
    on:close={handleModalClose}
  />
{/if}