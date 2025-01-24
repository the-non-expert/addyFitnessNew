<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let individualCardData;
</script>

<div
  class="relative border rounded-xl p-4 flex flex-col gap-5 shadow-xl"
>
  {#if !individualCardData.availability}
    <div
      class="absolute inset-0 backdrop-blur-[2px] bg-black/40 rounded-xl flex items-center justify-center transition-all duration-300"
    >
      <div class="text-center">
        <p
          class="text-white/90 text-4xl font-bold raleway-font tracking-widest"
        >
          Warming
        </p>
        <p
          class="text-white/80 text-lg font-bold raleway-font tracking-[0.4em] uppercase mt-1"
        >
          Up
        </p>
      </div>
    </div>
  {/if}
  <img
    src={gsToHttp(individualCardData.image)}
    alt=""
    class="w-full h-full object-contain rounded-xl"
  />
  <div class="text-center">
    <p class="text-2xl font-bold text-[#F41952] raleway-font">
      {individualCardData.name}
    </p>
    <p class="mt-2 montserrat-regular">
      {individualCardData.sessions} sessions a week |
      <span>{individualCardData.duration} per session</span>
    </p>
  </div>
  <button
    class="py-2 rounded-xl border border-black bg-black text-white hover:bg-white hover:text-[#F41952]"
    on:click={() => dispatch("planClick", individualCardData)}
    disabled={!individualCardData.availability}
  >
    See Plans
  </button>
</div>

<style>
  .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  .montserrat-regular {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
