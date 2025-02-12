<!-- src/lib/components/OrderCard.svelte -->
<script>
    export let order;
  
    const getStatusColor = (status) => {
      switch (status.toLowerCase()) {
        case 'completed':
          return 'bg-green-100 text-green-800';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'failed':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };
  </script>
  
  <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
    <div class="p-6">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-xl font-bold text-gray-900">{order.title}</h3>
          <p class="text-sm text-gray-500">Order #{order.razorpay_order_id.slice(-6)}</p>
        </div>
        <span class={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>
  
      <div class="mt-4 space-y-3">
        <div class="flex items-center space-x-2 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span class="text-lg font-semibold">₹{order.amount.toFixed(2)}</span>
        </div>
  
        <div class="flex items-center space-x-2 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <div class="flex flex-col">
            <span class="text-sm">From: {new Date(order.start_date).toLocaleDateString()}</span>
            <span class="text-sm">To: {new Date(order.end_date).toLocaleDateString()}</span>
          </div>
        </div>
  
        {#if order.payment_method}
          <div class="flex items-center space-x-2 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            <span class="text-sm capitalize">{order.payment_method}</span>
          </div>
        {/if}
      </div>
    </div>
  </div>