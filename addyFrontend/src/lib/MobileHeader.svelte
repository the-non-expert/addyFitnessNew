<!-- MobileHeader.svelte -->
<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { onMount, onDestroy } from "svelte";
  import { user } from "$lib/stores/userStore.js";
  import { token, clearAuth } from "$lib/stores/auth.js";
  import { goto } from "$app/navigation";
  import { UserCircle } from "lucide-svelte";
  import { browser } from "$app/environment";

  let logo = "gs://addyfitness-db121.appspot.com/addyFitnessMainLogo.png";
  let isMenuOpen = false;
  let initialRender = true;

  const navOptions = [
    { id: 1, name: "Training", redirectUrl: "/training" },
    { id: 2, name: "Nutrition", redirectUrl: "/nutrition" },
    { id: 3, name: "Healthcare", redirectUrl: "/healthcare" },
    { id: 4, name: "Management", redirectUrl: "/management" },
    { id: 5, name: "About", redirectUrl: "/about" },
    { id: 6, name: "Contact", redirectUrl: "/contact" },
  ];

  function handleAuth() {
    if ($token) {
      clearAuth();
      goto("/");
    } else {
      goto("/signin");
    }
  }

  // Close menu if screen is resized to desktop size
  function handleResize() {
    if (browser) {
      if (window.innerWidth >= 768 && isMenuOpen) {
        toggleMenu();
      }
    }
  }

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    toggleBodyScroll(!isMenuOpen);
  }

  function toggleBodyScroll(enable) {
    if (browser) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = enable ? "auto" : "hidden";
      document.body.style.paddingRight = enable ? "0" : `${scrollbarWidth}px`;
    }
  }

  function handleClickOutside(event) {
    const target = event.target;
    if (isMenuOpen && !target.closest("nav") && !target.closest("button")) {
      toggleMenu();
    }
  }

  // Handle navigation
  async function handleNavigation(redirectUrl) {
    toggleMenu();
    await goto(redirectUrl);
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("resize", handleResize);
      initialRender = false;
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("resize", handleResize);
      if (isMenuOpen) {
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0";
      }
    }
  });
</script>

<svelte:window on:click={handleClickOutside} />

<!-- Fixed Header -->
<header
  class="flex md:hidden justify-between items-center p-5 fixed top-0 w-full bg-white z-50 border-b border-gray-200 shadow-sm"
>
  <div class="logo">
    <a href="/" class="block">
      <img src={gsToHttp(logo)} alt="Logo" class="w-36 h-auto object-contain" />
    </a>
  </div>

  <!-- Hamburger Button -->
  <button
    class="relative z-50 flex flex-col items-center justify-center w-8 h-8 focus:outline-none"
    on:click|stopPropagation={toggleMenu}
    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    aria-expanded={isMenuOpen}
  >
    X
  </button>

  <!-- Mobile Navigation Menu -->
  {#if isMenuOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <nav
      class="fixed inset-0 bg-white transform transition-transform duration-300 ease-in-out pt-20"
      class:translate-x-0={isMenuOpen}
      class:translate-x-full={!isMenuOpen}
      on:click|stopPropagation
    >
      <div
        class="flex flex-col items-center justify-start h-full overflow-y-auto"
      >
        {#each navOptions as link (link.id)}
          <a
            href={link.redirectUrl}
            class="w-full text-center text-xl py-4 hover:bg-gray-50 transition-colors duration-200"
            on:click|preventDefault={() => handleNavigation(link.redirectUrl)}
          >
            {link.name}
          </a>
        {/each}

        <!-- Profile Section -->
        {#if $user}
          <a
            href="/profile"
            class="w-full text-center py-4 mt-4 flex items-center justify-center gap-2 hover:bg-gray-50"
            on:click|preventDefault={() => handleNavigation("/profile")}
          >
            <UserCircle size={24} />
            <span>Profile</span>
          </a>
        {/if}

        <!-- Auth Button -->
        <button
          on:click={handleAuth}
          class="mt-6 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors duration-200"
        >
          {$user ? "Sign Out" : "Sign In"}
        </button>
      </div>
    </nav>
  {/if}
</header>

<!-- Spacer for fixed header -->
<div class="h-[72px] md:hidden" />

<style lang="postcss">
  /* Smooth transitions for menu */
  nav {
    transition: transform 0.3s ease-in-out;
    -webkit-overflow-scrolling: touch;
  }

  /* Smooth transitions for body padding */
  :global(body) {
    transition: padding-right 0.3s ease;
  }

  /* Add active state for nav items */
  a:active {
    @apply bg-gray-100;
  }

  /* Improve touch feedback */
  button:active {
    @apply opacity-80;
  }
</style>
