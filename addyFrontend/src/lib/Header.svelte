<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  let image = "gs://addyfitness-db121.appspot.com/addyFitnessMainLogo.png";

  let navOptions = [
    { id: 1, name: "Training", redirectUrl: "/training" },
    { id: 2, name: "Nutrition", redirectUrl: "/nutrition" },
    { id: 3, name: "Healthcare", redirectUrl: "/healthcare" },
    { id: 4, name: "Management", redirectUrl: "/management" },
    { id: 5, name: "Portfolio", redirectUrl: "/" },
  ];
</script>

<div class="hidden md:flex items-center justify-evenly mt-8">
  <a href="/"><img src={gsToHttp(image)} alt="" class="w-56" /></a>

  <header class="flex gap-8 justify-center items-center headerOptions">
    {#each navOptions as item (item.id)}
      <a href={item.redirectUrl}>
        <p class="text-lg font-medium montserrat-regular hover:text-[#5e17eb]">
          {item.name}
        </p>
      </a>
    {/each}

    <button class="bg-black text-white px-5 py-2 rounded">Sign Up</button>
  </header>
</div>

<style>
  .montserrat-regular {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
