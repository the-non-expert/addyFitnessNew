<script>
  import { user } from "$lib/stores/userStore.js";
  import { token } from "$lib/stores/auth.js";
  import { fetchUserProfile, updateUserProfile } from "$lib/services/profile.js";
  import {
    Edit2,
    Save,
    User,
    Upload,
    Loader,
  } from "lucide-svelte";
  import { onMount } from "svelte";

  let isEditing = false;
  let isLoading = false;
  let error = null;
  let fileInput;

  let userData = {
    full_name: "",
    email: $user?.email || "",
    phone: "",
    date_of_birth: "",
    address: "",
    height: "",
    weight: "",
    goals: "",
    medical_conditions: "",
    dietary_restrictions: "",
    emergency_contact_name: "",
    preferred_workout_time: "",
    experience_level: "",
    reports: null
  };

  onMount(async () => {
  console.log('Profile component mounted');
  console.log('Current token:', $token); // Check token at mount

  try {
    isLoading = true;
    console.log('Fetching profile...');
    const profile = await fetchUserProfile($token);
    console.log('Profile received:', profile);
    userData = { ...userData, ...profile };
  } catch (err) {
    console.error('Profile fetch error:', err);
    error = err.message;
  } finally {
    isLoading = false;
  }
});

  async function toggleEdit() {
    if (isEditing) {
      try {
        isLoading = true;
        await updateUserProfile(userData, $token);
        error = null;
      } catch (err) {
        error = "Failed to save changes";
        console.error(err);
      } finally {
        isLoading = false;
      }
    }
    isEditing = !isEditing;
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      // Here you would typically upload to your server
      // For now, we'll just store it in userData
      userData.reports = file;
    }
  }
</script>

<div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    {#if error}
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <span class="block sm:inline">{error}</span>
      </div>
    {/if}

    <!-- Header Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">My Profile</h1>
        <button
          on:click={toggleEdit}
          disabled={isLoading}
          class="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-[#5E17EB] hover:bg-[#4c12c4] transition-colors disabled:opacity-50"
        >
          {#if isLoading}
            <Loader class="animate-spin" size={20} />
          {:else if isEditing}
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
            {userData.full_name || "Complete your profile"}
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
        {#each [
          ["full_name", "Full Name"],
          ["email", "Email"],
          ["phone", "Phone"],
          ["date_of_birth", "Date of Birth"],
          ["address", "Address"]
        ] as [key, label]}
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">{label}</label>
            {#if isEditing}
              <input
                type="text"
                bind:value={userData[key]}
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                on:input={() => userData[key] = userData[key]}  
              />
              {#if key === "date_of_birth"}
                <input
                  type="date"
                  bind:value={userData[key]}
                  class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                  on:input={() => userData[key] = userData[key]}  
                />
              {/if}
            {:else}
              <p class="text-gray-900">{userData[key] || "Not provided"}</p>
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
        {#each [
          ["height", "Height (cm)"],
          ["weight", "Weight (kg)"]
        ] as [key, label]}
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">{label}</label>
            {#if isEditing}
              <input
                type="number"
                bind:value={userData[key]}
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                on:input={() => userData[key] = userData[key]}
              />
            {:else}
              <p class="text-gray-900">{userData[key] || "Not provided"}</p>
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
        {#each [
          ["goals", "Fitness Goals"],
          ["medical_conditions", "Medical Conditions"],
          ["dietary_restrictions", "Dietary Restrictions"],
          ["preferred_workout_time", "Preferred Workout Time"],
          ["experience_level", "Experience Level"]
        ] as [key, label]}
          <div class="space-y-1">
            <label class="text-sm font-medium text-gray-500">{label}</label>
            {#if isEditing}
              <textarea
                bind:value={userData[key]}
                class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
                rows="2"
                on:input={() => userData[key] = userData[key]}  
              ></textarea>
            {:else}
              <p class="text-gray-900">{userData[key] || "Not provided"}</p>
            {/if}
          </div>
        {/each}

        <!-- File Upload Section -->
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-500">Medical Reports/Documents</label>
          {#if isEditing}
            <div class="mt-2 flex items-center">
              <label
                class="cursor-pointer flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Upload size={20} />
                Upload Files
                <input
                  type="file"
                  class="hidden"
                  accept=".pdf,.doc,.docx"
                  on:change={handleFileUpload}
                  bind:this={fileInput}
                />
              </label>
              {#if userData.reports}
                <span class="ml-2 text-sm text-gray-600">{userData.reports.name}</span>
              {/if}
            </div>
          {:else if userData.reports}
            <p class="text-gray-900">{userData.reports.name}</p>
          {:else}
            <p class="text-gray-900">No documents uploaded</p>
          {/if}
        </div>
      </div>
    </div>

    <!-- Emergency Contact Section  -->
    <div class="border-t mt-6 pt-6">
      <h4 class="text-lg font-semibold mb-4 text-gray-900">Emergency Contact</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-500">Contact Name</label>
          {#if isEditing}
            <input
              type="text"
              bind:value={userData.emergency_contact_name}
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
              placeholder="Enter contact name"
            />
          {:else}
            <p class="text-gray-900">{userData.emergency_contact_name || "Not provided"}</p>
          {/if}
        </div>
    
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-500">Contact Number</label>
          {#if isEditing}
            <input
              type="tel"
              bind:value={userData.emergency_contact_number}
              class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#5E17EB] focus:border-transparent"
              placeholder="Enter contact number"
            />
          {:else}
            <p class="text-gray-900">{userData.emergency_contact_number || "Not provided"}</p>
          {/if}
        </div>
      </div>
    </div>
    
  </div>
</div>