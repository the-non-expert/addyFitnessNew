<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  import instagramIcon from "./Icons/instagramIcon.svg";
  import whatsappIcon from "./Icons/whatsappIcon.svg";
  import linkedinIcon from "./Icons/linkedinIcon.svg";
  import phoneIcon from "./Icons/phoneIcon.svg";
  import emailIcon from "./Icons/emailIcon.svg";

  let image = "gs://addyfitness-db121.appspot.com/addyFitnessMainLogo.png";

  let socialMedia = [
    {
      id: 1,
      name: "Instagram",
      redirectLink: "",
      icon: instagramIcon,
    },
    {
      id: 2,
      name: "Instagram",
      redirectLink: "",
      icon: whatsappIcon,
    },
    {
      id: 3,
      name: "Instagram",
      redirectLink: "",
      icon: linkedinIcon,
    },
  ];
</script>

<div
  class="bg-black text-white md:py-20 py-10 flex md:flex-row flex-col md:justify-evenly items-center text-center"
>
  <div class="flex flex-col items-center">
    <img src={gsToHttp(image)} alt="" class="w-56" />

    <p class="raleway-font font-bold">The Complete Healthcare Solution</p>

    <div class="flex items-center gap-2 mt-5">
      <img src={phoneIcon} alt="phoneIcon" class="w-4" />
      <p class=" montserrat-regular">+91 9861787335</p>
    </div>
    <div class="flex items-center gap-2 mt-5">
      <img src={emailIcon} alt="phoneIcon" class="w-4" />
      <p class="montserrat-regular">addyfitness21@gmail.com</p>
    </div>
    <div class="flex mt-5 gap-4">
      {#each socialMedia as item (item.id)}
        <!-- svelte-ignore missing-declaration -->
        <a href={item.redirectLink}>
          <img src={item.icon} alt="" class="w-6" />
        </a>
      {/each}
    </div>
  </div>
  <div class=" flex md:flex-row flex-col md:gap-20 gap-10 mt-10">
    <div>
      <p class="font-semibold raleway-font">COMPANY</p>
      <p class="font-light my-5 montserrat-regular">Sign Up</p>
      <p class="font-light my-5 montserrat-regular">About us</p>
      <p class="font-light my-5 montserrat-regular">Contact us</p>
      <p class="font-light my-5 montserrat-regular">Management</p>
    </div>
    <div>
      <p class="font-semibold raleway-font">SERVICES</p>
      <p class="font-light my-5 montserrat-regular">Training</p>
      <p class="font-light my-5 montserrat-regular">Nutrition</p>
      <p class="font-light my-5 montserrat-regular">Healthcare</p>
    </div>
    <div>
      <p class="font-semibold raleway-font">LEGAL</p>
      <p class="font-light my-5 montserrat-regular">Terms & Condiitons</p>
      <p class="font-light my-5 montserrat-regular">Privacy</p>
      <p class="font-light my-5 montserrat-regular">Refund & Cancellation</p>
    </div>
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
