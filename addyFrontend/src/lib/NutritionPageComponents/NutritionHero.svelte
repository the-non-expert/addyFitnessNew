<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  let nutritionHeroImage =
    "gs://addyfitness-db121.appspot.com/nutritionHero.jpeg";
  let searchQuery = "";

  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  
  const searchTerms = [
    "Weight Loss",
    "Weight Gain", 
    "Diabetes",
    "Thyroid",
    "PCOS",
    "Gestation (Pregnancy)",
    "Senior Nutrition",
    "Blood Pressure",
    "Renal Function(Kidney)",
    "Child Nutrition",
    "Post Pregnancy",
    "Anaemia"
  ];
  
  let displayText = "";
  let currentTermIndex = 0;
  let charIndex = 0;
  let typewriterInterval;
  let isDeleting = false;
  let typingSpeed = 60; // Slightly slower than Training for variety
  let deletingSpeed = 15;

  function typewriter() {
    const currentTerm = searchTerms[currentTermIndex];
    
    if (!isDeleting && charIndex === currentTerm.length) {
      clearInterval(typewriterInterval);
      setTimeout(() => {
        isDeleting = true;
        typewriterInterval = setInterval(typewriter, deletingSpeed);
      }, 1800); // Longer pause at end
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentTermIndex = (currentTermIndex + 1) % searchTerms.length;
      clearInterval(typewriterInterval);
      setTimeout(() => {
        typewriterInterval = setInterval(typewriter, typingSpeed);
      }, 600);
      return;
    }

    if (isDeleting) {
      displayText = currentTerm.substring(0, charIndex - 1);
      charIndex--;
    } else {
      displayText = currentTerm.substring(0, charIndex + 1);
      charIndex++;
    }
  }

  onMount(() => {
    typewriterInterval = setInterval(typewriter, typingSpeed);
  });

  onDestroy(() => {
    if (typewriterInterval) clearInterval(typewriterInterval);
  });

  $: placeholder = `Search for ${displayText}`;
</script>

<div class="w-full bg-[#F41952]/20">

  <!-- Search Section -->
  <div class="w-full bg-white py-8 md:py-16 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
        <!-- Left side: Content -->
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Nutrition
          </h2>
          <p class="text-gray-600 text-base md:text-lg">
            Discover personalized nutrition plans and expert dietary guidance. Our comprehensive 
            nutrition resources help you make informed choices for a healthier lifestyle, 
            combining scientific knowledge with practical meal planning.
          </p>
        </div>

        <!-- Right side: Search -->
        <div class="w-full md:w-1/2">
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
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
              placeholder={placeholder}
              class="w-full py-3 md:py-4 pl-12 pr-24 md:pr-32 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#F41952] focus:border-transparent transition-all duration-200 outline-none text-gray-600 text-sm md:text-base"
            />

            <button
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F41952] hover:bg-[#F41952]/90 text-white px-4 md:px-8 py-2 md:py-2.5 rounded-full transition-colors duration-200 text-sm font-medium whitespace-nowrap"
            >
              Search Now
            </button>
          </div>
        </div>
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
    border-color: rgba(244, 25, 82, 0.2);
  }
</style>
