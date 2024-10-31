<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  const images = {
    nutrition: "gs://addyfitness-db121.appspot.com/nutritionFuel.png",
    mascot: "gs://addyfitness-db121.appspot.com/experttraining.png",
    running: "gs://addyfitness-db121.appspot.com/flexibleTraining.png",
    doctor: "gs://addyfitness-db121.appspot.com/support.png",
  };

  const cards = [
    {
      title: "Nutrition to Fuel Your Journey",
      description:
        "No two bodies are the same, and neither are our nutrition plans. Ready to transform your health journey?",
      image: images.nutrition,
      bgColor: "bg-orange-300",
      link: null,
    },
    {
      title: "Expert Training and Nutrition Plans",
      description:
        "When it comes to fitness and nutrition, having the right support can make all the difference. Our coaches ensuring you stay motivated and on track to meet your goals",
      image: images.mascot,
      bgColor: "bg-purple-400",
      link: "/learn-more",
    },
    {
      title: "Flexible Training for Every Schedule",
      description:
        "Life is busy, and we get that. That's why Addy Fitness offers flexible plans that fit into your schedule, no matter how hectic it gets.",
      image: images.running,
      bgColor: "bg-green-100",
      link: "/learn-more",
    },
    {
      title: "Comprehensive Support",
      description:
        "Collaborating with hospitals and clinics across India to provide in-person medical support and consultations.",
      image: images.doctor,
      bgColor: "bg-gray-100",
      link: null,
    },
  ];

  // Helper function to determine if card is wide layout
  const isWideCard = (index) => index === 1 || index === 2;
</script>

<section class="w-full bg-slate-900 px-4 py-16">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4 raleway-font">
        Transform Your Body, Elevate Your Life
      </h2>
      <p class="text-gray-400 baskervville-sc-regular">
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
          <div
            class="bg-white rounded-3xl p-6 h-full
                   {isWideCard(index)
              ? 'md:flex md:flex-row-reverse md:gap-6'
              : 'flex flex-col'}"
          >
            <!-- Image Container -->
            <div
              class="rounded-2xl overflow-hidden {card.bgColor}
                     {isWideCard(index) ? 'md:w-1/2' : 'w-full h-48 mb-6'}"
            >
              <img
                src={gsToHttp(card.image)}
                alt={card.title}
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Content Container -->
            <div
              class={isWideCard(index)
                ? "md:w-1/2 md:flex md:flex-col md:justify-center"
                : "w-full"}
            >
              <h3 class="text-xl font-bold mb-3 raleway-font">{card.title}</h3>
              <p class="text-gray-600 mb-4 baskervville-sc-regular">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

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
</style>
