<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  let logo = "gs://addyfitness-db121.appspot.com/LOGO WHITE.png";
</script>

<footer class="bg-[#101828] text-white py-12">
  <div
    class="max-w-7xl mx-auto md:px-20 px-7 flex flex-col md:flex-row gap-5 justify-between"
  >
    <!-- Company Info -->
    <div class="space-y-6">
      <div
        class="space-y-2 flex flex-col justify-center items-center text-center"
      >
        <!-- Logo -->
        <img src={gsToHttp(logo)} alt="Addy Fitness" class="md:w-36 w-16" />

        <!-- Tagline -->
        <p class="text-white font-bold">The Complete Health Solution</p>
      </div>

      <!-- Contact Info -->
      <div class="space-y-3">
        <a
          href="tel:+919861787335"
          class="flex items-center text-white transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          +91 98617 87335
        </a>
        <a
          href="mailto:addyfitness21@gmail.com"
          class="flex items-center text-white transition-colors"
        >
          <svg
            class="w-5 h-5 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 6l-10 7L2 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          help@addyfitness.com
        </a>
      </div>

      <!-- Social Links -->
      <div class="flex space-x-4">
        <a href="#" class="text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            />
          </svg>
        </a>
        <a
          href="https://wa.me/9861787335"
          target="_blank"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/company/addy-fitness/"
          target="_blank"
          class="text-gray-400 hover:text-white transition-colors"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
      </div>
    </div>
    <div class="grid grid-cols-2 mt-10 md:grid-cols-3 gap-10">
      <!-- Company Links -->
      <div class="flex flex-col">
        <h3 class="text-lg font-semibold mb-2">Company</h3>
        <ul class="space-y-2">
          <li>
            <a
              href="/signin"
              class="text-gray-400 hover:text-white transition-colors"
              >Sign In</a
            >
          </li>
          <li>
            <a
              href="/careers"
              class="text-gray-400 hover:text-white transition-colors"
              >Careers</a
            >
          </li>
          <li>
            <a
              href="/about"
              class="text-gray-400 hover:text-white transition-colors"
              >About us</a
            >
          </li>
          <li>
            <a
              href="/contact"
              class="text-gray-400 hover:text-white transition-colors"
              >Contact us</a
            >
          </li>
        </ul>
      </div>

      <!-- Services -->
      <div>
        <h3 class="text-lg font-semibold mb-2">Services</h3>
        <ul class="space-y-2">
          <li>
            <a
              href="/training"
              class="text-gray-400 hover:text-white transition-colors"
              >Training</a
            >
          </li>
          <li>
            <a
              href="/nutrition"
              class="text-gray-400 hover:text-white transition-colors"
              >Nutrition</a
            >
          </li>
          <li>
            <a
              href="/healthcare"
              class="text-gray-400 hover:text-white transition-colors"
              >Healthcare</a
            >
          </li>
          <li>
            <a
              href="/management"
              class="text-gray-400 hover:text-white transition-colors"
              >Management</a
            >
          </li>
        </ul>
      </div>

      <!-- Legal -->
      <div class="">
        <h3 class="text-lg font-semibold mb-2">Legal</h3>
        <ul class="space-y-2">
          <li>
            <a
              href="/terms&conditions"
              class="text-gray-400 hover:text-white transition-colors"
              >Terms & Conditions</a
            >
          </li>
          <li>
            <a
              href="/privacy"
              class="text-gray-400 hover:text-white transition-colors"
              >Privacy</a
            >
          </li>
          <li>
            <a
              href="/cancellation&refunds"
              class="text-gray-400 hover:text-white transition-colors"
              >Refund & Cancellation</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>
