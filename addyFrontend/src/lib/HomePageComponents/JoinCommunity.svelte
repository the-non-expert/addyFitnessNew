<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  let communityImage = "gs://addyfitness-db121.appspot.com/CommunityHome.gif";
</script>

<section class="relative w-full bg-[#F41952] overflow-hidden py-20 px-4">
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

        <div class="flex flex-wrap gap-4">
          <a href="https://wa.me/9861208460" target="_blank" rel="noopener noreferrer">
            <button
              class="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-[#28D144] hover:text-black transition-colors flex items-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </button>
          </a>
        </div>
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
