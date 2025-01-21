<!-- src/routes/careers/+page.svelte -->
<script>
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import { Users, Stethoscope, Dumbbell, ChevronRight, Medal, Clock, Heart, Trophy } from 'lucide-svelte';
    import FlipCareerCard from '$lib/components/FlipCareerCard.svelte';
  
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
</script>
  
<svelte:head>
  <title>Careers | AddyFitness</title>
  <meta name="description" content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness." />
</svelte:head>
  
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
      {#each careers as career}
        <FlipCareerCard {career} />
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
            <svelte:component this={perk.icon} class="h-8 w-8 text-[#F41A53]" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{perk.title}</h3>
          <p class="text-gray-600">{perk.description}</p>
        </div>
      {/each}
    </div>
  </div>
</div>