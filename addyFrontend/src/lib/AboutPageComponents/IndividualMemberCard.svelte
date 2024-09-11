<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  import linkedin from "$lib/Icons/linkedinIconMember.svg";
  import email from "$lib/Icons/emailIconMember.svg";

  export let data;
</script>

<div class="border shadow-md p-5 rounded-xl">
  <p class="font-bold raleway-font text-lg">{data.name}</p>
  <p class="montserrat-regular text-gray-700 text-sm">{data.designation}</p>
  <p class="montserrat-regular text-gray-700 text-sm">{data.qualifications}</p>

  <div class="h-96">
    <img
      src={gsToHttp(data.image)}
      alt=""
      class="rounded-xl mt-2 w-full h-full object-cover"
    />
  </div>

  <div class="flex gap-5 justify-center items-center mt-5">
    <img src={linkedin} alt="" class="w-6" />
    <img src={email} alt="" class="w-6" />
  </div>
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
