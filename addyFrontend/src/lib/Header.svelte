<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { user } from "$lib/stores/userStore.js";
  import { token, clearAuth } from "$lib/stores/auth.js";
  import { goto } from "$app/navigation";

  let image = "gs://addyfitness-db121.appspot.com/addyFitnessMainLogo.png";

  let navOptions = [
    { id: 1, name: "Training", redirectUrl: "/training" },
    { id: 2, name: "Nutrition", redirectUrl: "/nutrition" },
    { id: 3, name: "Healthcare", redirectUrl: "/healthcare" },
    { id: 4, name: "Management", redirectUrl: "/management" },
    { id: 5, name: "About", redirectUrl: "/about" },
    { id: 6, name: "Contact", redirectUrl: "/contact" },
  ];

  function handleAuth() {
    if ($token) {
      // User is logged in, so log them out
      clearAuth();
      // The user store will be cleared automatically due to the subscription in userStore.js
      goto("/");
    } else {
      // User is not logged in, redirect to sign in page
      goto("/signin");
    }
  }
</script>

<div class="hidden md:flex items-center justify-evenly mt-5 mb-5">
  <a href="/"><img src={gsToHttp(image)} alt="" class="w-56" /></a>

  <header class="flex gap-8 justify-center items-center headerOptions">
    {#each navOptions as item (item.id)}
      <a href={item.redirectUrl}>
        <p class="text-lg font-medium montserrat-regular hover:text-[#5e17eb]">
          {item.name}
        </p>
      </a>
    {/each}

    <button on:click={handleAuth} class="bg-black text-white px-5 py-2 rounded">
      {$user ? "Sign Out" : "Sign In"}
    </button>
  </header>
</div>

<style>
  .montserrat-regular {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
