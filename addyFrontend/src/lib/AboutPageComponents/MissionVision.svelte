<script>
  const cards = [
    {
      icon: "🎯",
      title: "Our Mission",
      tagline: "Building Better Lives",
      description:
        "At Addy Fitness, our mission is to transform lives by making health and wellness accessible, efficient, and deeply integrated into everyday living. With our core belief in 'Building Better Lives,' we are dedicated to empowering individuals to achieve their fitness goals, embrace sustainable nutrition, and prioritize holistic health. We combine innovation, expertise, and technology to create a seamless ecosystem where wellness is not just a destination but a lifelong journey.",
    },
    {
      icon: "✨",
      title: "Our Vision",
      tagline: "Creating a world where health meets simplicity",
      description:
        "At Addy Fitness, our vision is to create a world where health meets simplicity by leveraging technology to transform the way people approach fitness, nutrition, and overall well-being. We aspire to bridge the gap between personal and professional health management, making it easier for individuals to integrate health into their busy lives, while empowering professionals to deliver more efficient, personalized care. Through innovative solutions and data-driven insights, we aim to provide a seamless, accessible ecosystem that supports holistic health, enhances lifestyles, and fosters a culture of lifelong wellness, all under one unified platform.",
    },
  ];
</script>

<div class="w-full py-20 bg-gradient-to-b from-[#FCFDFA] to-white">
  <div class="max-w-6xl mx-auto px-4">
    <div class="grid md:grid-cols-2 gap-10">
      {#each cards as card}
        <div
          class="group hover:transform hover:scale-105 transition-all duration-300"
        >
          <div
            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full relative overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-[#F41A53] rounded-full transform rotate-45"
            ></div>
            <div class="relative z-10">
              <span class="text-4xl mb-6 inline-block">{card.icon}</span>
              <h3
                class="text-2xl font-semibold raleway-font text-gray-800"
              >
                {card.title}
              </h3>
              <p class="mb-4">{card.tagline}</p>
              <div
                class="w-16 h-0.5 bg-[#F41A53] mb-6 transform origin-left group-hover:scale-x-150 transition-transform duration-300"
              ></div>
              <p class="text-gray-600 leading-relaxed montserrat-regular">
                {card.description}
              </p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }

  .montserrat-regular {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
