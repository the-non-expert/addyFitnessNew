<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let individualCardData;

  console.log();
</script>

<div
  class="border rounded-xl p-4 flex flex-col gap-5 shadow-xl"
>
  <div class="">
    <img
      src={gsToHttp(individualCardData.image)}
      alt=""
      class="w-full h-96 object-cover rounded-xl"
    />
  </div>
  <div class=" text-center">
    <p class="text-2xl font-bold text-[#F41952] raleway-font">
      {individualCardData.name}
    </p>
    <!-- <p class="raleway-font">With {individualCardData.coach}</p> -->

    <p class="mt-2 montserrat-regular">
      {individualCardData.included}
    </p>
  </div>
  <button
    class="py-2 rounded-xl border border-black bg-black text-white hover:bg-white hover:text-[#F41952]"
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
