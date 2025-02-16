<!-- src/routes/my-orders/+page.svelte -->
<script>
  import OrderCard from '$lib/components/OrderCard.svelte';
  import { fade, fly } from 'svelte/transition';
  
  export let data;
  
 // Filter paid orders and sort by start_date in descending order (newest first)
 $: paidOrders = data.orders
    ?.filter(order => 
      order.status.toLowerCase() === 'paid' || 
      order.status.toLowerCase() === 'completed'
    )
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date)) || [];

  // Alternative: If you want to sort by creation date instead
  // Assuming your order object has a created_at field
  /*
  $: paidOrders = data.orders
    ?.filter(order => 
      order.status.toLowerCase() === 'paid' || 
      order.status.toLowerCase() === 'completed'
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) || [];
  */
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="text-center mb-12" in:fade>
      <h1 class="text-4xl font-bold text-gray-900 mb-4">My Active Subscriptions</h1>
      <p class="text-lg text-gray-600 max-w-2xl mx-auto">
        Track and manage your fitness programs and subscriptions
      </p>
    </div>

    <!-- Error State -->
    {#if data.error}
      <div class="rounded-xl bg-red-50 p-6 mb-8 border border-red-100" in:fade>
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-6 w-6 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Unable to load your subscriptions</h3>
            <p class="mt-1 text-sm text-red-700">{data.error}</p>
          </div>
        </div>
      </div>
    {/if}

    <!-- Orders Grid -->
    {#if paidOrders.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" in:fade>
        {#each paidOrders as order (order.razorpay_order_id)}
          <div in:fly={{ y: 20, duration: 300, delay: 200 }}>
            <OrderCard {order} />
          </div>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <div 
        class="text-center py-16 px-4 bg-white rounded-2xl shadow-sm border border-gray-100"
        in:fade
      >
        <div class="max-w-md mx-auto">
          <div class="bg-gray-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <svg class="w-10 h-10 text-[#F41A53]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">No Active Subscriptions</h3>
          <p class="text-gray-600 mb-8">
            Start your fitness journey today by exploring our range of programs designed just for you.
          </p>
          <div class="flex justify-center space-x-4">
            <a 
              href="/nutrition"
              class="inline-flex items-center px-6 py-3 rounded-xl text-white bg-[#F41A53] 
                     hover:bg-[#F41A53]/90 transition-all duration-200 font-medium shadow-lg 
                     shadow-[#F41A53]/20"
            >
              Browse Programs
              <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>