<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  let community = "gs://addyfitness-db121.appspot.com/Community.jpg";
</script>

<div
  class="mt-10 md:px-64 p-10 bg-[#F4F6F8] flex md:flex-row flex-col-reverse items-center md:gap-24 gap-10"
>
  <div class="flex flex-col md:items-start items-center">
    <p class="text-4xl text-center md:text-left">
      Surround Yourself with the Right People
    </p>
    <button class="bg-black text-white md:px-10 px-5 py-3 rounded-xl mt-5"
      >Join the Addy Fitness Community
    </button>
  </div>
  <img src={gsToHttp(community)} alt="" class="w-96 rounded" />
</div>
