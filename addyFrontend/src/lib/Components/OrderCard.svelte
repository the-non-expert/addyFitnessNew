<!-- src/lib/components/OrderCard.svelte -->
<script>
  import { formatDate } from '$lib/utils/formatDate';
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import { trainingCardData } from "$lib/stores/TrainingCardData.js";
  import { nutritionCardData } from "$lib/stores/NutritionCardData.js";
  
  export let order;

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  // Simple function to find program by name similarity
  function findProgram(title) {
    // Convert to lowercase and remove extra spaces for comparison
    const cleanTitle = title.toLowerCase().trim();
    
    // Try training programs first
    const training = trainingCardData.find(p => 
      p.name.toLowerCase().includes(cleanTitle) || 
      cleanTitle.includes(p.name.toLowerCase())
    );
    if (training) return { data: training, type: 'Training' };

    // Then try nutrition programs
    const nutrition = nutritionCardData.find(p => 
      p.name.toLowerCase().includes(cleanTitle) || 
      cleanTitle.includes(p.name.toLowerCase())
    );
    if (nutrition) return { data: nutrition, type: 'Nutrition' };

    return { data: null, type: 'Other' };
  }

  $: ({ data: programData, type: category } = findProgram(order.title));
</script>

<div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
  <!-- Image/GIF Section -->
  <div class="relative h-48">
    {#if programData?.image}
      <img 
        src={gsToHttp(programData.image)} 
        alt={order.title}
        class="w-full h-full object-cover object-top"
      />
    {:else}
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-[#F41A53]/5 to-[#F41A53]/20">
        <svg class="w-16 h-16 text-[#F41A53]/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>
    {/if}
  
    <!-- Badges Container -->
    <div class="absolute top-4 left-4 right-4 flex justify-between items-center">
      <!-- Category Badge -->
      <span class="px-3 py-1.5 text-sm font-medium rounded-full bg-white/90 text-[#F41A53] shadow-sm backdrop-blur-sm">
        {category}
      </span>
      
      <!-- Status Badge -->
      <span class={`px-3 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm ${getStatusColor(order.status)}`}>
        {order.status}
      </span>
    </div>
  </div>

  <div class="p-6">
    <!-- Title and Price -->
    <div class="flex justify-between items-start mb-4">
      <div>
        <h3 class="text-xl font-bold text-gray-900">{order.title}</h3>
        {#if programData?.coach}
          <p class="text-sm text-gray-600 mt-1">Coach: {programData.coach}</p>
        {/if}
      </div>
      <p class="text-xl font-bold text-[#F41A53]">
        ₹{order.amount.toLocaleString('en-IN')}
      </p>
    </div>

    <!-- Details -->
    <div class="bg-gray-50 rounded-xl p-4 mb-6">
      <!-- Order Info -->
      <p class="text-sm text-gray-500 mb-3">
        Order #{order.razorpay_order_id?.slice(-6)}
      </p>

      <!-- Dates -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-xs text-gray-500">Start Date</p>
          <p class="text-sm font-medium">{formatDate(order.start_date)}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500">End Date</p>
          <p class="text-sm font-medium">{formatDate(order.end_date)}</p>
        </div>
      </div>

      <!-- Program Details -->
      {#if programData?.duration || programData?.sessions}
        <div class="mt-3 pt-3 border-t border-gray-200">
          <div class="grid grid-cols-2 gap-4">
            {#if programData.duration}
              <div>
                <span class="text-sm text-gray-500">Duration:</span>
                <span class="text-sm ml-1">{programData.duration}</span>
              </div>
            {/if}
            {#if programData.sessions}
              <div>
                <span class="text-sm text-gray-500">Sessions:</span>
                <span class="text-sm ml-1">{programData.sessions}/week</span>
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>

    <!-- Action Button -->
    <a 
      href={`/${category.toLowerCase()}`}
      class="block w-full text-center py-3 rounded-xl bg-[#F41A53] text-white font-medium
             hover:bg-[#F41A53]/90 transition-colors duration-200"
    >
      View Program
    </a>
  </div>
</div>