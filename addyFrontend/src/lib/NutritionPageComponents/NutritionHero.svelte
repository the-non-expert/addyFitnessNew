<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  let nutritionHeroImage =
    "gs://addyfitness-db121.appspot.com/nutritionHero.jpeg";
  let searchQuery = "";
</script>

<div class="w-full bg-[#E5E9FF]">
  <!-- Hero Section -->
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex flex-col-reverse md:flex-row items-center">
      <!-- Left Content - 40% -->
      <div class="w-full md:w-[40%] mt-8 md:mt-0 md:pr-8">
        <!-- Discount Tag -->
        <span
          class="inline-block px-4 py-1 bg-black text-white text-sm rounded-full mb-4"
        >
          Discount
        </span>

        <!-- Hero Content -->
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Ramadhan Sale Offer
        </h1>
        <p class="w-8/12 text-gray-800 text-lg font-bold">
          Get 40% off for the first transaction on Lalasia
        </p>
      </div>

      <!-- Right Image - 60% -->
      <div class="w-full md:w-[60%]">
        <img
          src={gsToHttp(nutritionHeroImage)}
          alt="Training illustration"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>

  <!-- Search Section -->
  <div class="w-full bg-white py-16 px-4">
    <div class="max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-bold text-slate-900 mb-4">Nutrition</h2>
      <p class="text-gray-600 mb-8 max-w-2xl mx-auto">
        Search for your Nutrition Chart
      </p>

      <!-- Search Bar -->
      <div class="relative flex items-center max-w-2xl mx-auto">
        <div class="absolute left-4 text-gray-400">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search for training programs"
          class="w-full py-4 pl-12 pr-32 rounded-full border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 outline-none text-gray-600 text-base"
        />

        <button
          class="absolute right-2 bg-[#7F56D9] text-white px-8 py-2.5 rounded-full hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
        >
          Find Now
        </button>
      </div>
    </div>
  </div>
</div>

<style>
  /* Optional: Add smooth transition for search input */
  input {
    transition: all 0.2s ease-in-out;
  }

  input:hover {
    border-color: #e9d5ff;
  }
</style>
