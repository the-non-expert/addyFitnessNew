<script>
  import IndividualNutritionCard from "../../lib/NutritionPageComponents/IndividualNutritionCard.svelte";
  import NutritionHero from "../../lib/NutritionPageComponents/NutritionHero.svelte";
  import { nutritionCardData } from "$lib/stores/NutritionCardData.js";
  import NutritionModal from "$lib/CommonComponents/NutritionModal.svelte";

  let isModalOpen = false;
  let selectedPlan = null;
  let filteredCards = nutritionCardData;
  let noResults = false;

  function handlePlanClick(event) {
    selectedPlan = event.detail;
    isModalOpen = true;
  }

  function handleModalClose() {
    isModalOpen = false;
    selectedPlan = null; // Reset selectedPlan when closing
  }

  function handleSearchResults(event) {
    const { results } = event.detail;
    filteredCards = results;
    noResults = results.length === 0;
  }
</script>

<svelte:head>
  <title>Nutrition | AddyFitness</title>
  <meta
    name="description"
    content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness."
  />
</svelte:head>

<NutritionHero on:search={handleSearchResults} />

{#if noResults}
  <div class="flex flex-col items-center justify-center py-16" transition:fade>
    <p class="text-xl text-gray-600 mb-2">No training programs found</p>
    <p class="text-gray-500">
      Try different search terms or browse all programs below
    </p>
  </div>
{:else}
  <div
    class="p-5 sm:p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6"
  >
    {#each filteredCards as individualData (individualData.id)}
      <IndividualNutritionCard
        individualCardData={individualData}
        on:planClick={handlePlanClick}
      />
    {/each}
  </div>{/if}

{#if selectedPlan}
  <NutritionModal
    isOpen={isModalOpen}
    planData={selectedPlan}
    on:close={handleModalClose}
  />
{/if}
