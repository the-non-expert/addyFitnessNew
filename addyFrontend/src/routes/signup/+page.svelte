<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import googleIcon from "$lib/Icons/googleIcon.svg";
  import { post } from "$lib/api";
  import { setAuth } from "$lib/stores/auth";
  import { user } from "$lib/stores/userStore.js";
  import { goto } from "$app/navigation";

  const logo = "gs://addyfitness-db121.appspot.com/LOGO RED.png";

  // Form state
  let showPassword = false;
  let email = "";
  let password = "";
  let isSubmitting = false;
  let error = null;

  // Validation states
  let emailError = "";
  let passwordError = "";
  let isValid = false;

  function PasswordVisibility() {
    showPassword = !showPassword;
  }

  // Email validation
  function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      // emailError = "Email is required";
      return false;
    }
    if (!emailRegex.test(value)) {
      emailError = "Please enter a valid email address";
      return false;
    }
    emailError = "";
    return true;
  }

  // Password validation
  function validatePassword(value) {
    if (!value){
      return
    }
    if (value.length < 8) {
      passwordError = "Password must be at least 8 characters long";
      return false;
    }
    if (!/[A-Z]/.test(value)) {
      passwordError = "Password must contain at least one uppercase letter";
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      passwordError = "Password must contain at least one special character";
      return false;
    }
    passwordError = "";
    return true;
  }

  // Validate form on input
  $: {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    isValid = isEmailValid && isPasswordValid;
  }

  async function handleSignup() {
    if (!isValid || isSubmitting) return;

    isSubmitting = true;
    error = null;

    try {
      const registerResponse = await post("/auth/register", {
        email,
        password,
      });

      const formData = new URLSearchParams({
        username: email,
        password,
      });

      const loginResponse = await post("/auth/login", formData, null, true);

      if (!loginResponse.access_token) {
        throw new Error("Login failed");
      }

      setAuth(loginResponse.access_token, null);
      user.setUser({ email });
      goto("/");
    } catch (err) {
      error =
        err instanceof Error ? err.message : "An error occurred during signup";
    } finally {
      isSubmitting = false;
    }
  }
</script>

<div class="min-h-screen bg-gray-50">
  <!-- Decorative elements -->
  <div class="fixed inset-0 overflow-hidden pointer-events-none">
    <div
      class="absolute w-1/2 h-screen bg-gradient-to-br from-[#F41A53]/5 to-transparent"
    ></div>
    <div
      class="absolute right-0 w-1/2 h-screen bg-gradient-to-bl from-[#F41A53]/5 to-transparent"
    ></div>
  </div>

  <div
    class="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8"
  >
    <!-- Logo Section -->
    <div
      class="mb-12 transform hover:scale-105 transition-transform duration-300"
    >
      <img src={gsToHttp(logo)} alt="AddyFitness Logo" class="h-16 md:h-40" />
    </div>

    <!-- Main Card -->
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-8">
      <!-- Header -->
      <div class="space-y-2">
        <h1 class="text-2xl font-semibold text-gray-900">
          Create your account
        </h1>
        <p class="text-gray-600">
          Already have an account?
          <a
            href="/signin"
            class="text-[#F41A53] hover:text-[#F41A53]/80 font-medium transition-colors duration-200"
          >
            Sign in
          </a>
        </p>
      </div>

      <!-- Error Message -->
      {#if error}
        <div class="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
          <p class="text-sm text-red-700">{error}</p>
        </div>
      {/if}

      <!-- Form -->
      <form class="space-y-6" on:submit|preventDefault={handleSignup}>
        <!-- Email Input -->
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Email address
          </label>
          <div class="relative">
            <input
              type="email"
              id="email"
              bind:value={email}
              class="outline-none w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     focus:bg-white focus:ring-1 focus:ring-[#F41A53] focus:border-[#F41A53]
                     transition-all duration-200 {emailError
                ? 'border-red-500'
                : ''}"
              placeholder="you@example.com"
            />
            {#if emailError}
              <p class="mt-1 text-sm text-red-600">{emailError}</p>
            {/if}
          </div>
        </div>

        <!-- Password Input -->
        <div>
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <div class="relative">
            {#if showPassword}
              <input
                type="text"
                placeholder="Password"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     focus:bg-white focus:ring-2 focus:ring-[#F41A53] focus:border-[#F41A53]
                     transition-all duration-200 {passwordError ? 'border-red-500' : ''}"
                bind:value={password}
              />
            {:else}
              <input
                type="password"
                placeholder="Password"
                class="outline-none w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg
                     focus:bg-white focus:ring-1 focus:ring-[#F41A53] focus:border-[#F41A53]
                     transition-all duration-200 {passwordError ? 'border-red-500' : ''}"
                bind:value={password}
              />
            {/if}
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500
                     hover:text-[#F41A53] transition-colors duration-200"
              on:click={PasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {#if passwordError}
              <p class="mt-1 text-sm text-red-600">{passwordError}</p>
            {/if}
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          disabled={!isValid || isSubmitting}
          class="w-full py-3 px-4 bg-[#F41A53] text-white font-medium rounded-lg
                 hover:bg-[#F41A53]/90 focus:ring-4 focus:ring-[#F41A53]/30
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors duration-200"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <!-- Google Sign In -->
        <button
          type="button"
          class="w-full flex items-center justify-center gap-3 px-4 py-3
                 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium
                 hover:bg-gray-50 focus:ring-4 focus:ring-gray-100
                 transition-colors duration-200"
        >
          <img src={googleIcon} alt="Google" class="w-5 h-5" />
          Sign up with Google
        </button>
      </form>
    </div>
  </div>
</div>

<style>
  :global(body) {
    background-color: #f9fafb;
  }
</style>
