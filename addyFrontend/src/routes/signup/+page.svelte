<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import googleIcon from "$lib/Icons/googleIcon.svg";

  let logo = "gs://addyfitness-db121.appspot.com/addyFitnessMainLogo.png";

  let sectionImage = "gs://addyfitness-db121.appspot.com/whyChooseUs2.gif";

  let showPassword = false;
  let passwordInput = null;
  let emailInput = null;

  function PasswordVisibility() {
    showPassword = !showPassword;
  }

  function signupSubmission() {
    console.log("sign up done");
  }
</script>

<div class="w-full flex gap-10">
  <div class="md:w-6/12 h-screen overflow-hidden p-3">
    <img
      src={gsToHttp(sectionImage)}
      alt="signHero"
      class="h-full w-full object-cover rounded-xl"
    />
  </div>

  <div class="md:w-6/12 flex flex-col justify-">
    <div class="flex flex-col items-center">
      <img src={gsToHttp(logo)} alt="Icon" class="w-5/12 mt-10" />
      <p class="text-left text-5xl mt-5">Create an account</p>
      <p class="mt-3 font-thin text-gray-400">
        Already have an account?
        <a href="/login">
          <span class="text-blue-400 cursor-pointer font-medium underline"
            >Log in</span
          ></a
        >
      </p>
    </div>

    <div class="w-full flex flex-col gap-4 items-center mt-5">
      <!-- Email Input -->
      <input
        type="email"
        placeholder="Email"
        class="w-10/12 p-3 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        bind:value={emailInput}
      />

      <!-- Password Input with Show Password Button -->
      <div class="relative w-10/12">
        {#if showPassword}
          <input
            type="text"
            placeholder="Password"
            class="w-full p-3 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            bind:value={passwordInput}
          />
        {:else}
          <input
            type="password"
            placeholder="Password"
            class="w-full p-3 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            bind:value={passwordInput}
          />
        {/if}
        <button
          type="button"
          class="absolute inset-y-0 right-0 px-3 text-sm text-gray-400"
          on:click={PasswordVisibility}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button
        class="w-9/12 p-3 font-bold bg-black text-white rounded-3xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        on:click={signupSubmission}
      >
        Start your Journey
      </button>
    </div>

    <div class="flex items-center mt-5">
      <div class="flex-grow mx-6 border-t"></div>
      <span class="mx-4">Or</span>
      <div class="flex-grow mx-6 border-t"></div>
    </div>

    <div class="w-full flex flex-col items-center mt-8">
      <button
        class="w-9/12 p-3 flex justify-center items-center gap-3 font-bold text-black rounded-3xl cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
        on:click={signupSubmission}
      >
        <img src={googleIcon} alt="Google Icon" class="w-6 h-6" />
        Sign up With Google
      </button>
    </div>
  </div>
</div>
