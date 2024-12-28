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
</script>

<section class="w-full bg-[#FAF9FF] py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-16">
      <h2 class="text-[2rem] font-bold mb-2 raleway-font text-slate-900">
        {activeTab} Calculator
      </h2>
      <p class="text-gray-600 text-base">
        Choose the perfect plan for your fitness needs. Flexible and easy to
        follow
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

            <!-- Placeholder for gauge -->
            <div class="mt-8 w-full aspect-[2/1]">
              <!-- Gauge will go here -->
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
