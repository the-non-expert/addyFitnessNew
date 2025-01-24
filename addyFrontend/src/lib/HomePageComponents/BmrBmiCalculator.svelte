<script>
  import { fade } from "svelte/transition";

  let activeTab = "BMR";

  let formData = {
    age: "",
    gender: "female",
    height: "",
    weight: "",
  };

  let bmrResult = null;
  let bmiResult = null;

  let gaugePercentage = 0;
  let gaugeColor = '#F41952';

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
  }

  function calculateBMI() {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);

    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    bmiResult = Math.round(bmi * 10) / 10;
  }

  function clearForm() {
    formData = {
      age: "",
      gender: "female",
      height: "",
      weight: "",
    };
    bmrResult = null;
    bmiResult = null;
  }

  function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: 'Underweight', color: '#3B82F6', percentage: 25 };
    if (bmi < 24.9) return { category: 'Normal', color: '#10B981', percentage: 50 };
    if (bmi < 29.9) return { category: 'Overweight', color: '#F59E0B', percentage: 75 };
    return { category: 'Obese', color: '#EF4444', percentage: 100 };
  }

  function getBMRCategory(bmr, gender) {
    const maxBMR = gender === 'male' ? 2500 : 2000;
    const percentage = (bmr / maxBMR) * 100;
    return {
      percentage: Math.min(percentage, 100),
      color: '#F41952'
    };
  }

  $: {
    if (activeTab === 'BMI' && bmiResult) {
      const category = getBMICategory(bmiResult);
      gaugePercentage = category.percentage;
      gaugeColor = category.color;
    } else if (activeTab === 'BMR' && bmrResult) {
      const category = getBMRCategory(bmrResult, formData.gender);
      gaugePercentage = category.percentage;
      gaugeColor = category.color;
    }
  }
</script>

<section class="w-full bg-[#FAF9FF] py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="text-[2rem] font-bold mb-2 raleway-font text-slate-900">
        {activeTab} Calculator
      </h2>
      <p class="text-gray-600 text-base">
        {#if activeTab == "BMR"}
          Discover your daily calorie needs and take control of your fitness
          journey with our BMR calculator
        {:else}
          Know your body better—calculate your BMI for a healthier you!
        {/if}
      </p>
    </div>

    <!-- Main Calculator Container -->
    <div class="max-w-[1000px] mx-auto">
      <div class="bg-white rounded-[20px] border border-[#E5E7EB] md:p-8 p-3">
        <div class="flex flex-col md:flex-row">
          <!-- Left Side - Calculator Form -->
          <div class="w-full md:w-1/2">
            <!-- Tabs-->
            <div class="flex w-full justify-center">
              <button
                class="px-8 py-3 text-base transition-colors w-1/2 rounded-t-3xl
                      {activeTab === 'BMR'
                  ? 'bg-[#F6F6F6] text-[#344054]'
                  : 'bg-white text-[#F41952]'}"
                on:click={() => (activeTab = "BMR")}
              >
                Calculate BMR
              </button>
              <button
                class="px-8 py-3 text-base transition-colors w-1/2 rounded-t-3xl
                      {activeTab === 'BMI'
                  ? 'bg-[#F6F6F6] text-[#344054]'
                  : 'bg-white text-[#F41952]'}"
                on:click={() => (activeTab = "BMI")}
              >
                Calculate BMI
              </button>
            </div>
            <!-- Form -->
            <div class="bg-[#F6F6F6] rounded-b-3xl md:p-7 p-5">
              <form
                class="space-y-5"
                on:submit|preventDefault={activeTab === "BMR"
                  ? calculateBMR
                  : calculateBMI}
              >
                <!-- Age -->
                <div class="flex items-center">
                  <label class="w-24 text-base text-[#344054]">Age</label>
                  <div class="flex-1 relative">
                    <input
                      type="text"
                      bind:value={formData.age}
                      placeholder="Text"
                      class="w-full px-4 py-2 bg-white rounded-lg text-[#344054] border-0 focus:ring-1 focus:ring-[#7F56D9] placeholder-[#667085]"
                    />
                    <span
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"
                    >
                      Ages 15 - 80
                    </span>
                  </div>
                </div>
                <!-- Gender -->
                <div class="flex items-center">
                  <label class="w-24 text-base text-[#344054]">Gender</label>
                  <div class="flex gap-8">
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        bind:group={formData.gender}
                        value="female"
                        class="w-3 h-3 accent-[#F41952]"
                      />
                      <span class="ml-2 text-base text-[#344054]">Female</span>
                    </label>
                    <label class="inline-flex items-center">
                      <input
                        type="radio"
                        bind:group={formData.gender}
                        value="male"
                        class="w-3 h-3 accent-[#F41952]"
                      />
                      <span class="ml-2 text-base text-[#344054]">Male</span>
                    </label>
                  </div>
                </div>

                <!-- Height -->
                <div class="flex items-center">
                  <label class="w-24 text-base text-[#344054]">Height</label>
                  <div class="flex-1 relative">
                    <input
                      type="text"
                      bind:value={formData.height}
                      class="w-full px-4 py-2 bg-white rounded-lg text-[#344054] border-0 focus:ring-1 focus:ring-[#7F56D9]"
                    />
                    <span
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"
                    >
                      cm
                    </span>
                  </div>
                </div>

                <!-- Weight -->
                <div class="flex items-center">
                  <label class="w-24 text-base text-[#344054]">Weight</label>
                  <div class="flex-1 relative">
                    <input
                      type="text"
                      bind:value={formData.weight}
                      class="w-full px-4 py-2 bg-white rounded-lg text-[#344054] border-0 focus:ring-1 focus:ring-[#7F56D9]"
                    />
                    <span
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-[#667085]"
                    >
                      Kg
                    </span>
                  </div>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end items-center gap-4">
                  <button
                    type="submit"
                    class="px-10 bg-[#F41952] text-white py-2 rounded-full text-base hover:bg-purple-700 transition-colors"
                  >
                    Calculate
                  </button>
                  <button
                    type="button"
                    on:click={clearForm}
                    class="text-base text-[#344054] hover:text-gray-900"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Right Side - Results -->
          <div class="w-full md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <div class="border-b pb-4 mb-6">
              <h3 class="text-xl font-semibold">Results</h3>
            </div>

            {#if !bmrResult && activeTab === "BMR"}
              <p class="text-gray-500">Enter your details to see your BMR</p>
            {:else if bmrResult && activeTab === "BMR"}
              <div class="flex items-baseline gap-2">
                <span class="text-gray-800">BMR = </span>
                <span class="text-3xl font-bold">{bmrResult}</span>
                <span class="text-gray-800">Calories/day</span>
              </div>
            {/if}

            {#if !bmiResult && activeTab === "BMI"}
              <p class="text-gray-500">Enter your details to see your BMI</p>
            {:else if bmiResult && activeTab === "BMI"}
              <div class="flex items-baseline gap-2">
                <span class="text-gray-800">BMI = </span>
                <span class="text-3xl font-bold">{bmiResult}</span>
              </div>
            {/if}

            <!-- gauge -->
            <div class="mt-8 w-full">
              {#if (activeTab === 'BMI' && bmiResult) || (activeTab === 'BMR' && bmrResult)}
                <div class="relative md:w-full md:h-[150px] mx-auto" transition:fade>
                  <svg viewBox="0 0 200 120" class="w-full h-full">
                    <path
                      d="M20 100 A 60 60 0 0 1 180 100"
                      fill="none"
                      stroke="#E5E7EB"
                      stroke-width="8"
                      stroke-linecap="round"
                    />
                    
                    <path
                      d="M20 100 A 60 60 0 0 1 180 100"
                      fill="none"
                      stroke={gaugeColor}
                      stroke-width="8"
                      stroke-linecap="round"
                      stroke-dasharray="251"
                      stroke-dashoffset={251 - (251 * gaugePercentage / 100)}
                      style="transition: stroke-dashoffset 0.5s ease-in-out"
                    />
                    <!-- Main value -->
                    <text
                      x="100"
                      y="90"
                      text-anchor="middle"
                      class="text-2xl font-bold"
                      fill={gaugeColor}
                    >
                      {activeTab === 'BMI' ? getBMICategory(bmiResult).category : `${Math.round(gaugePercentage)}%`}
                    </text>
                  </svg>

                  <!-- Description text below gauge -->
                  <div class="mt-4 text-center">
                    {#if activeTab === 'BMI'}
                      <p class="text-sm text-gray-600">
                        {#if bmiResult < 18.5}
                          You are underweight. Consider consulting a healthcare provider about healthy weight gain strategies.
                        {:else if bmiResult < 24.9}
                          Your BMI is within the healthy range. Keep maintaining your healthy lifestyle!
                        {:else if bmiResult < 29.9}
                          You are in the overweight range. Consider moderate lifestyle changes for better health.
                        {:else}
                          Your BMI indicates obesity. We recommend consulting a healthcare provider for personalized advice.
                        {/if}
                      </p>
                    {:else}
                      <p class="text-sm text-gray-600">
                        Your Basal Metabolic Rate is {bmrResult} calories per day. This represents the minimum energy needed to maintain basic life functions while at rest.
                        {#if gaugePercentage > 75}
                          This is above average for your gender, indicating a higher metabolic rate.
                        {:else if gaugePercentage < 25}
                          This is below average for your gender, indicating a lower metabolic rate.
                        {:else}
                          This is within the typical range for your gender.
                        {/if}
                      </p>
                    {/if}
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
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
