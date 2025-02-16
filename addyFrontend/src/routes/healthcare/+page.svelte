<script>
  import IndividualHealthcareCard from "../../lib/HealthcarePageComponents/IndividualHealthcareCard.svelte";
  import IndividualNutritionCard from "../../lib/NutritionPageComponents/IndividualNutritionCard.svelte";

  let nutritionCardData = [
    {
      id: 1,
      name: "Emergency ",
      description: "Get instant emergency help from our doctors",
      image: "gs://addyfitness-db121.appspot.com/emergency.gif",
    },
    {
      id: 2,
      name: "General Physician",
      description: "Consult about any problem",
      image: "gs://addyfitness-db121.appspot.com/generalPhysician.gif",
    },
    {
      id: 3,
      name: "Medicine Specialist",
      description: "Consult specific related disorder",
      image: "gs://addyfitness-db121.appspot.com/medicineSpecialist.gif",
    },
    {
      id: 4,
      name: "Gynaecologist",
      description: "Consult gynic related issues confidentially",
      image: "gs://addyfitness-db121.appspot.com/gynocologist 1.gif",
    },
    {
      id: 5,
      name: "Endocronologist",
      description: "Get your diabetes and thyroid treatment at home",
      image: "gs://addyfitness-db121.appspot.com/thyroid 3.gif",
    },
    {
      id: 6,
      name: "Mental Health",
      description: "Get a friend to help you",
      image: "gs://addyfitness-db121.appspot.com/counsellor 1.gif",
    },
  ];
</script>

<svelte:head>
  <title>Healthcare | AddyFitness</title>
  <meta name="description" content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness." />
</svelte:head>

<div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
  {#each nutritionCardData as individualData (individualData.id)}
    <IndividualHealthcareCard individualCardData={individualData} />
  {/each}
</div>
