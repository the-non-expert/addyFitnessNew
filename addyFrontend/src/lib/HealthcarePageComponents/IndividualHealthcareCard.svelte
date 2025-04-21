<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { healthcareStore } from "$lib/stores/healthstore";
  import { goto } from "$app/navigation";


  export let individualCardData;

  const handleBooking = () => {
        healthcareStore.setServiceData(individualCardData);
        
        // If emergency, go straight to checkout
        if (individualCardData.name.toLowerCase() === 'emergency') {
          healthcareStore.setSelectedDoctor(doctor);
            goto("/checkout/healthcare");
        } else {
            // Convert service name to URL-friendly slug
            const serviceSlug = individualCardData.name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '');
            
            goto(`/healthcare/${serviceSlug}/doctors`);
        }
    };
</script>

<div class="border relative rounded-xl p-4 flex flex-col gap-5 shadow-xl">
  {#if !individualCardData.availability}
    <div
      class="absolute inset-0 backdrop-blur-[1px] bg-black/40 rounded-xl flex items-center justify-center transition-all duration-300"
    >
      <div class="text-center">
        <p
          class="text-white/90 text-4xl font-bold raleway-font tracking-widest"
        >
          Coming
        </p>
        <p
          class="text-white/80 text-lg font-bold raleway-font tracking-[0.4em] uppercase mt-1"
        >
          Soon
        </p>
      </div>
    </div>
  {/if}
  
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
      {individualCardData.description}
    </p>
  </div>
  <button
    on:click={handleBooking}
    class="py-2 rounded-xl border border-black bg-black text-white hover:bg-white hover:text-[#F41952]"
    >Book an Appointment</button
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
