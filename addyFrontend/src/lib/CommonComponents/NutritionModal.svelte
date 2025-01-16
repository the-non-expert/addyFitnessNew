<script>
  import { fade, scale } from "svelte/transition";
  import { X, CircleX } from "lucide-svelte";
  import { createEventDispatcher } from "svelte";
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  export let isOpen;
  export let planData;

  const dispatch = createEventDispatcher();

  function handleClose() {
    dispatch("close");
  }
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black/90 overflow-hidden z-40"
    on:click={handleClose}
    transition:fade
  />

  <div
    class="fixed md:flex inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
               bg-white rounded-2xl z-50 max-w-7xl w-full max-h-[90vh] overflow-y-auto"
    transition:scale
  >
    <!-- Left Side -->
    <div class="md:w-4/12 md:h-[500px]">
      <img
        src={gsToHttp(planData.image)}
        alt={planData.name}
        class="h-1/2 w-full object-cover"
      />
      <div class="bg-[#F4F5FF] px-6 py-10 h-1/2">
        <h3 class="text-[#F41A53] text-xl font-medium mb-2">
          For {planData.pricing.duration}
        </h3>
        <div class="mt-4">
          <span class="line-through text-gray-500"
            >Original ₹{planData.pricing.original}</span
          >
          <p class="font-bold text-2xl mt-1">
            Now ₹{planData.pricing.discounted}/- only
          </p>
          <button
            class="w-full mt-6 bg-[#F41A53]/80 text-white py-3 rounded-xl hover:bg-[#F41A53] transition-colors"
          >
            Buy Now
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
    <div class="md:w-8/12 px-5 py-10">
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
          <CircleX class="text-purple-500" size={24} />
        </button>
      </div>

      <!-- Plan Duration -->
      <div class="mt-8">
        <h3 class="text-xl font-semibold text-[#F41A53]">Plan Duration</h3>
        <ul class="space-y-2 ml-7 mt-2">
          <li class="list-disc text-gray-700">
            {planData.planDuration.detail}
          </li>
        </ul>
      </div>

      <!-- What do you get? -->
      <div class="mt-8">
        <h3 class="text-xl font-semibold text-[#F41A53]">What you get ?</h3>
        <ul class="space-y-2 ml-7 mt-2">
          {#each planData.benefits.features as feature}
            <li class="list-disc text-gray-700">{feature}</li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
{/if}
