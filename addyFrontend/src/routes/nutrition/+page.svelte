<script>
  import IndividualNutritionCard from "../../lib/NutritionPageComponents/IndividualNutritionCard.svelte";
  import NutritionHero from "../../lib/NutritionPageComponents/NutritionHero.svelte";
  import { nutritionCardData } from "$lib/stores/NutritionCardData.js";
  import NutritionModal from "$lib/CommonComponents/NutritionModal.svelte";

  let isModalOpen = false;
  let selectedPlan = null;

  function handlePlanClick(event) {
    selectedPlan = event.detail;
    isModalOpen = true;
  }

  function handleModalClose() {
    isModalOpen = false;
    selectedPlan = null; // Reset selectedPlan when closing
  }
</script>

<NutritionHero />
<div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-4">
  {#each nutritionCardData as individualData (individualData.id)}
    <IndividualNutritionCard
      individualCardData={individualData}
      on:planClick={handlePlanClick}
    />
  {/each}
</div>

{#if selectedPlan}
  <NutritionModal
    isOpen={isModalOpen}
    planData={selectedPlan}
    on:close={handleModalClose}
  />
{/if}
