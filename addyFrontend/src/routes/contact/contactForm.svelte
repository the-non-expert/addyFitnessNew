<script>
  // import { myContactForm } from "../../Firebase.js";
  import { writable } from "svelte/store";
  // import { addDoc } from "firebase/firestore";

  const formData = writable({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // console.log("ayush", myContactForm);

  const handleSubmit = async () => {
    console.log("Submit button is getting clicked");

    // const data = $formData; // Get the current value of the form data store

    // console.log(data);

    // try {
    //   // Add the form data to Firestore collection
    //   const docRef = await addDoc(myContactForm, { data });
    //   console.log("Document written with ID: ", docRef.id);

    //   // Optionally, reset the form after successful submission
    //   formData.set({
    //     fullName: "",
    //     email: "",
    //     phone: "",
    //     message: "",
    //   });
    // } catch (error) {
    //   console.error("Error adding form data to Firestore:", error);
    // }
  };
</script>

<div
  class="p-10 w-full md:w-1/2 rounded-xl flex flex-col gap-8 shadow-xl border"
>
  <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
    The
    <span
      class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#5e17eb] relative inline-block"
    >
      <span class="relative text-white">Complete</span>
    </span>
    Health Solution
  </blockquote>

  <form
    on:submit|preventDefault={handleSubmit}
    class="caret-[#5e17eb] text-black flex flex-col gap-4 montserrat-regular"
  >
    <div class="flex flex-col gap-1">
      <p class="">Full Name</p>
      <input
        type="text"
        bind:value={$formData.fullName}
        placeholder="Adnan Ali"
        class="rounded-lg p-2 w-full text-black placeholder:text-sm outline-none border border-black"
      />
    </div>
    <div class="flex flex-col gap-1">
      <p>Email</p>
      <input
        type="text"
        bind:value={$formData.email}
        placeholder="addyfitness21@gmail.com"
        class="rounded-lg p-2 w-full text-black placeholder:text-sm outline-none border border-black"
      />
    </div>
    <div class="flex flex-col gap-1">
      <p>Phone</p>
      <input
        required
        type="tel"
        bind:value={$formData.phone}
        placeholder="98617 87335"
        class="rounded-lg p-2 w-full text-black placeholder:text-sm outline-none border border-black"
      />
    </div>
    <div class="flex flex-col gap-1">
      <p class="font-bold">How can we help you!</p>
      <textarea
        type="text"
        bind:value={$formData.message}
        placeholder="Leave us a Message..."
        class="rounded-lg p-2 w-full text-black placeholder:text-sm outline-none border border-black"
      />
    </div>
    <button
      class="bg-[#242124] text-white rounded-lg h-12 w-full hover:text-[#5e17eb] hover:border hover:border-black hover:bg-white font-bold"
      type="submit">Send Message</button
    >
  </form>
</div>

<style>
  /* .raleway-font {
    font-family: "Raleway", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  } */

  .montserrat-regular {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
