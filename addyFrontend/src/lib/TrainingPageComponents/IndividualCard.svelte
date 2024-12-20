<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let individualCardData;
</script>

<div
  class="border border-black rounded-xl p-2 flex flex-col gap-5 shadow shadow-[#5e17eb]"
>
  <div class="">
    <img
      src={gsToHttp(individualCardData.image)}
      alt=""
      class="w-full h-full object-contain rounded-xl"
    />
  </div>
  <div class=" text-center">
    <p class="text-2xl font-bold text-[#5e17eb] raleway-font">
      {individualCardData.name}
    </p>
    <!-- <p class="raleway-font">With {individualCardData.coach}</p> -->

    <p class="mt-2 montserrat-regular">
      {individualCardData.sessions} sessions a week |
      <span>{individualCardData.duration} per session</span>
    </p>
  </div>
  <button
    class="py-2 rounded-xl border border-black bg-black text-white hover:bg-white hover:text-black"
    on:click={() => dispatch("planClick", individualCardData)}>See Plans</button
  >
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
