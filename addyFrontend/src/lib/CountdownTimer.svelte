<script>
    import { onMount, onDestroy } from 'svelte';
    import { gsToHttp } from "$lib/CommonComponents/utils.js";

    let logo = "gs://addyfitness-db121.appspot.com/LOGO WHITE.png";
    
    const targetDate = new Date('2025-02-16T12:00:00');
    let days = 0, hours = 0, minutes = 0, seconds = 0;
    let email = '';
    let intervalId;
  
    function updateCountdown() {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(intervalId);
        return;
      }
      
      days = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((difference % (1000 * 60)) / 1000);
    }
  
    function handleNotify() {
      // Handle email subscription
      console.log('Email submitted:', email);
    }
  
    onMount(() => {
      updateCountdown();
      intervalId = setInterval(updateCountdown, 1000);
    });
  
    onDestroy(() => {
      if (intervalId) clearInterval(intervalId);
    });
  </script>
  
  <div class="min-h-screen bg-[#161626] relative overflow-hidden">
    <!-- Grid background -->
    <div class="absolute inset-0" style="background-image: linear-gradient(#2a2a4a 1px, transparent 1px), linear-gradient(90deg, #2a2a4a 1px, transparent 1px); background-size: 15px 15px; filter: blur(1px); "></div>
    
    <div class="relative z-10 container mx-auto px-4 py-12">
      <!-- Logo area -->
      <div class="flex justify-center mb-6">
        <img src={gsToHttp(logo)} alt="Addy Fitness" class="h-16 md:h-60"/>
      </div>
  
      <div class="max-w-4xl mx-auto text-center">
        <p class="text-[#FF4D8D] font-medium mb-4">Take your health to the next level 🚀</p>
        
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
          Launching Soon: Your Path to Wellness
        </h1>
        
        <p class="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          At Addy Fitness, we believe that fitness is more than just a routine – it's a lifestyle. Join us on February 16, 2025 as we revolutionize your fitness journey.
        </p>
  
        <!-- Countdown -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          <div class="bg-[#1E1E38] rounded-xl p-6 backdrop-blur-sm">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">{days}</div>
            <div class="text-gray-400">Days</div>
          </div>
          <div class="bg-[#1E1E38] rounded-xl p-6 backdrop-blur-sm">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">{hours}</div>
            <div class="text-gray-400">Hours</div>
          </div>
          <div class="bg-[#1E1E38] rounded-xl p-6 backdrop-blur-sm">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">{minutes}</div>
            <div class="text-gray-400">Minutes</div>
          </div>
          <div class="bg-[#1E1E38] rounded-xl p-6 backdrop-blur-sm">
            <div class="text-4xl md:text-5xl font-bold text-white mb-2">{seconds}</div>
            <div class="text-gray-400">Seconds</div>
          </div>
        </div>
  
        <!-- Email signup -->
        <!-- <div class="max-w-md mx-auto">
          <div class="flex gap-3">
            <input
              type="email"
              bind:value={email}
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 rounded-lg bg-[#1E1E38] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D]"
            />
            <button 
              on:click={handleNotify}
              class="px-6 py-3 bg-[#FF4D8D] hover:bg-[#FF6BA1] transition-colors rounded-lg text-white font-medium"
            >
              Notify Me
            </button>
          </div>
        </div> -->
      </div>
    </div>
  
    <!-- Decorative circle -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] h-[800px] bg-[#FF4D8D]/10 rounded-full blur-3xl"></div>
  </div>