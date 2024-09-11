<script>
  import IndividualNutritionCard from "../../lib/NutritionPageComponents/IndividualNutritionCard.svelte";

  let nutritionCardData = [
    {
      id: 1,
      name: "Weight Loss",
      coach: "Adnan Ali",
      included: "2 Months Plan | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/weightLoss.gif",
    },
    {
      id: 2,
      name: "Weight Gain",
      coach: "Adnan Ali",
      included: "2 Months Plan | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/weightGain.gif",
    },
    {
      id: 3,
      name: "Diabetes",
      coach: "Adnan Ali",
      included: "As Per Subscription | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/diabetes.gif",
    },
    {
      id: 4,
      name: "Thyroid",
      coach: "Adnan Ali",
      included: "As Per Subscription | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/thyroid.gif",
    },
    {
      id: 5,
      name: "PCOS",
      coach: "Adnan Ali",
      included: "As Per Subscription | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/PCOS.jpeg",
    },
    {
      id: 6,
      name: "Gestation (Pregnancy)",
      coach: "Adnan Ali",
      included: "39 Weeks | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/pregnancy.gif",
    },
    {
      id: 7,
      name: "Senior Nutrition",
      coach: "Adnan Ali",
      included: "As Per Subscription | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/ChildNutrition.gif",
    },
    {
      id: 8,
      name: "Blood Pressure",
      coach: "Adnan Ali",
      included: "As Per Subscription | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/bloodPressure.gif",
    },
    {
      id: 9,
      name: "Renal Function(Kidney)",
      coach: "Adnan Ali",
      included: "As Per Subscription | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/kidney.gif",
    },
    {
      id: 10,
      name: "Child Nutrition",
      coach: "Adnan Ali",
      included: "Yearly Plan | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/ChildNutrition.gif",
    },
    {
      id: 11,
      name: "Post Pregnancy",
      coach: "Adnan Ali",
      included: "1 Year Post | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/pregnancy.gif",
    },
    {
      id: 12,
      name: "Anaemia",
      coach: "Adnan Ali",
      included: "As Per Subscription | Workout Plan also Available",
      image: "gs://addyfitness-db121.appspot.com/kidney.gif",
    },
  ];
</script>

<div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
  {#each nutritionCardData as individualData (individualData.id)}
    <IndividualNutritionCard individualCardData={individualData} />
  {/each}
</div>
