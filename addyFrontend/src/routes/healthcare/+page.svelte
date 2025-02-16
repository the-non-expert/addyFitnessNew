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

<div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
  {#each healthcareData as individualData (individualData.id)}
    <IndividualHealthcareCard individualCardData={individualData} />
  {/each}
</div>
