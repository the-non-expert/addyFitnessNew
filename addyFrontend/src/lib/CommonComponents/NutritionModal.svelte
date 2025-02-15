<script>
  import { fade, scale } from "svelte/transition";
  import { CircleX } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { user } from "$lib/stores/userStore.js";
  import { goto } from "$app/navigation";
  import { checkoutStore } from '$lib/stores/checkoutStore';

  export let isOpen;
  export let planData;

  const dispatch = createEventDispatcher();
  let isLoading = false;
  let ctaButton = $user ? "Buy Now" : "Sign In";

  async function handleClick() {
    const checkoutData = {
      planType: 'nutrition',
      planData: {
        name: planData.name,
        description: planData.description,
        included: planData.included,
        coach: planData.coach,
        image: gsToHttp(planData.image)
      },
      pricing: {
        original: planData.pricing.original,
        discounted: planData.pricing.discounted,
        duration: planData.pricing.duration,
        tag: planData.pricing.tag
      },
      benefits: planData.benefits.features,
      planDuration: planData.planDuration
    };

    try {
      localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      checkoutStore.setPlanData(checkoutData);

      if ($user) {
        await goto("/checkout");
      } else {
        await goto("/signin");
      }
    } catch (err) {
      console.error("Error in handleClick:", err);
    }
  }

  function handleClose() {
    dispatch("close");
  }
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
          <h3 class="text-black font-medium text-xl mb-3">
            For {planData.pricing.duration}
          </h3>
          <div class="mt-4">
            <span class="line-through text-gray-600">
              Original ₹{planData.pricing.original}
            </span>
            <p class="font-bold text-2xl mt-1">
              Now ₹{planData.pricing.discounted}/- only
            </p>
            <button
              class="w-full mt-6 bg-pink-400 text-white py-3 rounded-xl 
                     hover:bg-pink-600 transition-colors
                     disabled:bg-gray-400 disabled:cursor-not-allowed"
              on:click={handleClick}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : ctaButton}
            </button>
            {#if planData.pricing.tag}
              <p class="text-sm text-gray-600 mt-2 italic text-center">
                {planData.pricing.tag}
              </p>
            {/if}
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

        <!-- Plan Duration -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold text-pink-600 mb-3">
            Plan Duration
          </h3>
          <ul class="space-y-2 ml-6">
            <li class="list-disc text-gray-700">
              {planData.planDuration.detail}
            </li>
          </ul>
        </div>

        <!-- Benefits -->
        <div class="mt-8">
          <h3 class="text-xl font-semibold text-pink-600 mb-3">
            What do you get?
          </h3>
          <ul class="space-y-2 ml-6">
            {#each planData.benefits.features as feature}
              <li class="list-disc text-gray-700">{feature}</li>
            {/each}
          </ul>
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