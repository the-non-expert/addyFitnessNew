<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { Search } from "lucide-svelte";
  import { nutritionCardData } from "$lib/stores/NutritionCardData.js";
  import { fade } from "svelte/transition";
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();
  
  // Search functionality
  let searchQuery = "";
  let filteredNutritionCards = nutritionCardData;
  let showSuggestions = false;
  let selectedSuggestionIndex = -1;

  // Typewriter effect data
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
  let typingSpeed = 50;
  let deletingSpeed = 10;

  // Enhanced search functionality with keywords
  const keywordMap = {
    "weight management": ["weight loss", "weight gain"],
    "hormonal": ["thyroid", "pcos"],
    "diabetes": ["blood sugar", "glucose management"],
    "pregnancy": ["gestation", "post pregnancy", "maternal health"],
    "chronic conditions": ["blood pressure", "renal function", "kidney"],
    "age specific": ["child nutrition", "senior nutrition"],
    "women's health": ["pcos", "pregnancy", "anaemia"],
    "dietary planning": ["weight loss", "weight gain", "diabetes"],
    "medical nutrition": ["thyroid", "diabetes", "blood pressure"],
    "preventive care": ["weight management", "blood pressure"],
    "therapeutic": ["diabetes", "thyroid", "renal function"],
    "lifestyle": ["weight loss", "weight gain", "blood pressure"]
  };

  function createSearchableContent(nutritionCard) {
    return [
      nutritionCard.name,
      nutritionCard.description,
      nutritionCard.included,
      nutritionCard.benefits.features.join(' '),
      // Add common alternative terms/keywords for each nutrition type
      ...(getKeywordsForNutrition(nutritionCard.name))
    ].join(' ').toLowerCase();
  }

  function getKeywordsForNutrition(nutritionName) {
    const keywords = [];
    for (const [key, values] of Object.entries(keywordMap)) {
      if (values.some(value => nutritionName.toLowerCase().includes(value.toLowerCase()))) {
        keywords.push(key);
      }
    }
    return keywords;
  }

  function getSuggestions(query) {
    if (!query) return [];
    query = query.toLowerCase();
    
    // Get matching nutrition program names
    const matchingPrograms = nutritionCardData
      .filter(card => createSearchableContent(card).includes(query))
      .map(card => card.name);

    // Get matching keywords
    const matchingKeywords = Object.keys(keywordMap)
      .filter(keyword => keyword.toLowerCase().includes(query));

    return [...new Set([...matchingPrograms, ...matchingKeywords])].slice(0, 5);
  }

  // Typewriter effect
  function typewriter() {
    const currentTerm = searchTerms[currentTermIndex];
    
    if (!isDeleting && charIndex === currentTerm.length) {
      clearInterval(typewriterInterval);
      setTimeout(() => {
        isDeleting = true;
        typewriterInterval = setInterval(typewriter, deletingSpeed);
      }, 1500);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentTermIndex = (currentTermIndex + 1) % searchTerms.length;
      clearInterval(typewriterInterval);
      setTimeout(() => {
        typewriterInterval = setInterval(typewriter, typingSpeed);
      }, 500);
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

  // Search handling
  function handleSearch() {
    if (!searchQuery.trim()) {
      filteredNutritionCards = nutritionCardData;
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ');
    filteredNutritionCards = nutritionCardData.filter(card => {
      const searchableContent = createSearchableContent(card);
      return searchTerms.every(term => searchableContent.includes(term));
    });

    dispatch('search', {
      query: searchQuery,
      results: filteredNutritionCards
    });

    showSuggestions = false;
  }

  function handleKeydown(event) {
    const suggestions = getSuggestions(searchQuery);
    
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, -1);
    } else if (event.key === 'Enter') {
      if (selectedSuggestionIndex >= 0) {
        searchQuery = suggestions[selectedSuggestionIndex];
      }
      handleSearch();
    } else if (event.key === 'Escape') {
      showSuggestions = false;
    }
  }

  // Lifecycle
  onMount(() => {
    typewriterInterval = setInterval(typewriter, typingSpeed);
  });

  onDestroy(() => {
    if (typewriterInterval) clearInterval(typewriterInterval);
  });

  $: placeholder = `Search for ${displayText}`;
  $: suggestions = searchQuery ? getSuggestions(searchQuery) : [];
</script>

<div class="w-full">
  <div class="w-full bg-white py-8 md:py-16 px-4 md:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center">
        <!-- Left side: Heading -->
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

        <!-- Right side: Search Bar -->
        <div class="w-full md:w-1/2">
          <div class="relative">
            <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>

            <input
              type="text"
              bind:value={searchQuery}
              on:input={() => {
                showSuggestions = true;
                selectedSuggestionIndex = -1;
              }}
              on:keydown={handleKeydown}
              on:focus={() => showSuggestions = true}
              placeholder={placeholder}
              class="w-full py-3 md:py-4 pl-12 pr-24 md:pr-32 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#F41952] focus:border-transparent transition-all duration-200 outline-none text-gray-600 text-sm md:text-base"
            />

            <button
              on:click={handleSearch}
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-[#F41952] hover:bg-[#F41952]/90 text-white px-4 md:px-8 py-2 md:py-2.5 rounded-full transition-colors duration-200 text-sm font-medium whitespace-nowrap"
            >
              Find Now
            </button>

            <!-- Search Suggestions -->
            {#if showSuggestions && searchQuery && suggestions.length > 0}
              <div 
                class="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                transition:fade
              >
                <ul class="py-2">
                  {#each suggestions as suggestion, i}
                    <li>
                      <button
                        class="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 text-sm
                               {i === selectedSuggestionIndex ? 'bg-gray-50' : ''}"
                        on:click={() => {
                          searchQuery = suggestion;
                          handleSearch();
                        }}
                      >
                        {suggestion}
                      </button>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>

          <!-- Search Tags -->
          <div class="flex flex-wrap gap-2 mt-3">
            {#each ['All', 'Weight Loss', 'Diabetes', 'PCOS', 'Pregnancy', 'Senior Care'] as tag}
              <button
                on:click={() => {
                  searchQuery = tag;
                  handleSearch();
                }}
                class="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {tag}
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  input {
    transition: all 0.2s ease-in-out;
  }

  input:hover {
    border-color: rgba(244, 25, 82, 0.2);
  }
</style>