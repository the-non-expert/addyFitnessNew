<!-- BMRCalculator.svelte -->
<script>
    import { fade } from "svelte/transition";
  
    let formData = {
      age: "",
      gender: "female",
      height: "",
      weight: ""
    };
  
    let bmrResult= null;
    let showInfo = false;
  
    const ACTIVITY_LEVELS = {
      SEDENTARY: { multiplier: 1.2, description: 'Little or no exercise' },
      LIGHT: { multiplier: 1.375, description: '1-3 times/week' },
      MODERATE: { multiplier: 1.55, description: '3-5 times/week' },
      ACTIVE: { multiplier: 1.725, description: '6-7 times/week' },
      VERY_ACTIVE: { multiplier: 1.9, description: 'Very intense exercise daily' }
    };
  
    let selectedActivity = 'SEDENTARY';
    let tdee = null;
  
    function calculateBMR() {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseInt(formData.age);
  
      if (!age || !height || !weight) return;
  
      let bmr;
      if (formData.gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
  
      bmrResult = Math.round(bmr);
      calculateTDEE();
    }
  
    function calculateTDEE() {
      if (!bmrResult) return;
      tdee = Math.round(bmrResult * ACTIVITY_LEVELS[selectedActivity].multiplier);
    }
  
    $: if (bmrResult && selectedActivity) {
      calculateTDEE();
    }
  
    function getNutritionTips(bmr, gender) {
      const baseRecommendations = [
        "Eat protein with every meal to maintain muscle mass",
        "Include a variety of fruits and vegetables for essential nutrients",
        "Stay hydrated by drinking water throughout the day",
        "Consider timing your meals around your workouts"
      ];
  
      if (gender === 'male' && bmr < 1600) {
        return [
          "Focus on nutrient-dense foods to meet nutritional needs",
          "Consider eating smaller, frequent meals",
          ...baseRecommendations
        ];
      } else if (gender === 'male' && bmr > 2000) {
        return [
          "Ensure adequate protein intake for muscle maintenance",
          "Include complex carbohydrates for sustained energy",
          ...baseRecommendations
        ];
      } else if (gender === 'female' && bmr < 1400) {
        return [
          "Focus on high-quality protein sources",
          "Include healthy fats for hormone balance",
          ...baseRecommendations
        ];
      } else {
        return [
          "Balance macronutrients for optimal energy",
          "Consider meal timing for better metabolism",
          ...baseRecommendations
        ];
      }
    }
  </script>
  
  <section class="w-full bg-[#FAF9FF] py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Educational Header -->
      <div class="text-center mb-16">
        <h1 class="text-3xl font-bold mb-4 raleway-font text-slate-900">
          BMR Calculator
        </h1>
        <p class="text-gray-600 text-lg mb-4">
          Calculate your Basal Metabolic Rate (BMR) - the number of calories your body burns at rest
        </p>
        <button 
          class="text-[#F41952] hover:text-[#F41952]/80 font-medium"
          on:click={() => showInfo = !showInfo}
        >
          {showInfo ? 'Hide Information' : 'Learn more about BMR'}
        </button>
      </div>
  
      {#if showInfo}
        <div class="bg-white rounded-xl p-6 mb-8" transition:fade>
          <h2 class="font-semibold text-xl mb-4">Understanding BMR</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium mb-2">What is BMR?</h3>
              <p class="text-gray-600">BMR represents the minimum energy your body needs to perform basic life-sustaining functions like breathing, circulation, and cell production while at rest.</p>
            </div>
            <div>
              <h3 class="font-medium mb-2">Why BMR Matters:</h3>
              <ul class="space-y-2 text-gray-600">
                <li>• Helps determine your daily caloric needs</li>
                <li>• Essential for weight management goals</li>
                <li>• Guides meal planning and nutrition</li>
                <li>• Indicates metabolic health</li>
              </ul>
            </div>
          </div>
        </div>
      {/if}
  
      <!-- Calculator Container -->
      <div class="bg-white rounded-[20px] border border-[#E5E7EB] p-8">
        <!-- Form -->
        <form 
          class="max-w-md mx-auto space-y-6"
          on:submit|preventDefault={calculateBMR}
        >
          <!-- Age -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Age
              <span class="text-gray-400 text-xs ml-1">(15-80 years)</span>
            </label>
            <input
              type="number"
              bind:value={formData.age}
              placeholder="Enter your age"
              class="w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-[#F41952]"
              min="15"
              max="80"
              required
            />
          </div>
  
          <!-- Gender -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  bind:group={formData.gender}
                  value="female"
                  class="w-4 h-4 text-[#F41952] focus:ring-[#F41952]"
                />
                <span class="ml-2 text-gray-700">Female</span>
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  bind:group={formData.gender}
                  value="male"
                  class="w-4 h-4 text-[#F41952] focus:ring-[#F41952]"
                />
                <span class="ml-2 text-gray-700">Male</span>
              </label>
            </div>
          </div>
  
          <!-- Height -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Height
              <span class="text-gray-400 text-xs ml-1">(in centimeters)</span>
            </label>
            <div class="relative">
              <input
                type="number"
                bind:value={formData.height}
                placeholder="Enter your height"
                class="w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-[#F41952]"
                min="0"
                required
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                cm
              </span>
            </div>
          </div>
  
          <!-- Weight -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">
              Weight
              <span class="text-gray-400 text-xs ml-1">(in kilograms)</span>
            </label>
            <div class="relative">
              <input
                type="number"
                bind:value={formData.weight}
                placeholder="Enter your weight"
                class="w-full px-4 py-2 bg-gray-50 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-[#F41952]"
                min="0"
                required
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                kg
              </span>
            </div>
          </div>
  
          <!-- Calculate Button -->
          <button
            type="submit"
            class="w-full bg-[#F41952] text-white py-3 rounded-full text-base hover:bg-[#F41952]/90 transition-colors font-medium"
          >
            Calculate BMR
          </button>
        </form>
  
        <!-- Results -->
        {#if bmrResult}
          <div class="mt-12" transition:fade>
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold mb-2">Your BMR is {bmrResult} calories/day</h3>
              <p class="text-gray-600">This is your basal energy expenditure</p>
            </div>
  
            <!-- Activity Level Selector -->
            <div class="bg-gray-50 rounded-xl p-6 mb-6">
              <h4 class="font-medium mb-4">Calculate Total Daily Energy Expenditure (TDEE)</h4>
              <div class="space-y-3">
                <p class="text-sm text-gray-600 mb-4">Select your activity level to see how many calories you burn daily:</p>
                <select
                  bind:value={selectedActivity}
                  class="w-full p-2 rounded-lg border-gray-300 focus:ring-[#F41952] focus:border-[#F41952]"
                >
                  {#each Object.entries(ACTIVITY_LEVELS) as [key, {description}]}
                    <option value={key}>{description}</option>
                  {/each}
                </select>
                
                {#if tdee}
                  <div class="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <p class="text-lg font-medium">Your TDEE: {tdee} calories/day</p>
                    <p class="text-sm text-gray-600 mt-1">This is your estimated daily calorie burn including activity</p>
                  </div>
                {/if}
              </div>
            </div>
  
            <!-- Nutrition Tips -->
            <div class="bg-gray-50 rounded-xl p-6">
              <h4 class="font-medium mb-4">Nutritional Recommendations:</h4>
              <ul class="space-y-3">
                {#each getNutritionTips(bmrResult, formData.gender) as tip}
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-[#F41952] mt-1 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="text-gray-600">{tip}</span>
                  </li>
                {/each}
              </ul>
            </div>
  
            <!-- Weight Goals -->
            <div class="mt-6 p-6 bg-gray-50 rounded-xl">
                <h4 class="font-medium mb-4">Daily Calorie Targets for Weight Goals:</h4>
                {#if tdee}
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <!-- Weight Loss Card -->
                    <div class="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                      <div class="flex flex-col h-full">
                        <p class="text-sm font-medium text-gray-600">Weight Loss</p>
                        <p class="text-lg font-bold">{Math.round(tdee * 0.8)} calories/day</p>
                        <p class="text-xs text-gray-500 mt-1">20% calorie deficit</p>
                        <div class="mt-4 pt-4 border-t border-gray-100">
                          <a 
                            href="/nutrition?plan=weight-loss"
                            class="inline-flex items-center text-sm text-[#F41952] hover:text-[#F41952]/80 font-medium"
                          >
                            View Weight Loss Plan
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
              
                    <!-- Maintenance Card -->
                    <div class="p-4 bg-white rounded-lg border border-gray-200">
                      <p class="text-sm font-medium text-gray-600">Maintenance</p>
                      <p class="text-lg font-bold">{tdee} calories/day</p>
                      <p class="text-xs text-gray-500 mt-1">Maintain current weight</p>
                    </div>
              
                    <!-- Weight Gain Card -->
                    <div class="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                      <div class="flex flex-col h-full">
                        <p class="text-sm font-medium text-gray-600">Weight Gain</p>
                        <p class="text-lg font-bold">{Math.round(tdee * 1.1)} calories/day</p>
                        <p class="text-xs text-gray-500 mt-1">10% calorie surplus</p>
                        <div class="mt-4 pt-4 border-t border-gray-100">
                          <a 
                            href="/nutrition?plan=weight-gain"
                            class="inline-flex items-center text-sm text-[#F41952] hover:text-[#F41952]/80 font-medium"
                          >
                            View Mass Gain Plan
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
              
                  <!-- Additional Info Text -->
                  <p class="text-sm text-gray-600 mt-4">
                    Click on the plans to see our detailed nutrition programs tailored to help you achieve your goals.
                  </p>
                {/if}
              </div>
  
            <!-- Disclaimer -->
            <p class="text-sm text-gray-500 mt-6">
              Note: These calculations provide estimates based on averages. Individual needs may vary based on factors like muscle mass, genetics, and medical conditions. Consult with healthcare professionals for personalized advice.
            </p>
          </div>
        {/if}
      </div>
    </div>
  </section>
  
  <style>
    .raleway-font {
      font-family: "Raleway", sans-serif;
    }
  
    /* Remove number input spinners */
    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  </style>