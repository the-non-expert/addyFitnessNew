<script>
  import { fade, scale } from "svelte/transition";
  import { CircleX } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { paymentStore } from "$lib/stores/payment";
  import { loadRazorpay } from "$lib/utils/paymentUtils";
  import { onMount } from "svelte";
  import { user } from "$lib/stores/userStore.js";
  import { goto } from "$app/navigation";
  import { checkoutStore } from '$lib/stores/checkoutStore';

  export let isOpen;
  export let planData;

  const dispatch = createEventDispatcher();
  let isLoading = false;
  let error = null;
  let ctaButton = "";
  let selectedTrainingType = "Batch Training";
  let selectedTimeSlot = planData.trainingTypes.timeSlots[0];

  $: if ($user) {
    ctaButton = "Buy Now";
  } else {
    ctaButton = "Sign In";
  }

  async function handleClick(plan) {
    const checkoutData = {
      planData: {
        ...planData,
        image: gsToHttp(planData.image)
      },
      planType: 'training',
      selectedPlan: plan,
      selectedTrainingType,
      selectedTimeSlot
    };
    
    try {
      localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
      checkoutStore.setPlanData(checkoutData);
      
      if ($user) {
        await goto("/checkout");
      } else {
        await goto('/signin');
      }
    } catch (err) {
      console.error('Error in handleClick:', err);
    }
  }

  function handleClose() {
    dispatch("close");
  }

  onMount(async () => {
    await loadRazorpay();
  });
</script>

{#if isOpen}
  <!-- Backdrop -->
  <div
    class="fixed inset-0 bg-black/90 overflow-hidden z-40"
    on:click={handleClose}
    transition:fade
  />

  <!-- Modal Container -->
  <div
    class="fixed inset-x-4 inset-y-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
           bg-white rounded-2xl z-50 max-w-[90%] md:max-w-7xl w-full overflow-y-auto"
    transition:scale
  >
    <!-- Close Button - Absolutely positioned -->
    <button
      on:click={handleClose}
      class="absolute right-4 top-4 z-50 p-1 hover:bg-gray-100 rounded-full transition-colors"
    >
      <CircleX class="text-pink-500" size={24} />
    </button>

    <!-- Modal Content -->
    <div class="flex flex-col md:flex-row h-full">
      <!-- Left Side -->
      <div class="md:w-4/12">
        <img
          src={gsToHttp(planData.image)}
          alt={planData.name}
          class="h-48 md:h-64 w-full object-cover"
        />
        <div class="bg-[#C0CFFF] px-6 py-8">
          <div class="mb-6">
            <p class="text-black font-medium text-xl mb-3">
              Training Type <span class="text-gray-600 text-sm">(Select one)</span>
            </p>
            <div class="flex flex-wrap gap-3 mt-3">
              {#each planData.trainingTypes.types as type}
                <button
                  class="px-6 py-2 rounded-full transition-colors
                         {selectedTrainingType === type
                           ? 'bg-pink-400 text-white'
                           : 'bg-white text-black hover:bg-gray-50'}"
                  on:click={() => (selectedTrainingType = type)}
                >
                  {type}
                </button>
              {/each}
            </div>
          </div>

          <div>
            <p class="text-black text-xl font-medium">
              Time <span class="text-gray-600 text-sm">(Select one)</span>
            </p>
            <div class="flex flex-wrap gap-3 mt-3">
              {#each planData.trainingTypes.timeSlots as time}
                <button
                  class="px-6 py-2 rounded-full transition-colors
                         {selectedTimeSlot === time
                           ? 'bg-pink-400 text-white'
                           : 'bg-white text-black hover:bg-gray-50'}"
                  on:click={() => (selectedTimeSlot = time)}
                >
                  {time}
                </button>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side -->
      <div class="md:w-8/12 p-6 md:p-8 pt-14">
        <div>
          <h2 class="text-2xl font-bold">{planData.name}</h2>
          <p class="text-gray-500 mt-2">
            {planData.description}
          </p>
        </div>

        <!-- Session Info -->
        <div class="flex flex-col md:flex-row gap-8 mt-8">
          <div>
            <h3 class="text-xl font-semibold text-pink-600 mb-3">
              Session Split
            </h3>
            <ul class="space-y-2 ml-6">
              {#each planData.sessionSplit as session}
                <li class="list-disc text-gray-700">
                  {session.title}: {session.duration}
                </li>
              {/each}
            </ul>
          </div>

          <div>
            <h3 class="text-xl font-semibold text-pink-600 mb-3">
              What do you get?
            </h3>
            <ul class="space-y-2 ml-6">
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
        <div class="grid md:grid-cols-3 gap-4 mt-8">
          {#each planData.pricing as plan}
            <div class="bg-[#F4F5FF] p-6 rounded-xl">
              <h4 class="text-purple-600 font-medium">For {plan.duration}:</h4>
              <p class="font-bold text-xl mt-1">Now ₹{plan.price}/- only</p>

              <button
                class="w-full mt-4 bg-pink-400 text-white py-3 rounded-xl 
                       hover:bg-pink-600 transition-colors
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
                on:click={() => handleClick(plan)}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : ctaButton}
              </button>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Hide scrollbar but keep functionality */
  .overflow-y-auto {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .overflow-y-auto::-webkit-scrollbar {
    display: none;
  }
</style>