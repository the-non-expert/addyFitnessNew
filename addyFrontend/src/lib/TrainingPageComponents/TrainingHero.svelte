<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { Search } from "lucide-svelte";
  import { trainingCardData } from "$lib/stores/TrainingCardData.js";
  import { fade } from "svelte/transition";
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  const dispatch = createEventDispatcher();
  
  // Search functionality
  let searchQuery = "";
  let filteredTrainingCards = trainingCardData;
  let showSuggestions = false;
  let selectedSuggestionIndex = -1;

  // Typewriter effect data
  const searchTerms = [
    "Live Workout Sessions",
    "Yoga",
    "High-Intensity Interval Training",
    "Low-Impact Cardio Workouts", 
    "Dance",
    "Energizing Zumba Classes",
    "Senior-Friendly Exercise Programs"
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
    "weight loss": ["HIIT", "cardio", "workout session"],
    "flexibility": ["yoga", "stretching"],
    "strength": ["workout session", "HIIT"],
    "beginner": ["yoga", "senior workout", "low impact"],
    "stress relief": ["yoga", "dance", "zumba"],
    "cardio": ["HIIT", "dance", "zumba"],
    "low impact": ["yoga", "senior workout"],
    "high intensity": ["HIIT", "workout session"],
    "fun": ["dance", "zumba"],
    "meditation": ["yoga"],
    "senior": ["senior workout", "low impact"],
    "elderly": ["senior workout", "low impact"],
    "personal": ["workout session", "personal training"],
    "group": ["batch training", "zumba", "dance"]
  };

  function createSearchableContent(trainingCard) {
    return [
      trainingCard.name,
      trainingCard.description,
      trainingCard.trainingTypes.types.join(' '),
      trainingCard.benefits.features.join(' '),
      trainingCard.sessionSplit.map(s => s.title).join(' '),
      // Add common alternative terms/keywords for each training type
      ...(getKeywordsForTraining(trainingCard.name))
    ].join(' ').toLowerCase();
  }

  function getKeywordsForTraining(trainingName) {
    const keywords = [];
    for (const [key, values] of Object.entries(keywordMap)) {
      if (values.some(value => trainingName.toLowerCase().includes(value.toLowerCase()))) {
        keywords.push(key);
      }
    }
    return keywords;
  }

  function getSuggestions(query) {
    if (!query) return [];
    query = query.toLowerCase();
    
    // Get matching training names
    const matchingTrainings = trainingCardData
      .filter(card => createSearchableContent(card).includes(query))
      .map(card => card.name);

    // Get matching keywords
    const matchingKeywords = Object.keys(keywordMap)
      .filter(keyword => keyword.toLowerCase().includes(query));

    return [...new Set([...matchingTrainings, ...matchingKeywords])].slice(0, 5);
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
      filteredTrainingCards = trainingCardData;
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ');
    filteredTrainingCards = trainingCardData.filter(card => {
      const searchableContent = createSearchableContent(card);
      return searchTerms.every(term => searchableContent.includes(term));
    });

    dispatch('search', {
      query: searchQuery,
      results: filteredTrainingCards
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
            Training
          </h2>
          <p class="text-gray-600 text-base md:text-lg">
            Access a diverse collection of professional workout programs
            customized to your needs. Our expert-guided training combines proven
            techniques with personalized approaches to help you achieve
            sustainable fitness results.
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
            {#each ['All','Weight Loss', 'Yoga', 'Cardio', 'Senior Workout'] as tag}
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