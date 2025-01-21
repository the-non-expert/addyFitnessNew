<!-- src/lib/components/FlipCareerCard.svelte -->
<script>
    import { ChevronRight } from 'lucide-svelte';
    
    export let career;
    let isFlipped = false;
  </script>
  
  <div 
    class="relative h-[500px] w-full"
    role="button"
    on:mouseenter={() => isFlipped = true}
    on:mouseleave={() => isFlipped = false}
  >
    <div class="relative w-full h-full transition-all duration-500 preserve-3d {isFlipped ? 'flip-card' : ''}">
      <!-- Front of card -->
      <div class="absolute w-full h-full backface-hidden">
        <div class="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div class="{career.color} h-2 w-full rounded-t-2xl" />
          <div class="p-8 h-full flex flex-col">
            <div class="flex items-center mb-6">
              <svelte:component this={career.icon} class="h-8 w-8 text-gray-700" />
              <h3 class="text-2xl font-bold ml-4 text-gray-900">{career.title}</h3>
            </div>
            
            <p class="text-gray-600 mb-6 flex-grow">{career.description}</p>
            
            <div class="mt-auto">
              <p class="text-sm text-blue-600 mb-4 text-center">Hover to see more details</p>
              <button 
                class="w-full px-6 py-3 text-white font-semibold rounded-lg {career.color} hover:opacity-90 transition-opacity duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Back of card -->
      <div class="absolute w-full h-full backface-hidden back-side">
        <div class="h-full bg-white rounded-2xl shadow-lg p-8 flex flex-col">
          <div class="mb-6 flex-grow overflow-auto">
            <h4 class="font-semibold text-gray-900 mb-4">Key Responsibilities</h4>
            <ul class="space-y-2 mb-6">
              {#each career.responsibilities as responsibility}
                <li class="flex items-start">
                  <ChevronRight class="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span class="ml-2 text-gray-600">{responsibility}</span>
                </li>
              {/each}
            </ul>
  
            <h4 class="font-semibold text-gray-900 mb-4">Perks & Benefits</h4>
            <ul class="space-y-2">
              {#each career.perks as perk}
                <li class="flex items-start">
                  <ChevronRight class="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span class="ml-2 text-gray-600">{perk}</span>
                </li>
              {/each}
            </ul>
          </div>
  
          <button 
            class="w-full px-6 py-3 text-white font-semibold rounded-lg {career.color} hover:opacity-90 transition-opacity duration-300 mt-auto"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    /* Preserve 3D perspective */
    :global(.preserve-3d) {
      transform-style: preserve-3d;
      perspective: 1000px;
    }
  
    /* Hide backface */
    .backface-hidden {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
  
    /* Flip animation */
    .back-side {
      transform: rotateY(180deg);
    }
  
    .flip-card {
      transform: rotateY(180deg);
    }
  </style>