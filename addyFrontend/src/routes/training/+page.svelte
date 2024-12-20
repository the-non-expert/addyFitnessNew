<script>
  import IndividualCard from "../../lib/TrainingPageComponents/IndividualCard.svelte";
  import TrainingHero from "../../lib/TrainingPageComponents/TrainingHero.svelte";
  import PlanModal from "$lib/CommonComponents/PlanModal.svelte";

  import { trainingCardData } from "$lib/stores/TrainingCardData.js";

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

<TrainingHero />
<div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
  {#each trainingCardData as individualData (individualData.id)}
    <IndividualCard
      individualCardData={individualData}
      on:planClick={handlePlanClick}
    />
  {/each}
</div>

{#if selectedPlan}
  <PlanModal
    isOpen={isModalOpen}
    planData={selectedPlan}
    on:close={handleModalClose}
  />
{/if}
