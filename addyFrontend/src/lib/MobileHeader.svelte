<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  let logo = "gs://addyfitness-db121.appspot.com/addyFitnessMainLogo.png";

  let navOptions = [
    { id: 1, name: "Training", redirectUrl: "/training" },
    { id: 2, name: "Nutrition", redirectUrl: "/nutrition" },
    { id: 3, name: "Healthcare", redirectUrl: "/healthcare" },
    { id: 4, name: "Management", redirectUrl: "/management" },
    { id: 5, name: "Portfolio", redirectUrl: "/" },
  ];

  let isMenuOpen = false;

  // Function to disable/enable scrolling
  // @ts-ignore
  function toggleBodyScroll(enable) {
    if (enable) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }
</script>

<header class="flex md:hidden justify-between items-center p-5">
  <div class="logo">
    <a href="/"><img src={gsToHttp(logo)} alt="Logo" class="w-36" /></a>
  </div>
  <button
    class="flex flex-col items-center space-y-3"
    on:click={() => {
      isMenuOpen = !isMenuOpen;
      toggleBodyScroll(!isMenuOpen);
    }}
  >
    <span class="block w-8 h-0.5 bg-black"></span>
    <span class="block w-8 h-0.5 bg-black"></span>
  </button>

  {#if isMenuOpen}
    <nav
      class="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center"
    >
      {#each navOptions as link}
        <a
          href={link.href}
          class="text-2xl py-2"
          on:click={() => {
            isMenuOpen = !isMenuOpen;
            toggleBodyScroll(!isMenuOpen);
          }}>{link.name}</a
        >
      {/each}

      <button
        on:click={() => {
          isMenuOpen = !isMenuOpen;
          toggleBodyScroll(!isMenuOpen);
        }}
        class="mt-5 font-bold"
      >
        X
      </button>
    </nav>
  {/if}
</header>
