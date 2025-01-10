<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { onMount, onDestroy } from "svelte";

  export let cards;

  let currentIndex = 0;
  let intervalId;
  let carouselTrack;

  onMount(() => {
    startAutoSlide();
  });

  onDestroy(() => {
    if (intervalId) clearInterval(intervalId);
  });

  function startAutoSlide() {
    intervalId = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlidePosition();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlidePosition();

    // Reset timer when manually changing slides
    if (intervalId) clearInterval(intervalId);
    startAutoSlide();
  }

  function updateSlidePosition() {
    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }
</script>

<!-- Mobile Section -->
<section class="w-full bg-slate-900 px-4 py-16 block md:hidden">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-white mb-4 raleway-font">
        Transform Your Body, Elevate Your Life
      </h2>
      <p class="text-gray-400 baskervville-sc-regular">
        Using basic data skills you can analysis and improve your business
        indicators with Around
      </p>
    </div>

    <!-- Carousel Container -->
    <div class="carousel-container w-full overflow-hidden relative">
      <div
        bind:this={carouselTrack}
        class="carousel-track flex transition-transform duration-500"
      >
        {#each cards as card (card.id)}
          <div class="min-w-full px-4">
            <div class="bg-white rounded-3xl p-8">
              <div class={`${card.bgColor} rounded-2xl`}>
                <img
                  src={gsToHttp(card.image)}
                  alt={card.title}
                  class="w-full h-48 object-cover rounded-2xl"
                />
              </div>
              <div class="flex flex-col mt-4">
                <h3 class="text-xl font-bold mb-3 raleway-font">
                  {card.title}
                </h3>
                <p class="text-gray-600 mb-6 baskervville-sc-regular">
                  {card.description}
                </p>
                <div class="mt-auto flex justify-center">
                  <a
                    href={card.link}
                    class="bg-[#F41952]/80 text-white px-8 py-2.5 rounded-lg
                             hover:bg-[#F41952] transition-all duration-300
                             raleway-font text-sm text-center whitespace-nowrap
                             w-full max-w-[200px]"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Pagination Dots -->
      <div class="flex justify-center gap-2 mt-6">
        {#each cards as _, i}
          <button
            class="w-2 h-2 rounded-full transition-all duration-300 {i ===
            currentIndex
              ? 'bg-[#F41952]'
              : 'bg-white/50'}"
            on:click={() => goToSlide(i)}
          />
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  .carousel-track {
    transform: translateX(0);
    will-change: transform;
  }

  /* Add these styles to ensure proper sliding */
  :global(.carousel-container) {
    width: 100%;
  }

  :global(.carousel-track) {
    display: flex;
    transition: transform 0.5s ease-in-out;
  }
</style>
