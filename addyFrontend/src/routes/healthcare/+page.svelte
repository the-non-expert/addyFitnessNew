<script>
  import IndividualHealthcareCard from "../../lib/HealthcarePageComponents/IndividualHealthcareCard.svelte";
  import { healthcareServices } from "$lib/stores/healthcareData";

  let healthcareData = healthcareServices.services;
</script>

<svelte:head>
  <title>Healthcare | AddyFitness</title>
  <meta
    name="description"
    content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness."
  />
</svelte:head>

<div
  class="p-5 sm:p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-6"
>
  {#each healthcareData as individualData (individualData.id)}
    <IndividualHealthcareCard individualCardData={individualData} />
  {/each}
</div>
