<script>
  import ContactForm from "./contactForm.svelte";
  import GetInTouch from "./getInTouch.svelte";
</script>

<svelte:head>
  <title>Contact | AddyFitness</title>
  <meta name="description" content="Join the AddyFitness team and make a difference in people's lives through fitness and wellness." />
</svelte:head>

<div class="flex justify-center p-6 py-20 items-center font-[Montserrat]">
  <!-- <p class="p-4">Contact Us</p> -->
  <div class="flex flex-col-reverse md:flex-row gap-12">
    <GetInTouch />
    <ContactForm />
  </div>
</div>
