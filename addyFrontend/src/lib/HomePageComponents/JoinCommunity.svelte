<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  let communityImage = "gs://addyfitness-db121.appspot.com/communityNew.png";
</script>

<section class="relative w-full bg-[#7F56D9] overflow-hidden py-20 px-4">
  <!-- Decorative circles -->
  <!-- <div class="absolute inset-0 pointer-events-none">
    <div
      class="absolute -top-20 -left-20 z-index-0 w-64 h-64 border-2 border-dashed border-purple-400 rounded-full opacity-20"
    ></div>
    <div
      class="absolute -bottom-32 -right-32 w-96 h-96 border-2 border-dotted border-purple-400 rounded-full opacity-20"
    ></div>
  </div> -->

  <div class="max-w-6xl mx-auto">
    <div
      class="flex flex-col-reverse md:flex-row items-center justify-between gap-12"
    >
      <!-- Left side - Content -->
      <div class="w-full md:w-1/2 relative z-10">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-6 max-w-md">
          Are you ready to take control of your fitness journey? At Addy
          Fitness, we'll help you get there.
        </h2>
        <button
          class="bg-white text-[#7F56D9] px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
        >
          Connect to Us
        </button>
      </div>

      <!-- Right side - Image -->
      <div class="w-full md:w-1/2 flex justify-end">
        <div class="bg-white rounded-3xl p-6 w-full max-w-md">
          <img
            src={gsToHttp(communityImage)}
            alt="Join our fitness community"
            class="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Optional: Add animation to the circles */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .border-dashed {
    animation: rotate 60s linear infinite;
  }

  .border-dotted {
    animation: rotate 80s linear infinite reverse;
  }
</style>
