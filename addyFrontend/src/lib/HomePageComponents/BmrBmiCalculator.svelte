<!-- HealthCalculators.svelte -->
<script>
  import { fade } from "svelte/transition";
  import { Activity, Scale } from "lucide-svelte";
  import BmiCalculator from "../Components/bmiCalculator.svelte";
  import BmrCalculator from "../Components/bmrCalculator.svelte";

  let activeCalculator = "BMI";
  let showIntro = true;

  const calculatorInfo = {
    BMI: {
      title: "Body Mass Index (BMI)",
      description:
        "Calculate your BMI to understand if you're at a healthy weight for your height.",
      icon: Scale,
    },
    BMR: {
      title: "Basal Metabolic Rate (BMR)",
      description:
        "Find out how many calories your body burns at rest and plan your nutrition accordingly.",
      icon: Activity,
    },
  };
</script>

<svelte:head>
  <title>Fitness Calculators | BMR & BMI Calculator | AddyFitness</title>
  <meta
    name="description"
    content="Free online BMR and BMI calculators. Calculate your Basal Metabolic Rate (BMR) and Body Mass Index (BMI) to understand your body better and achieve your fitness goals."
  />
  <meta
    name="keywords"
    content="BMR calculator, BMI calculator, fitness calculator, calorie calculator, metabolic rate calculator, body mass index calculator"
  />
  <!-- Open Graph tags for better social sharing -->
  <meta
    property="og:title"
    content="Fitness Calculators | BMR & BMI Calculator"
  />
  <meta
    property="og:description"
    content="Calculate your BMR and BMI instantly with our free online calculators. Get personalized insights and recommendations for your fitness journey."
  />
  <meta property="og:type" content="website" />
  <!-- You can add og:image here pointing to your calculator preview image -->
</svelte:head>

<section class="w-full bg-[#FAF9FF] py-20 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Main Header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold mb-4 raleway-font text-slate-900">
        Fitness Calculators
      </h1>
      <p class="text-gray-600 text-lg max-w-2xl mx-auto">
        Understanding your body's metrics is the first step towards achieving
        your fitness goals. Use our calculators to get personalized insights and
        recommendations.
      </p>
    </div>

    <!-- Calculator Selection Cards -->
    {#if showIntro}
      <div
        class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12"
        transition:fade
      >
        {#each Object.entries(calculatorInfo) as [type, info]}
          <button
            class="p-6 bg-white rounded-2xl border border-gray-200 hover:border-[#F41952]/20 hover:shadow-lg transition-all group"
            class:border-[#F41952]={activeCalculator === type}
            on:click={() => {
              activeCalculator = type; // Simplified without type assertion
              showIntro = false;
            }}
          >
            <div class="flex items-start gap-4">
              <div
                class="p-3 rounded-xl bg-[#F41952]/5 text-[#F41952] group-hover:bg-[#F41952]/10 transition-colors"
              >
                <svelte:component this={info.icon} size={24} strokeWidth={2} />
              </div>
              <div class="text-left">
                <h3 class="text-xl font-semibold mb-2">{info.title}</h3>
                <p class="text-gray-600">{info.description}</p>
              </div>
            </div>
          </button>
        {/each}
      </div>
    {/if}

    <!-- Calculator Navigation -->
    {#if !showIntro}
      <div class="max-w-4xl mx-auto mb-8">
        <div
          class="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200"
        >
          <button
            class="text-sm font-medium hover:text-[#F41952] transition-colors flex items-center gap-2"
            on:click={() => (showIntro = true)}
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Calculators
          </button>
          <div class="flex gap-4">
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              class:text-[#F41952]={activeCalculator === "BMI"}
              class:text-gray-600={activeCalculator !== "BMI"}
              on:click={() => (activeCalculator = "BMI")}
            >
              BMI Calculator
            </button>
            <button
              class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              class:text-[#F41952]={activeCalculator === "BMR"}
              class:text-gray-600={activeCalculator !== "BMR"}
              on:click={() => (activeCalculator = "BMR")}
            >
              BMR Calculator
            </button>
          </div>
        </div>
      </div>
    {/if}

    <!-- Calculator Components -->
    {#if !showIntro}
      <div transition:fade>
        {#if activeCalculator === "BMI"}
          <BmiCalculator />
        {:else}
          <BmrCalculator />
        {/if}
      </div>
    {/if}

    <!-- Additional Resources -->
    <div class="max-w-4xl mx-auto mt-16">
      <div class="bg-white rounded-xl p-8 border border-gray-200">
        <h2 class="text-2xl font-semibold mb-6">Additional Resources</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h3 class="font-medium mb-3">Helpful Articles</h3>
            <ul class="space-y-2">
              <li>
                <a
                  href="/blog/understanding-bmr"
                  class="text-[#F41952] hover:text-[#F41952]/80"
                >
                  Understanding Your BMR: A Complete Guide
                </a>
              </li>
              <li>
                <a
                  href="/blog/bmi-myths"
                  class="text-[#F41952] hover:text-[#F41952]/80"
                >
                  Common BMI Myths Debunked
                </a>
              </li>
              <li>
                <a
                  href="/blog/nutrition-basics"
                  class="text-[#F41952] hover:text-[#F41952]/80"
                >
                  Nutrition Basics for Beginners
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="font-medium mb-3">Expert Support</h3>
            <p class="text-gray-600 mb-4">
              Need personalized guidance? Our fitness experts are here to help
              you achieve your goals.
            </p>
            <a
              href="/contact"
              class="inline-flex items-center text-[#F41952] hover:text-[#F41952]/80 font-medium"
            >
              Contact an Expert
              <svg
                class="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .raleway-font {
    font-family: "Raleway", sans-serif;
  }
</style>
