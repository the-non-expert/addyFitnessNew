<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { user } from "$lib/stores/userStore.js";
  import { token, clearAuth } from "$lib/stores/auth.js";
  import { goto } from "$app/navigation";
  import { UserCircle } from "lucide-svelte";

  let image = "gs://addyfitness-db121.appspot.com/AddyFitnessTMlogo.png";

  let navOptions = [
    { id: 1, name: "Training", redirectUrl: "/training" },
    { id: 2, name: "Nutrition", redirectUrl: "/nutrition" },
    { id: 3, name: "Healthcare", redirectUrl: "/healthcare" },
    { id: 4, name: "Management", redirectUrl: "/management" },
    { id: 5, name: "Careers", redirectUrl: "/careers" },
    { id: 6, name: "Blogs", redirectUrl: "/" },
    { id: 7, name: "About", redirectUrl: "/about" },
    { id: 8, name: "Contact", redirectUrl: "/contact" },
  ];

  function handleAuth() {
    if ($token) {
      // User is logged in, so log them out
      // clearAuth();
      // The user store will be cleared automatically due to the subscription in userStore.js
      goto("/profile");
    } else {
      // User is not logged in, redirect to sign in page
      goto("/signin");
    }
  }
</script>

<div class="hidden md:flex items-center justify-between custom-shadow bg-white sticky top-0 z-50">
  <a href="/"
    ><img src={gsToHttp(image)} alt="" class="w-28 object-contain" /></a
  >

  <header class="flex gap-2 justify-center items-center headerOptions">
    {#each navOptions as item (item.id)}
      <a href={item.redirectUrl}>
        <p
          class="text-lg font-medium hover:bg-[#F41952] px-5 py-2 rounded-xl montserrat-regular hover:text-white"
        >
          {item.name}
        </p>
      </a>
    {/each}

    <!-- {#if $user}<a href="/profile">
        <button
          class="p-2 hover:text-[#5e17eb] transition-colors"
          aria-label="Profile"
        >
          <UserCircle size={28} />
        </button></a
      >
    {/if} -->
  </header>
  <button
    on:click={handleAuth}
    class="bg-black text-white m-5 px-7 py-2 rounded-xl cursor-pointer"
  >
    {$user ? "Go to Profile" : "Sign In"}
  </button>
</div>

<style>
  .montserrat-regular {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  /* Option 1: Subtle and modern */
  /* .custom-shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  } */

  /* Option 2: Soft and elegant */
  .custom-shadow {
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.06);
  }

  /* Option 3: Minimal with depth */
  /* .custom-shadow {
    box-shadow: 0 2px 10px rgba(17, 17, 26, 0.05);
  } */

  /* Option 4: Premium feel */
  /* .custom-shadow {
    box-shadow: 0 2px 15px rgba(30, 30, 30, 0.03);
  } */
</style>
