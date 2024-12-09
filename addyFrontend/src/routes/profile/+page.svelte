<script>
  import { user } from "$lib/stores/userStore.js";
  import {
    Edit2,
    Save,
    User,
    Mail,
    Phone,
    Calendar,
    MapPin,
    Activity,
    Target,
  } from "lucide-svelte";
  import { onMount } from "svelte";

  let isEditing = false;
  let userData = {
    fullName: "Ayush Jhunjhunwala",
    email: $user?.email || "",
    phone: "+1 234 567 8900",
    dateOfBirth: "1990-01-01",
    address: "123 Fitness Street, Gym City",
    height: "175",
    weight: "70",
    fitnessGoals: "Build muscle and improve endurance",
    medicalConditions: "None",
    dietaryRestrictions: "None",
    emergencyContact: "Jane Doe - +1 234 567 8901",
    preferredWorkoutTime: "Morning",
    experienceLevel: "Intermediate",
  };

  function toggleEdit() {
    isEditing = !isEditing;
    if (!isEditing) {
      // Here you would typically save the changes to your backend
      console.log("Saving changes:", userData);
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">My Profile</h1>
        <button
          on:click={toggleEdit}
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-[#5E17EB] hover:bg-[#4c12c4] transition-colors"
        >
          {#if isEditing}
            <Save size={20} />
            Save Changes
          {:else}
            <Edit2 size={20} />
            Edit Profile
          {/if}
        </button>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <div
          class="w-24 h-24 bg-[#5E17EB] rounded-full flex items-center justify-center text-white"
        >
          <User size={40} />
        </div>
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">
            {userData.fullName}
          </h2>
          <p class="text-gray-500">
            Member since {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>

    <!-- Personal Information -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4 text-gray-900">
        Personal Information
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each Object.entries( { "Full Name": userData.fullName, Email: userData.email, Phone: userData.phone, "Date of Birth": userData.dateOfBirth, Address: userData.address } ) as [label, value]}
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">{label}</label>
            {#if isEditing}
              <input
                type="text"
                bind:value={userData[label.toLowerCase().replace(" ", "")]}
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
              />
            {:else}
              <p class="text-gray-900">{value}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Physical Information -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4 text-gray-900">
        Physical Information
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each Object.entries( { "Height (cm)": userData.height, "Weight (kg)": userData.weight } ) as [label, value]}
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">{label}</label>
            {#if isEditing}
              <input
                type="number"
                bind:value={userData[label.split(" ")[0].toLowerCase()]}
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
              />
            {:else}
              <p class="text-gray-900">{value}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Fitness Information -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4 text-gray-900">
        Fitness Information
      </h3>
      <div class="grid grid-cols-1 gap-6">
        {#each Object.entries( { "Fitness Goals": userData.fitnessGoals, "Medical Conditions": userData.medicalConditions, "Dietary Restrictions": userData.dietaryRestrictions, "Emergency Contact": userData.emergencyContact, "Preferred Workout Time": userData.preferredWorkoutTime, "Experience Level": userData.experienceLevel } ) as [label, value]}
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">{label}</label>
            {#if isEditing}
              <textarea
                bind:value={userData[label.toLowerCase().replace(" ", "")]}
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                rows="2"
              ></textarea>
            {:else}
              <p class="text-gray-900">{value}</p>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  /* Add any additional custom styles here */
  :global(.montserrat-regular) {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
  }
</style>
