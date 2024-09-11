<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  export let individualCardData;

  console.log();
</script>

<div
  class="border border-black rounded-xl p-2 flex flex-col gap-5 shadow shadow-[#5e17eb]"
>
  <div class="">
    <img
      src={gsToHttp(individualCardData.image)}
      alt=""
      class="w-full h-96 object-cover rounded-xl"
    />
  </div>
  <div class=" text-center">
    <p class="text-2xl font-bold text-[#5e17eb] raleway-font">
      {individualCardData.name}
    </p>
    <!-- <p class="raleway-font">With {individualCardData.coach}</p> -->

    <p class="mt-2 montserrat-regular">
      {individualCardData.description}
    </p>
  </div>
  <button
    class="py-2 rounded-xl border border-black bg-black text-white hover:bg-white hover:text-black"
    >Contact Us for More Information</button
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
