<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import HowWeHelpYouMobile from "./HowWeHelpYouMobile.svelte";

  const images = {
    nutrition: "gs://addyfitness-db121.appspot.com/NutritionHome.gif",
    mascot: "gs://addyfitness-db121.appspot.com/ExpertTrainingHome.gif",
    running: "gs://addyfitness-db121.appspot.com/FlexibleTraining.gif",
    doctor: "gs://addyfitness-db121.appspot.com/HealthHome.gif",
  };

  const cards = [
    {
      id: 1,
      title: "Nutrition to Fuel Your Journey",
      description:
        "No two bodies are the same, and neither are our nutrition plans. Ready to transform your health journey?",
      image: images.nutrition,
      bgColor: "bg-orange-300",
      link: "/nutrition",
    },
    {
      id: 2,
      title: "Expert Training",
      description:
        "When it comes to fitness and nutrition, having the right support can make all the difference. Our coaches ensuring you stay motivated and on track to meet your goals",
      image: images.mascot,
      bgColor: "bg-purple-400",
      link: "/training",
    },
    {
      id: 3,
      title: "Flexible Gym Management",
      description:
        "Life is busy, and we get that. That's why Addy Fitness offers flexible plans that fit into your schedule, no matter how hectic it gets.",
      image: images.running,
      bgColor: "bg-green-100",
      link: "/management",
    },
    {
      id: 4,
      title: "Comprehensive HealthCare Support",
      description:
        "Collaborating with hospitals and clinics across India to provide in-person medical support and consultations.",
      image: images.doctor,
      bgColor: "bg-gray-100",
      link: "/healthcare",
    },
  ];

  // Helper function to determine if card is wide layout
  const isWideCard = (index) => index === 1 || index === 2;
</script>

<section class="w-full bg-slate-900 px-4 py-16 hidden md:block">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 raleway-font">
        Transform Your Body, Elevate Your Life
      </h2>
      <p class="text-gray-400 baskervville-sc-regular max-w-2xl mx-auto">
        Using basic data skills you can analysis and improve your business
        indicators with Around
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      {#each cards as card, index}
        <div
          class="transition-transform duration-300 hover:scale-[1.02]
                 {isWideCard(index) ? 'md:col-span-7' : 'md:col-span-5'}"
        >
          <!-- Card Container with white background -->
          <div class="bg-white rounded-3xl p-8 h-full flex flex-col">
            <!-- For smaller cards (vertical layout) -->
            {#if !isWideCard(index)}
              <div class="flex flex-col h-full">
                <div
                  class="{card.bgColor} rounded-2xl relative aspect-video overflow-hidden"
                >
                  <img
                    src={gsToHttp(card.image)}
                    alt={card.title}
                    class="w-full h-full object-cover absolute inset-0"
                  />
                </div>
                <div class="flex flex-col flex-grow">
                  <h3 class="text-xl font-bold mb-3 raleway-font">
                    {card.title}
                  </h3>
                  <p class="text-gray-600 mb-6 inter-font">
                    {card.description}
                  </p>
                  <div class="mt-auto flex justify-center">
                    <a
                      href={card.link}
                      class="bg-[#F41952]/80 text-white px-8 py-2.5 rounded-lg
                             hover:bg-[#F41952] transition-all duration-300
                             raleway-font text-sm text-center whitespace-nowrap
                             w-full max-w-[200px]"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            {:else}
              <div class="flex flex-col md:flex-row-reverse md:gap-8 h-full">
                <div
                  class="{card.bgColor} rounded-2xl md:w-1/2 relative aspect-[4/3] overflow-hidden"
                >
                  <img
                    src={gsToHttp(card.image)}
                    alt={card.title}
                    class="w-full h-full object-cover absolute inset-0"
                  />
                </div>
                <div class="md:w-1/2 flex flex-col justify-between">
                  <div>
                    <h3 class="text-xl font-bold mb-3 raleway-font">
                      {card.title}
                    </h3>
                    <p class="text-gray-600 mb-6 inter-font">
                      {card.description}
                    </p>
                  </div>
                  <div class="flex justify-center">
                    <a
                      href={card.link}
                      class="bg-[#F41952]/80 text-white px-8 py-2.5 rounded-lg
                             hover:bg-[#F41952] transition-all duration-300
                             raleway-font text-sm text-center whitespace-nowrap
                             w-full max-w-[200px]"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<HowWeHelpYouMobile {cards} />

<style>
  .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  .baskervville-sc-regular {
    font-family: "Baskervville SC", serif;
    font-weight: 400;
    font-style: normal;
  }

  .inter-font {
    font-family: "Inter", serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
