<!-- src/routes/careers/+page.svelte -->
<script>
  import { onMount } from "svelte";
  import { fade, fly, slide } from "svelte/transition";
  import {
    Users,
    Stethoscope,
    Dumbbell,
    ChevronRight,
    Medal,
    Clock,
    Heart,
    Trophy,
    ArrowRight,
  } from "lucide-svelte";
  import FlipCareerCard from "$lib/Components/FlipCareerCard.svelte";

  let isVisible = false;
  let activeTab = "opportunities";

  onMount(() => {
    isVisible = true;
  });

  const careers = [
    {
      title: "Personal Trainer",
      icon: Dumbbell,
      image: "/images/careers/personal-trainer.jpg",
      description:
        "Lead transformative fitness journeys and build lasting relationships with clients who are committed to change.",
      responsibilities: [
        "Design personalized workout programs",
        "Track client progress and adapt programs",
        "Provide nutritional guidance",
        "Ensure proper form and technique",
      ],
      perks: [
        "Commission-based earnings potential",
        "Flexible scheduling",
        "Continuing education allowance",
        "Free gym membership",
      ],
      color: "bg-gradient-to-br from-purple-600 to-blue-500",
      // salary: "$45,000 - $75,000",
      location: "Multiple Locations",
      type: "Full-time",
    },
    {
      title: "Medical Professional",
      icon: Stethoscope,
      image: "/images/careers/medical-pro.jpg",
      description:
        "Join our integrated health approach combining medical expertise with fitness innovation and lead the charge.",
      responsibilities: [
        "Conduct health assessments",
        "Create rehabilitation programs",
        "Collaborate with trainers",
        "Monitor client health progress",
      ],
      perks: [
        "Competitive salary package",
        "Modern medical facilities",
        "Research opportunities",
        "Work-life balance",
      ],
      color: "bg-gradient-to-br from-emerald-600 to-teal-500",
      // salary: "$80,000 - $120,000",
      location: "Major Cities",
      type: "Full-time",
    },
    {
      title: "Gym Staff",
      icon: Users,
      image: "/images/careers/gym-staff.jpg",
      description:
        "Be the face of AddyFitness and create exceptional experiences for our community and members.",
      responsibilities: [
        "Maintain facility cleanliness",
        "Assist members with inquiries",
        "Handle membership services",
        "Ensure safety protocols",
      ],
      perks: [
        "Health insurance benefits",
        "Career advancement opportunities",
        "Team bonding events",
        "Fitness certifications",
      ],
      color: "bg-gradient-to-br from-orange-600 to-pink-500",
      // salary: "$30,000 - $45,000",
      location: "All Locations",
      type: "Part-time/Full-time",
    },
  ];

  const perks = [
    {
      icon: Medal,
      title: "Excellence Rewards",
      description:
        "Recognition and bonuses for outstanding performance and achievements. We celebrate success together.",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      stats: "Over $500K awarded in 2023",
    },
    {
      icon: Clock,
      title: "Work-Life Balance",
      description:
        "Flexible schedules and remote work options to help you maintain a healthy work-life integration.",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      stats: "4-day work week options",
    },
    {
      icon: Heart,
      title: "Comprehensive Benefits",
      description:
        "Full medical, dental, vision coverage, plus mental health support and wellness programs.",
      bgColor: "bg-gradient-to-br from-red-50 to-red-100",
      stats: "100% coverage for families",
    },
    {
      icon: Trophy,
      title: "Career Development",
      description:
        "Mentorship programs, learning stipends, and clear paths for advancement in your career.",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      stats: "$5000 yearly learning budget",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Senior Personal Trainer",
      image: "/images/testimonials/sarah.jpg",
      quote:
        "Joining AddyFitness was the best career move I've made. The support and growth opportunities are unmatched.",
      years: "5 years with AddyFitness",
    },
    // Add more testimonials...
  ];
</script>

<svelte:head>
  <title>Careers | AddyFitness</title>
  <meta
    name="description"
    content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness."
  />
</svelte:head>

<!-- Hero Section -->
<!-- <div class="relative h-[80vh] bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden">
  <div class="absolute inset-0">
    <video 
      class="object-cover w-full h-full opacity-30" 
      autoplay 
      loop 
      muted 
      playsinline
    >
      <source src="/videos/fitness-team.mp4" type="video/mp4">
    </video>
  </div>
  
  <div class="relative max-w-7xl mx-auto h-full flex items-center px-4">
    <div class="text-white max-w-3xl" in:fly="{{ y: 50, duration: 1000 }}">
      <h1 class="text-6xl font-bold mb-6 raleway-font leading-tight">
        Transform Lives, <br/>Including Yours
      </h1>
      <p class="text-xl mb-8 montserrat-regular text-gray-300">
        Join a team of passionate individuals dedicated to revolutionizing the fitness industry through innovation and personalized care.
      </p>
      <div class="flex gap-4">
        <button class="bg-[#F41A53] hover:bg-[#d81548] px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
          View Opportunities <ArrowRight class="w-5 h-5" />
        </button>
        <button class="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
          Our Culture
        </button>
      </div>
    </div>
  </div>
</div> -->

<!-- Stats Bar -->
<!-- <div class="bg-[#F41A53] text-white py-8">
  <div class="max-w-7xl mx-auto grid grid-cols-4 gap-8 px-4">
    <div class="text-center">
      <div class="text-4xl font-bold mb-2">500+</div>
      <div class="text-sm opacity-80">Team Members</div>
    </div>
    <div class="text-center">
      <div class="text-4xl font-bold mb-2">50+</div>
      <div class="text-sm opacity-80">Locations</div>
    </div>
    <div class="text-center">
      <div class="text-4xl font-bold mb-2">92%</div>
      <div class="text-sm opacity-80">Employee Satisfaction</div>
    </div>
    <div class="text-center">
      <div class="text-4xl font-bold mb-2">4.8/5</div>
      <div class="text-sm opacity-80">Employee Rating</div>
    </div>
  </div>
</div> -->

<!-- Career Opportunities -->
<div id="opportunities" class="py-20 px-4">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16" in:fly={{ y: 50, duration: 1000 }}>
      <h2 class="text-5xl font-bold text-gray-900 mb-6 raleway-font">
        Open Positions
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto montserrat-regular">
        Find your perfect role and help us shape the future of fitness
      </p>
    </div>

    <!-- Career Cards Section -->
    <div id="opportunities" class="">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each careers as career}
            <FlipCareerCard {career} />
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Benefits Section -->
<div class="py-20 px-4 bg-gray-50">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16" in:fly={{ y: 50, duration: 1000 }}>
      <h2 class="text-5xl font-bold text-gray-900 mb-6 raleway-font">
        Benefits & Culture
      </h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto montserrat-regular">
        We believe in taking care of our team so they can take care of our
        members
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each perks as perk, i}
        <div
          class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          in:fly={{ y: 50, duration: 1000, delay: 200 * (i + 1) }}
        >
          <div
            class="w-16 h-16 bg-[#F41A53] rounded-2xl flex items-center justify-center mb-6"
          >
            <svelte:component this={perk.icon} class="w-8 h-8 text-white" />
          </div>
          <h3 class="text-2xl font-bold mb-4 raleway-font">{perk.title}</h3>
          <p class="text-gray-600 mb-4 montserrat-regular">
            {perk.description}
          </p>
          <!-- <div class="text-sm font-semibold text-[#F41A53]">{perk.stats}</div> -->
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
