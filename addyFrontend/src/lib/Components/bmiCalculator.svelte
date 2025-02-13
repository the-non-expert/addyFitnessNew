<!-- BMICalculator.svelte -->
<script>
    import { fade } from "svelte/transition";
  
    let formData = {
      height: "",
      weight: "",
      age: "",
      gender: "female",
    };
  
    let bmiResult = null;
    let showInfo = false;
  
    const BMI_CATEGORIES = {
      UNDERWEIGHT: {
        min: 0,
        max: 18.5,
        color: "#3B82F6",
        description: "Underweight",
      },
      NORMAL: { min: 18.5, max: 24.9, color: "#10B981", description: "Normal" },
      OVERWEIGHT: {
        min: 24.9,
        max: 29.9,
        color: "#F59E0B",
        description: "Overweight",
      },
      OBESE: { min: 29.9, max: 100, color: "#EF4444", description: "Obese" },
    };
  
    function calculateBMI() {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
  
      if (!height || !weight) return;
  
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      bmiResult = Math.round(bmi * 10) / 10;
    }
  
    function getBMICategory(bmi) {
      for (const [key, category] of Object.entries(BMI_CATEGORIES)) {
        if (bmi >= category.min && bmi < category.max) {
          return {
            ...category,
            percentage:
              ((bmi - category.min) / (category.max - category.min)) * 100,
          };
        }
      }
      return BMI_CATEGORIES.OBESE;
    }
  
    function getHealthTips(bmi) {
      const category = getBMICategory(bmi);
  
      const tips = {
        UNDERWEIGHT: [
          "Increase caloric intake with nutrient-dense foods",
          "Add protein-rich foods to each meal",
          "Consider strength training to build muscle mass",
          "Eat frequent, smaller meals throughout the day",
          "Consult a healthcare provider for personalized advice",
        ],
        NORMAL: [
          "Maintain a balanced diet with plenty of fruits and vegetables",
          "Stay physically active with regular exercise",
          "Get adequate sleep and manage stress",
          "Regular health check-ups to maintain your healthy status",
        ],
        OVERWEIGHT: [
          "Focus on portion control and mindful eating",
          "Incorporate more fruits, vegetables, and whole grains",
          "Aim for 150 minutes of moderate exercise weekly",
          "Stay hydrated and limit sugary beverages",
          "Consider keeping a food diary",
        ],
        OBESE: [
          "Consult with healthcare providers for a personalized plan",
          "Start with gentle exercises like walking or swimming",
          "Focus on sustainable lifestyle changes",
          "Consider working with a registered dietitian",
          "Monitor other health markers besides weight",
        ],
      };
  
      for (const [key, value] of Object.entries(BMI_CATEGORIES)) {
        if (bmi >= value.min && bmi < value.max) {
          return tips[key];
        }
      }
      return tips.OBESE;
    }
  </script>
  
  <svelte:head>
    <title>BMI Calculator | Calculate Your Body Mass Index</title>
    <meta
      name="description"
      content="Free online BMI (Body Mass Index) calculator. Calculate your BMI instantly and get personalized health recommendations based on your results."
    />
    <meta
      name="keywords"
      content="BMI calculator, body mass index, health calculator, weight status, healthy weight calculator"
    />
  </svelte:head>
  
  <section class="w-full bg-[#FAF9FF] py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Educational Header -->
      <div class="text-center mb-16">
        <h1 class="text-3xl font-bold mb-4 raleway-font text-slate-900">
          BMI Calculator
        </h1>
        <p class="text-gray-600 text-lg mb-4">
          Body Mass Index (BMI) is a simple measure using your height and weight
          to work out if your weight is healthy.
        </p>
        <button
          class="text-[#F41952] hover:text-[#F41952]/80 font-medium"
          on:click={() => (showInfo = !showInfo)}
        >
          {showInfo ? "Hide Information" : "Learn more about BMI"}
        </button>
      </div>
  
      {#if showInfo}
        <div class="bg-white rounded-xl p-6 mb-8" transition:fade>
          <h2 class="font-semibold text-xl mb-4">Understanding BMI</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h3 class="font-medium mb-2">What is BMI?</h3>
              <p class="text-gray-600">
                BMI is a measure of body fat based on height and weight. While
                it's not perfect, it's a useful starting point for understanding
                if you're at a healthy weight.
              </p>
            </div>
            <div>
              <h3 class="font-medium mb-2">BMI Categories:</h3>
              <ul class="space-y-2">
                <li class="flex items-center">
                  <span class="w-3 h-3 rounded-full bg-[#3B82F6] mr-2"></span>
                  <span>Under 18.5 - Underweight</span>
                </li>
                <li class="flex items-center">
                  <span class="w-3 h-3 rounded-full bg-[#10B981] mr-2"></span>
                  <span>18.5 to 24.9 - Normal weight</span>
                </li>
                <li class="flex items-center">
                  <span class="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></span>
                  <span>25 to 29.9 - Overweight</span>
                </li>
                <li class="flex items-center">
                  <span class="w-3 h-3 rounded-full bg-[#EF4444] mr-2"></span>
                  <span>30 or greater - Obese</span>
                </li>
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
          on:submit|preventDefault={calculateBMI}
        >
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
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
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
              <span
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                kg
              </span>
            </div>
          </div>
  
          <!-- Calculate Button -->
          <button
            type="submit"
            class="w-full bg-[#F41952] text-white py-3 rounded-full text-base hover:bg-[#F41952]/90 transition-colors font-medium"
          >
            Calculate BMI
          </button>
        </form>
  
        <!-- Results -->
        {#if bmiResult}
          <div class="mt-12" transition:fade>
            <div class="text-center mb-8">
              <h3 class="text-2xl font-bold mb-2">Your BMI is {bmiResult}</h3>
              <p class="text-lg text-gray-600">
                You are in the <span
                  class="font-medium"
                  style="color: {getBMICategory(bmiResult).color}"
                >
                  {getBMICategory(bmiResult).description}
                </span> range
              </p>
            </div>
  
            <!-- Health Tips -->
            <div class="bg-gray-50 rounded-xl p-6">
              <h4 class="font-medium mb-4">
                Recommendations for Your BMI Range:
              </h4>
              <ul class="space-y-3">
                {#each getHealthTips(bmiResult) as tip}
                  <li class="flex items-start">
                    <svg
                      class="w-5 h-5 text-[#F41952] mt-1 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span class="text-gray-600">{tip}</span>
                  </li>
                {/each}
              </ul>
            </div>
  
            <!-- Disclaimer -->
            <p class="text-sm text-gray-500 mt-6">
              Note: BMI is not a diagnostic tool. Factors such as age, gender,
              ethnicity, and muscle mass can influence the interpretation of BMI.
              Please consult with our healthcare professionals by <a href="/healthcare" class="text-[#F41952] underline font-semibold">clicking here</a> for a complete health
              assessment.
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
  