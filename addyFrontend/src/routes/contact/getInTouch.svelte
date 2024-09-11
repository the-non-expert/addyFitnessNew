<script>
  import emailIcon from "$lib/Icons/emailIconBlack.svg";
  import phoneIcon from "$lib/Icons/phoneIconBlack.svg";
  import instagramIcon from "$lib/Icons/instagramIcon.svg";
  import whatsappIcon from "$lib/Icons/whatsappIcon.svg";
  import linkedInIcon from "$lib/Icons/linkedinIcon.svg";

  let socialMediaDetails = [
    {
      id: 1,
      name: "Instagram",
      iconUrl: instagramIcon,
      redirectLink: "",
    },
    {
      id: 2,
      name: "Whatsapp",
      iconUrl: whatsappIcon,
      redirectLink: "",
    },
    {
      id: 3,
      name: "LinkedIn",
      iconUrl: linkedInIcon,
      redirectLink: "",
    },
  ];
</script>

<div
  class="p-10 w-full md:w-1/2 flex flex-col gap-4 border shadow-xl rounded-xl"
>
  <p class="font-bold text-[#5e17eb] raleway-font">Get in Touch</p>
  <p class="montserrat-regular">
    We love to hear from you. Our friendly team is always here to contact with
    you
  </p>

  <div class="flex gap-2">
    <img src={emailIcon} alt="emailIcon" class="w-4" />
    <p class="font-bold text-[#5e17eb] raleway-font">Chat with Us!</p>
  </div>
  <p class="montserrat-regular">addyfitness21@gmail.com</p>

  <div class="flex gap-2">
    <img src={phoneIcon} alt="phoneIcon" class="w-4" />
    <p class="font-bold text-[#5e17eb] raleway-font">Phone</p>
  </div>
  <div class="montserrat-regular">
    <p>Mon-Fri from 8am to 5pm.</p>
    <p>( +91 ) 9861787335</p>
  </div>

  <div class="flex mt-5 gap-4">
    {#each socialMediaDetails as item (item.id)}
      <!-- svelte-ignore missing-declaration -->
      <a href={item.redirectLink}>
        <img src={item.iconUrl} alt="" class="w-6 shadow-2xl" />
      </a>
    {/each}
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
