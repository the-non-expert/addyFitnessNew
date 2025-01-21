<!-- src/routes/careers/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { Users, Stethoscope, Dumbbell, ChevronRight, Medal, Clock, Heart, Trophy } from 'lucide-svelte';
  
    let isVisible = false;
    
    onMount(() => {
      isVisible = true;
    });
  
    const careers = [
      {
        title: "Personal Trainer",
        icon: Dumbbell,
        description: "Lead transformative fitness journeys and build lasting relationships with clients who are committed to change.",
        responsibilities: [
          "Design personalized workout programs",
          "Track client progress and adapt programs",
          "Provide nutritional guidance",
          "Ensure proper form and technique"
        ],
        perks: [
          "Commission-based earnings potential",
          "Flexible scheduling",
          "Continuing education allowance",
          "Free gym membership"
        ],
        color: "bg-gradient-to-br from-purple-600 to-blue-500"
      },
      {
        title: "Medical Professional",
        icon: Stethoscope,
        description: "Join our integrated health approach combining medical expertise with fitness innovation and lead the charge.",
        responsibilities: [
          "Conduct health assessments",
          "Create rehabilitation programs",
          "Collaborate with trainers",
          "Monitor client health progress"
        ],
        perks: [
          "Competitive salary package",
          "Modern medical facilities",
          "Research opportunities",
          "Work-life balance"
        ],
        color: "bg-gradient-to-br from-emerald-600 to-teal-500"
      },
      {
        title: "Gym Staff",
        icon: Users,
        description: "Be the face of AddyFitness and create exceptional experiences for our community and members.",
        responsibilities: [
          "Maintain facility cleanliness",
          "Assist members with inquiries",
          "Handle membership services",
          "Ensure safety protocols"
        ],
        perks: [
          "Health insurance benefits",
          "Career advancement opportunities",
          "Team bonding events",
          "Fitness certifications"
        ],
        color: "bg-gradient-to-br from-orange-600 to-pink-500"
      }
    ];
  
    const perks = [
      {
        icon: Medal,
        title: "Excellence Rewards",
        description: "Recognition and bonuses for outstanding performance"
      },
      {
        icon: Clock,
        title: "Work-Life Balance",
        description: "Flexible schedules that work around your life"
      },
      {
        icon: Heart,
        title: "Health Benefits",
        description: "Comprehensive medical, dental, and wellness coverage"
      },
      {
        icon: Trophy,
        title: "Growth Path",
        description: "Clear career progression and leadership opportunities"
      }
    ];
  
    let selectedCard = null;
  </script>
  
  <svelte:head>
    <title>Careers | AddyFitness</title>
    <meta name="description" content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness." />
  </svelte:head>
  
  <!-- Hero Section with Parallax -->
  <!-- <div class="relative min-h-screen overflow-hidden">
    <div class="absolute inset-0 z-0">
      <div class="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40 z-10" />
      <img 
        src="/images/careers-hero.jpg" 
        alt="Fitness professionals" 
        class="w-full h-full object-cover"
      />
    </div>
  
    <div class="relative z-20 pt-32 pb-20 px-4 min-h-[80vh] flex items-center">
      <div class="max-w-7xl mx-auto w-full">
        {#if isVisible}
          <div in:fly="{{ y: 50, duration: 1000 }}" class="max-w-3xl">
            <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
              Shape the Future of Fitness
            </h1>
            <p class="text-xl text-gray-200 mb-8 leading-relaxed">
              Join a team of passionate professionals dedicated to transforming lives 
              through innovative health and fitness solutions.
            </p>
            <a 
              href="#opportunities" 
              class="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Explore Opportunities
              <ChevronRight class="ml-2 h-5 w-5" />
            </a>
          </div>
        {/if}
      </div>
    </div>
  </div> -->
  
  <!-- Career Cards Section -->
  <div id="opportunities" class="py-20 px-4 bg-gray-50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Join Our Team</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Find your perfect role in our growing family of health and fitness professionals.
        </p>
      </div>
  
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each careers as career, index}
          <div 
            class="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            on:mouseenter={() => selectedCard = index}
            on:mouseleave={() => selectedCard = null}
          >
            <div class="{career.color} h-2 w-full" />
            <div class="p-8">
              <div class="flex items-center mb-6">
                <svelte:component this={career.icon} class="h-8 w-8 text-gray-700" />
                <h3 class="text-2xl font-bold ml-4 text-gray-900">{career.title}</h3>
              </div>
              
              <p class="text-gray-600 mb-6">{career.description}</p>
  
              <!-- Expandable Content -->
              {#if selectedCard === index}
                <div 
                  transition:fade="{{ duration: 200 }}"
                  class="space-y-6"
                >
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Key Responsibilities</h4>
                    <ul class="space-y-2">
                      {#each career.responsibilities as responsibility}
                        <li class="flex items-start">
                          <ChevronRight class="h-5 w-5 text-blue-500 mt-0.5" />
                          <span class="ml-2 text-gray-600">{responsibility}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
  
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">Perks & Benefits</h4>
                    <ul class="space-y-2">
                      {#each career.perks as perk}
                        <li class="flex items-start">
                          <ChevronRight class="h-5 w-5 text-blue-500 mt-0.5" />
                          <span class="ml-2 text-gray-600">{perk}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
              {/if}
  
              <button 
                class="mt-8 w-full px-6 py-3 text-white font-semibold rounded-lg {career.color} hover:opacity-90 transition-opacity duration-300"
              >
                Apply Now
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <!-- Company Perks Section -->
  <div class="py-20 px-4 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Why Choose AddyFitness?</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          We believe in creating an environment where you can thrive personally and professionally.
        </p>
      </div>
  
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {#each perks as perk}
          <div class="text-center">
            <div class="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svelte:component this={perk.icon} class="h-8 w-8 text-blue-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{perk.title}</h3>
            <p class="text-gray-600">{perk.description}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
  
  <style>
    /* Add any custom styles here */
  </style>