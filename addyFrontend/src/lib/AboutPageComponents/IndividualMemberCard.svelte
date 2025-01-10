<script>
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import toast from "svelte-french-toast";

  import linkedin from "$lib/Icons/linkedinIconMember.svg";
  import email from "$lib/Icons/emailIconMember.svg";

  export let data;

  const copyEmail = (email) => async () => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email copied to clipboard!", {
        duration: 3000, // Duration in milliseconds
        position: "bottom-center",
        style: `
          background: #333;
          color: white;
          padding: 16px;
          border-radius: 8px;
        `,
      });
    } catch (err) {
      toast.error("Failed to copy email", {
        position: "bottom-center",
        style: "background: #DC2626; color: white;",
      });
      console.error("Failed to copy email:", err);
    }
  };
</script>

<div class="border shadow-md p-5 rounded-xl">
  <p class="font-bold raleway-font text-lg">{data.name}</p>
  <p class="montserrat-regular text-gray-700 text-sm">{data.designation}</p>
  <p class="montserrat-regular text-gray-700 text-sm">{data.qualifications}</p>

  <div class="h-96">
    <img
      src={gsToHttp(data.image)}
      alt=""
      class="rounded-xl mt-2 w-full h-full object-cover"
    />
  </div>

  <div class="flex gap-5 justify-center items-center mt-5">
    <a href={data.linkedin} rel="noopener noreferrer" target="_blank">
      <img src={linkedin} alt="" class="w-6" /></a
    >
    <button on:click={copyEmail(data.email)} class="cursor-pointer">
      <img src={email} alt="Copy Email" class="w-6" />
    </button>
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
