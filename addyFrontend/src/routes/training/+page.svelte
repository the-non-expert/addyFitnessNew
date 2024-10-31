<script>
  import IndividualCard from "../../lib/TrainingPageComponents/IndividualCard.svelte";
  import TrainingHero from "../../lib/TrainingPageComponents/TrainingHero.svelte";

  let trainingCardData = [
    {
      id: 1,
      name: "Live Workout Session",
      coach: "Adnan Ali",
      duration: "60 mins",
      sessions: "5",
      // image: "gs://addyfitness-db121.appspot.com/liveWorkout.gif",
      image: "gs://addyfitness-db121.appspot.com/liveExercise.gif",
    },
    {
      id: 2,
      name: "Yoga",
      coach: "Adnan Ali",
      duration: "60 mins",
      sessions: "3",
      image: "gs://addyfitness-db121.appspot.com/Yoga.gif",
    },
    {
      id: 3,
      name: "HIIT and LIIT (Cardio Vascular)",
      coach: "Adnan Ali",
      duration: "40-50 mins",
      sessions: "3",
      image: "gs://addyfitness-db121.appspot.com/Cardio.gif",
    },
    {
      id: 4,
      name: "Dance",
      coach: "Adnan Ali",
      duration: "60 mins",
      sessions: "3",
      image: "gs://addyfitness-db121.appspot.com/dance.gif",
    },
    {
      id: 5,
      name: "Zumba",
      coach: "Adnan Ali",
      duration: "60 mins",
      sessions: "3",
      image: "gs://addyfitness-db121.appspot.com/zumba.gif",
    },
    {
      id: 6,
      name: "Old-Age Workout",
      coach: "Adnan Ali",
      duration: "60 mins",
      sessions: "5",
      image: "gs://addyfitness-db121.appspot.com/oldAge.gif",
    },
  ];
</script>

<TrainingHero />
<div class="md:p-10 p-5 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-4">
  {#each trainingCardData as individualData (individualData.id)}
    <IndividualCard individualCardData={individualData} />
  {/each}
</div>
