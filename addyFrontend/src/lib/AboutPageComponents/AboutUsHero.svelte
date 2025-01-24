<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";

  let heroGif = "gs://addyfitness-db121.appspot.com/AboutGif.gif";
</script>

<div class="w-full md:p-10 p-5 bg-[#FCFDFA] shadow-lg">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    <!-- Image -->
    <div class="flex flex-col justify-center items-center">
      <h1 class="text-4xl md:text-5xl raleway-font font-semibold">
        we design personalized fitness and health plans
      </h1>
      <img
        src={gsToHttp(heroGif)}
        alt="Healthcare Team"
        class="w-full md:h-[400px] h-[200px] object-cover md:object-contain"
      />
    </div>
    <!-- Text Content -->
    <div class="flex flex-col gap-5">
      <p class="text-gray-600 montserrat-regular">
        We are driven by the purpose of redefining how people experience health
        and fitness. Through personalized training programs and evidence-based
        nutrition solutions, we ensure that every individual receives the
        guidance and support needed to unlock their full potential. By focusing
        on the unique needs of our clients, we provide tools and insights that
        foster real, measurable progress, encouraging them to lead healthier,
        more fulfilling lives.
      </p>
      <p class="text-gray-600 montserrat-regular hidden md:block">
        Our commitment extends beyond individuals to the professionals who serve
        them. We design cutting-edge technologies that streamline processes,
        enhance decision-making, and facilitate better care. From advanced
        health monitoring tools to integrated platforms that bridge the gap
        between trainers, healthcare providers, and clients, our solutions
        empower professionals to treat and coach with precision and efficiency.
      </p>
      <p class="text-gray-600 montserrat-regular hidden md:block ">
        At the heart of everything we do is a vision to simplify and elevate the
        wellness experience. We believe that by combining technology with
        personalized care, we can inspire lasting change, ensuring that fitness,
        nutrition, and healthcare are accessible to all. Our mission is to not
        only transform individual lives but to contribute to a healthier, more
        connected world where everyone has the resources and support to thrive.
      </p>
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
