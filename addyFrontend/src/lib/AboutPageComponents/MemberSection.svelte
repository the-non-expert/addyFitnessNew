<script>
  import IndividualMemberCard from "$lib/AboutPageComponents/IndividualMemberCard.svelte";

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
      name: "Swastik Pattnaik",
      designation: "Lead Physician",
      qualifications: "MBBS(Utkal) DGO CPCDM",
      image: "gs://addyfitness-db121.appspot.com/SwastikP.jpeg",
    },
    {
      id: 3,
      name: "Ayush Jhunjhunwala",
      designation: "CTO",
      qualifications: "Software Developer",
      image:
        "gs://addyfitness-db121.appspot.com/WhatsApp Image 2021-03-10 at 7.59.46 PM.jpeg",
      linkedin: "https://linkedin.com/in/ayush-jhunjhunwala-724472163/",
      email: "ayushjhun13@gmail.com",
    },
    {
      id: 4,
      name: "Shreemantha Triptahy",
      designation: "Advisor",
      qualifications: "Asst. Mathematics Prof, OUTR",
      image: "gs://addyfitness-db121.appspot.com/STripathy.jpeg",
    },
  ];
</script>

<!-- members  -->
<div class="text-center md:p-10 p-5">

  <p class="text-[#F41A53] font-semibold text-3xl mt-10">
    Say Hello to the people behind AddyFitness
  </p>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10 md:px-16">
    {#each foundingMembers as item (item.id)}
      <IndividualMemberCard data={item} />
    {/each}
  </div>
</div>
