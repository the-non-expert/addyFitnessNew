<script>
  import IndividualHealthcareCard from "../../lib/HealthcarePageComponents/IndividualHealthcareCard.svelte";
  import IndividualManagementCard from "../../lib/ManagementPageComponents/IndividualManagementCard.svelte";
  import IndividualNutritionCard from "../../lib/NutritionPageComponents/IndividualNutritionCard.svelte";

  let nutritionCardData = [
    {
      id: 1,
      name: "Naming Partner",
      description: "We Help You Grow",
      image: "gs://addyfitness-db121.appspot.com/namingPartner.gif",
    },
    {
      id: 2,
      name: "Managing Partner",
      description: "Let's Grow Together",
      image: "gs://addyfitness-db121.appspot.com/managingPartner.gif",
    },
    {
      id: 3,
      name: "Franchise",
      description: "let's Make a Community Together",
      image: "gs://addyfitness-db121.appspot.com/franchise.gif",
    },
  ];
</script>

<div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
  {#each nutritionCardData as individualData (individualData.id)}
    <IndividualManagementCard individualCardData={individualData} />
  {/each}
</div>
