<script>
  import { fade, scale } from "svelte/transition";
  import { X, CircleX } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  export let isOpen;
  export let planData;

  console.log("planData", planData);

  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch("close");
  }

  let selectedTrainingType = "Batch Training"; // "batch" or "personal"
  let selectedTimeSlot = planData.trainingTypes.timeSlots[0];
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black/90 overflow-hidden z-40"
    on:click={handleClose}
    transition:fade
  />

  <div
    class="fixed flex inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
             bg-white rounded-2xl z-50 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
    transition:scale
  >
    <!-- left Side  -->
    <div class="w-4/12 md:h-[500px]">
      <img
        src={gsToHttp(planData.image)}
        alt={planData.name}
        class="h-1/2 w-full object-cover top"
      />
      <div class="bg-[#C0CFFF] px-6 py-10 h-1/2">
        <div class="md:mb-4">
          <p class="text-black font-medium text-xl mb-3">
            Training Type <span class="text-gray-600 text-sm"
              >(Select one of the below)</span
            >
          </p>
          <div class="flex gap-4 mt-5">
            {#each planData.trainingTypes.types as type}
              <button
                class="px-8 py-2 rounded-full transition-colors
            {selectedTrainingType === type
                  ? 'bg-pink-400 text-white'
                  : 'bg-white text-black'}"
                on:click={() => (selectedTrainingType = type)}
              >
                {type}
              </button>
            {/each}
          </div>
        </div>

        <div>
          <p class="text-black text-xl font-medium">
            Time <span class="text-gray-600 text-sm"
              >(Select one of the below)</span
            >
          </p>
          <div class="flex gap-4 mt-2">
            {#each planData.trainingTypes.timeSlots as time}
              <button
                class="px-8 py-2 rounded-full transition-colors
            {selectedTimeSlot === time
                  ? 'bg-pink-400 text-white'
                  : 'bg-white text-black'}"
                on:click={() => (selectedTimeSlot = time)}
              >
                {time}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- right side  -->
    <div class="w-8/12 px-5 py-10">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-2xl font-bold">{planData.name}</h2>
          <p class="text-gray-500 mt-2 text-sm">
            {planData.description}
          </p>
        </div>
        <button
          on:click={handleClose}
          class="text-gray-500 hover:text-gray-700 p-1"
        >
          <CircleX class="text-pink-500" size={24} />
        </button>
      </div>

      <!-- Session Info Flex Container -->
      <div class="flex justify-start gap-x-16 mt-8">
        <!-- Session Split -->
        <div>
          <h3 class="text-2xl font-semibold text-pink-600 mb-1">
            Session Split
          </h3>
          <ul class="space-y-2 ml-7">
            {#each planData.sessionSplit as session}
              <li class="list-disc text-gray-700">
                {session.title}: {session.duration}
              </li>
            {/each}
          </ul>
        </div>

        <!-- What do you get? -->
        <div>
          <h3 class="text-xl font-semibold text-pink-600 mb-3">
            What do you get?
          </h3>
          <ul class="space-y-2 ml-7">
            <li class="list-disc text-gray-700">
              {planData.benefits.sessionsPerWeek}
            </li>
            {#each planData.benefits.features as feature}
              <li class="list-disc text-gray-700">{feature}</li>
            {/each}
          </ul>
        </div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-3 gap-4 mt-7">
        {#each planData.pricing as plan}
          <div class="bg-[#F4F5FF] p-4 rounded-xl relative">
            <h4 class="text-purple-600 font-medium">For {plan.duration}:</h4>
            <p class="font-bold text-lg mt-1">Now ₹{plan.price}/- only</p>

            <div class="space-y-1">
              <!-- {#if plan.tag}
                <p
                  class="text-gray-600 text-sm flex items-center justify-center"
                >
                  {plan.tag}
                </p>
              {/if} -->

              <button
                class="w-full mt-4 bg-pink-400 text-white py-3 rounded-xl hover:bg-pink-600 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add any additional styles here */
</style>
