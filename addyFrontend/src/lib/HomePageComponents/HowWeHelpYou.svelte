<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  let tailoredPlans = "gs://addyfitness-db121.appspot.com/tailoredPlans.jpg";
  let sustainableHabits =
    "gs://addyfitness-db121.appspot.com/SustainableHabits.jpg";
  let monitoring = "gs://addyfitness-db121.appspot.com/Monitoring.jpg";
</script>

<div class="mt-6 mb-10">
  <p class="josefin-slab-regular text-4xl text-center font-bold raleway-font">
    How Addy Fitness Helps you
  </p>

  <div
    class="flex md:flex-row flex-col-reverse gap-10 mt-10 bg-[#F4F6F8] px-12 p-4 rounded-xl md:w-10/12 mx-auto"
  >
    <img src={gsToHttp(tailoredPlans)} alt="" class="md:h-96 rounded" />

    <p class="text-2xl font-semibold md:mt-20 text-center md:text-left">
      Tailored Plans <br />
      <span class="font-normal text-base leading-normal mt-3"
        >At Addy Fitness, we take the time to understand your goals and
        lifestyle before crafting a plan that suits YOU! Just like your friend's
        clothes might not be the right fit for you, their nutrition and training
        plans won't be either. Our personalized plans are designed to meet your
        unique needs.</span
      >
    </p>
  </div>

  <div
    class="flex md:flex-row flex-col gap-10 mt-5 md:px-10 md:w-10/12 mx-auto"
  >
    <div
      class="bg-[#F4F6F8] flex md:flex-col flex-col-reverse gap-10 items-center p-10 w-full rounded-xl"
    >
      <img
        src={gsToHttp(sustainableHabits)}
        alt=""
        class="md:h-64 md:mt-10 rounded"
      />
      <p class="text-2xl font-semibold text-center">
        Building Sustainable Habits <br />
        <span class="font-normal text-base"
          >Achieving fitness is one thing, but maintaining it is where the real
          work begins. At Addy Fitness, we understand this, so we seamlessly
          incorporate fitness into your daily routine, ensuring your progress
          lasts and becomes a sustainable part of your lifestyle.</span
        >
      </p>
    </div>
    <div
      class="bg-[#F4F6F8] flex md:flex-col flex-col-reverse gap-10 items-center p-10 w-full rounded-xl"
    >
      <img src={gsToHttp(monitoring)} alt="" class="md:h-64 md:mt-10 rounded" />

      <p class="text-2xl font-semibold text-center">
        Monitoring and Accountability <br />
        <span class="font-normal text-base leading-normal"
          >Our expert coaches do more than just provide diet and training
          plans—they stand by your side as trusted guides, supporting you
          through every step of your fitness journey.</span
        >
      </p>
    </div>
  </div>
</div>

<style>
  .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
