<script>
  import IndividualMemberCard from "../../lib/AboutPageComponents/IndividualMemberCard.svelte";

  let adnan = "gs://addyfitness-db121.appspot.com/AdnanImage.jpeg";
  let stripathy = "gs://addyfitness-db121.appspot.com/STripathy.jpeg";
  let swastik = "gs://addyfitness-db121.appspot.com/SwastikP.jpeg";
  let salini = "gs://addyfitness-db121.appspot.com/Salini.jpeg";

  let foundingMembers = [
    {
      id: 1,
      name: "Adnan Ali",
      designation: "Founder",
      qualifications: "BioTechnoligist, Nutritionist, CPT",
      image: "gs://addyfitness-db121.appspot.com/AdnanImage.jpeg",
    },
    {
      id: 2,
      name: "Shreemantha Triptahy",
      designation: "Advisor",
      qualifications: "Asst. Mathematics Prof, OUTR",
      image: "gs://addyfitness-db121.appspot.com/STripathy.jpeg",
    },
    {
      id: 3,
      name: "Swastik Pattnaik",
      designation: "Lead Physician",
      qualifications: "MBBS(Utkal) DGO CPCDM",
      image: "gs://addyfitness-db121.appspot.com/SwastikP.jpeg",
    },
    {
      id: 4,
      name: "Ayush Jhunjhunwala",
      designation: "CTO",
      qualifications: "Software Developer",
      image:
        "gs://addyfitness-db121.appspot.com/WhatsApp Image 2021-03-10 at 7.59.46 PM.jpeg",
    },
  ];
</script>

<div class="w-full mt-10">
  <!-- Our Mission  -->
  <div class="w-10/12 mx-auto">
    <p class="text-center font-bold raleway-font text-4xl">Our Mission</p>
    <p class="text-center montserrat-regular mt-3">
      Make fitness accessible to everyone, irrespective of their location or
      circumstances. Our online mode of delivery ensures that you can access our
      workouts from the comfort of your own home or anywhere you prefer. We
      understand the challenges of balancing busy schedules, which is why our
      workouts are designed to fit seamlessly into your routine.
    </p>
  </div>

  <!-- About Us  -->
  <div class="w-full mx-auto mt-10 bg-[#F4F6F8] py-10">
    <p class="text-center font-bold raleway-font text-4xl">About Us</p>
    <p class="text-center montserrat-regular mt-3 md:w-7/12 w-10/12 mx-auto">
      Fitness is not just about exercise. It's also about nourishing your body
      with the right nutrition. Our team of expert nutritionists will provide
      personalized nutrition plans tailored to your individual requirements. We
      take a holistic approach to address these health concerns, combining the
      power of workouts and nutrition to enhance your well-being.
    </p>
    <p class="text-center montserrat-regular mt-3 md:w-7/12 w-10/12 mx-auto">
      Our experienced healthcare professionals are just a click away, offering
      virtual consultations and medical guidance for your specific health needs.
      For those who prefer in-person care, we have established partnerships with
      hospitals, clinics, and path labs across the country to ensure that you
      receive top-notch care offline as well.
    </p>
    <p class="text-center montserrat-regular mt-3 md:w-7/12 w-10/12 mx-auto">
      We take pride in our ability to positively impact lives and help our
      clients lead healthier, happier lives. As we continue to expand, we offer
      franchising opportunities pan India, providing existing entities with the
      support and resources they need to grow and thrive.
    </p>
  </div>

  <!-- Founding members  -->
  <div class="text-center md:p-10 p-5">
    <p class="text-4xl font-bold">Our Founding Team</p>
    <p class="text-gray-600 text-sm mt-2">
      Say Hello to the people behind AddyFitness
    </p>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10 md:px-16">
      {#each foundingMembers as item (item.id)}
        <IndividualMemberCard data={item} />
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
