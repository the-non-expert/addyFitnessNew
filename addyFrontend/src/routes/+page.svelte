<script>
  import BmrBmiCalculator from "../lib/HomePageComponents/BmrBmiCalculator.svelte";
  import HomePageHero from "../lib/HomePageComponents/HomePageHero.svelte";
  import HowWeHelpYou from "../lib/HomePageComponents/HowWeHelpYou.svelte";
  import JoinCommunity from "../lib/HomePageComponents/JoinCommunity.svelte";
</script>
<svelte:head>
  <title>Home | AddyFitness</title>
  <meta name="description" content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness." />
</svelte:head>
<div>
  <HomePageHero />
  <!-- <HowWeHelpYou /> -->
  <BmrBmiCalculator />
  <JoinCommunity />
</div>
