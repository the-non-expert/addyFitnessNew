<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import googleIcon from "$lib/Icons/googleIcon.svg";

  let logo = "gs://addyfitness-db121.appspot.com/addyFitnessMainLogo.png";

  let sectionImage = "gs://addyfitness-db121.appspot.com/whyChooseUs2.gif";

  let showPassword = false;
  let passwordInput = null;
  let emailInput = null;

  // Reactive statement to check if inputs are empty
  $: isDisabled = !(emailInput && passwordInput);

  function togglePasswordVisibility() {
    showPassword = !showPassword;
    // passwordInput.type = showPassword ? "text" : "password";
  }

  function loginSubmission() {
    console.log("clicking the login button");
  }
</script>

<div class="w-full flex">
  <div class="p-10 w-1/2">
    <a href="/signin"><img src={gsToHttp(logo)} alt="" class="w-56" /></a>

    <p
      class="text-[#5E17EB] josefin-sans mt-10 text-center md:text-8xl text-2xl font-bold"
    >
      Hi there!
    </p>
    <p class="text-center raleway-font text-xl font-semibold">
      Welcome to Addy Fitness - The Complete Health Solution
    </p>

    <!-- log in with google button  -->
    <div class="w-full flex flex-col items-center mt-8">
      <button
        class="px-28 py-4 flex justify-center items-center gap-3 raleway-font border-2 rounded-xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        on:click={() => {}}
      >
        <img src={googleIcon} alt="Google Icon" class="w-6 h-6" />
        Log in with Google
      </button>
    </div>

    <!-- or seprator  -->
    <div class="flex items-center m-5">
      <div class="flex-grow border-t" />
      <span class="mx-4 raleway-font">or</span>
      <div class="flex-grow border-t" />
    </div>

    <!-- Login Input Fields Section -->
    <div class="w-full flex flex-col gap-4 justify-center items-center">
      <!-- Username Input -->
      <input
        type="email"
        placeholder="Your Email"
        class="w-10/12 p-3 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500"
        bind:value={emailInput}
      />

      <!-- Password Input with Show Password Button -->
      <div class="relative w-10/12">
        {#if showPassword}
          <input
            type="text"
            placeholder="Password"
            class="w-full p-3 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500"
            bind:value={passwordInput}
          />
        {:else}
          <input
            type="password"
            placeholder="Password"
            class="w-full p-3 border border-gray-600 rounded-xl focus:outline-none focus:border-blue-500"
            bind:value={passwordInput}
          />
        {/if}
        <button
          type="button"
          class="absolute inset-y-0 right-0 px-3 text-sm font-semibold hover:text-[#5E17EB]"
          on:click={togglePasswordVisibility}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <!-- Forgot Password Text -->
      <div class="">
        <a href="/forgot-password" class="text-blue-600 hover:underline">
          Forgot Password?
        </a>
      </div>

      <button
        class="w-10/12 p-3 font-bold bg-black text-white rounded-3xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        on:click={loginSubmission}
        disabled={isDisabled}
      >
        Log In
      </button>
    </div>

    <div class="text-center mt-9">
      Don't have an account?

      <a href="/signup">
        <span
          class="font-semibold cursor-pointer hover:underline hover:underline-offset-2"
          >Sign up?</span
        ></a
      >
    </div>
  </div>
  <div class="w-1/2 h-screen">
    <img src={gsToHttp(sectionImage)} alt="" class="h-full object-cover" />
  </div>
</div>

<style>
  .baskervville-sc-regular {
    font-family: "Baskervville SC", serif;
    font-weight: 400;
    font-style: normal;
  }

  .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  .josefin-sans {
    font-family: "Josefin Sans", sans-serif;
    font-optical-sizing: auto;
  }
</style>
