<script>
  import AboutUsHero from "../../lib/AboutPageComponents/AboutUsHero.svelte";
  import MemberSection from "../../lib/AboutPageComponents/MemberSection.svelte";
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import CoreValues from "../../lib/AboutPageComponents/CoreValues.svelte";
  import MissionVision from "../../lib/AboutPageComponents/MissionVision.svelte";
</script>

<svelte:head>
  <title>About | AddyFitness</title>
  <meta
    name="description"
    content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness."
  />
</svelte:head>

<div class="w-full mt-10">
  <AboutUsHero />
  <CoreValues />
  <div class="w-full flex items-center justify-center py-5 px-4">
    <div class="flex items-center w-full max-w-6xl">
      <div class="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#F41A53] to-transparent opacity-30"></div>
      <div class="mx-4">
        <div class="w-3 h-3 rounded-full bg-[#F41A53] animate-pulse"></div>
      </div>
      <div class="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#F41A53] to-transparent opacity-30"></div>
    </div>
  </div>
  <MissionVision/>
  <MemberSection />

</div>
