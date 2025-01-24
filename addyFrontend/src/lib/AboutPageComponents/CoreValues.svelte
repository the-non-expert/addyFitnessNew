<script>
  const coreValues = [
    {
      id: '01',
      number: '01', 
      title: 'Addressing',
      description: 'Recognizing and meeting individual fitness needs with personalized solutions.',
    },
    {
      id: '02',
      number: '02',
      title: 'Dream',
      description: 'Inspiring individuals to set high achievable goals and vision that unites.',
    },
    {
      id: '03',
      number: '03',
      title: 'Discipline',
      description: 'Emphasizing consistency and dedication to turn dreams into reality.',
    },
    {
      id: '04',
      number: '04',
      title: 'Yourself',
      description: 'Empowering individuals to take ownership of their journey and build confidence.',
    }
  ];
</script>

<div class="w-full py-20">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex flex-col md:flex-row items-center justify-center gap-16">
      <div class="w-72 h-72 rounded-full bg-[#F41A53] flex flex-col items-center justify-center text-white text-center p-8 shadow-lg transform hover:scale-105 transition-transform duration-300">
        <p class="text-sm uppercase tracking-wider mb-3 montserrat-regular">Our Core Values</p>
        <h2 class="text-3xl font-semibold raleway-font">What Drives Us Forward</h2>
      </div>

      <div class="flex-1 max-w-2xl">
        <ul class="space-y-10">
          {#each coreValues as value}
            <li class="flex items-start gap-6 transform hover:translate-x-2 transition-transform duration-300">
              <span class="text-[#F41A53] font-bold text-xl montserrat-regular">{value.number}</span>
              <div>
                <h3 class="font-semibold text-lg mb-2 raleway-font">{value.title}</h3>
                <p class="text-gray-600 leading-relaxed montserrat-regular">{value.description}</p>
              </div>
            </li>
          {/each}
        </ul>
      </div>
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