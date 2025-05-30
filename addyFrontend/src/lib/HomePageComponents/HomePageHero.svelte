<script>
  import { fly } from "svelte/transition";
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  let homeHeroImage = "gs://addyfitness-db121.appspot.com/homeheroImage.png";
  let homeHeroVid = "gs://addyfitness-db121.appspot.com/homePageNewVideo.mp4";
  let isVideoLoaded = false;

  function handleVideoLoad() {
    isVideoLoaded = true;
  }
</script>

<div class="relative w-full">
  <!-- Top half background -->
  <div class="absolute top-0 left-0 w-full h-[65%] bg-slate-900 bg-grid" />
  <!-- Bottom half background -->
  <div class="absolute bottom-0 left-0 w-full h-[35%] bg-white" />

  <!-- Content -->
  <section
    class="relative w-full min-h-[600px] flex items-center justify-center px-4 py-10"
  >
    <div class="max-w-4xl mx-auto text-center">
      <div class="space-y-2">
        <div class="space-y-6">
          <!-- Small text at top -->
          <p class="text-gray-400 text-sm">
            Take your health to the next level 🚀
          </p>

          <!-- Main heading -->
          <h1 class="raleway-font text-4xl md:text-5xl font-bold text-white">
            Your Personalized<br />
            Path to Wellness
          </h1>

          <!-- Description -->
          <p class="text-gray-300 max-w-2xl mx-auto text-xl inter-font">
            At Addy Fitness, we believe that fitness is more than just a routine
            – it's a lifestyle. Our team of expert trainers is here to create
            personalized fitness and nutrition plans that fit your unique needs
          </p>

          <!-- Metrics -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div
              class="bg-[#F41952] text-white px-6 py-3 rounded-full flex items-center justify-center gap-2"
              transition:fly={{ y: 20, duration: 600 }}
            >
              <span>100+ Members joined</span>
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13.5 2L4 14H12L10.5 22L20 10H12L13.5 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div
              class="bg-white text-slate-900 px-6 py-3 rounded-full flex items-center justify-center gap-2"
              transition:fly={{ y: 20, duration: 800 }}
            >
              <span>30+ Fitness Programs</span>
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13.5 2L4 14H12L10.5 22L20 10H12L13.5 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Illustration -->
        <div class="items-center justify-center">
          <div class="relative mt-20 mx-auto max-w-lg w-full aspect-video">
            {#if !isVideoLoaded}
              <div
                class="absolute top-0 left-0 w-full h-full rounded-xl bg-gray-100 animate-pulse"
              ></div>
            {/if}
            <video
              src={gsToHttp(homeHeroVid)}
              class="absolute top-0 left-0 w-full h-full rounded-xl object-cover"
              autoplay
              muted
              loop
              playsinline
              preload="auto"
              on:loadeddata={handleVideoLoad}
            ></video>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  .inter-font {
    font-family: "Inter", serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  .bg-grid {
    background-size: 15px 15px;
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.05) 1px,
        transparent 1px
      ),
      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    filter: blur(0.5px);
  }
</style>
