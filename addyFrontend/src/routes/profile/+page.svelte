<script>
  import { user } from "$lib/stores/userStore.js";
  import { token } from "$lib/stores/auth.js";
  import { clearAuth } from "$lib/stores/auth.js"; 
  import { goto } from "$app/navigation";
  import {
    fetchUserProfile,
    updateUserProfile,
  } from "$lib/services/profile.js";
  import {
    Edit2,
    Save,
    User,
    Upload,
    Loader,
    X,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Activity,
    Heart,
    Clock,
    Star,
    AlertCircle,
    Coffee,
  } from "lucide-svelte";
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  let isEditing = false;
  let isLoading = false;
  let error = null;
  let success = null;
  let fileInput;
  let originalUserData = null;

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
    emergency_contact_number: "",
    preferred_workout_time: "",
    experience_level: "",
    reports: null,
  };

  onMount(async () => {
    try {
      isLoading = true;
      const profile = await fetchUserProfile($token);
      userData = { ...userData, ...profile };
      originalUserData = { ...userData };
    } catch (err) {
      error = err.message;
    } finally {
      isLoading = false;
    }
  });

  async function handleSave() {
    try {
      isLoading = true;
      await updateUserProfile(userData, $token);
      success = "Profile updated successfully!";
      error = null;
      originalUserData = { ...userData };
      setTimeout(() => (success = null), 3000);
    } catch (err) {
      error = "Failed to save changes";
      console.error(err);
    } finally {
      isLoading = false;
      isEditing = false;
    }
  }

  function handleCancel() {
    userData = { ...originalUserData };
    isEditing = false;
    error = null;
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
      userData.reports = file;
    }
  }

  function handleSignOut(event){
    clearAuth();

    goto("/")
  }

  const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const workoutTimes = [
    "Early Morning",
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
  ];
</script>

<div class="min-h-screen bg-gray-50/50 py-12">
  <div class="container mx-auto px-4">
    {#if error}
      <div
        class="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6"
        role="alert"
        transition:fly={{ y: -20, duration: 300 }}
      >
        <div class="flex items-center">
          <AlertCircle class="text-red-400 mr-3" size={20} />
          <span class="text-red-700">{error}</span>
        </div>
      </div>
    {/if}

    {#if success}
      <div
        class="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mb-6"
        role="alert"
        transition:fly={{ y: -20, duration: 300 }}
      >
        <span class="text-green-700">{success}</span>
      </div>
    {/if}

    <!-- Header Section -->
    <div class="bg-white rounded-xl shadow-sm p-8 mb-8" transition:fade>
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
      >
        <div class="flex items-center gap-6">
          <div class="relative group">
            <div
              class="w-28 h-28 bg-gradient-to-br from-[#F41A53] to-pink-600 rounded-full flex items-center justify-center text-white transform transition-all duration-300 hover:scale-105"
            >
              <User size={48} />
            </div>
            {#if isEditing}
              <button
                class="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Upload size={16} class="text-[#F41A53]" />
              </button>
            {/if}
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-1">
              {userData.full_name || "Complete your profile"}
            </h1>
            <p class="text-gray-500 flex items-center gap-2">
              <Star size={16} />
              Member since {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <button
          on:click={handleSignOut}
            class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-black/80 hover:bg-black transition-all duration-300 shadow-lg hover:shadow-xl"
            >Sign Out</button
          >

          {#if isEditing}
            <button
              on:click={handleCancel}
              class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300"
            >
              <X size={20} />
              Cancel
            </button>
            <button
              on:click={handleSave}
              disabled={isLoading}
              class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-[#F41A53] hover:bg-[#d91447] transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl"
            >
              {#if isLoading}
                <Loader class="animate-spin" size={20} />
              {:else}
                <Save size={20} />
              {/if}
              Save Changes
            </button>
          {:else}
            <button
              on:click={() => (isEditing = true)}
              class="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white bg-[#F41A53] hover:bg-[#d91447] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Edit2 size={20} />
              Edit Profile
            </button>
          {/if}
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Column -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Personal Information -->
        <div class="bg-white rounded-xl shadow-sm p-8" transition:fade>
          <div class="flex items-center gap-3 mb-6">
            <User class="text-[#F41A53]" size={24} />
            <h3 class="text-xl font-semibold text-gray-900">
              Personal Information
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600">Full Name</label>
              {#if isEditing}
                <input
                  type="text"
                  bind:value={userData.full_name}
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {userData.full_name || "Not provided"}
                </p>
              {/if}
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600">Email</label>
              <div class="flex items-center gap-2">
                <Mail size={16} class="text-gray-400" />
                <input
                  type="email"
                  bind:value={userData.email}
                  disabled
                  class="w-full p-3 bg-gray-50 border rounded-lg text-gray-600"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600">Phone</label>
              <div class="flex items-center gap-2">
                <Phone size={16} class="text-gray-400" />
                {#if isEditing}
                  <input
                    type="tel"
                    bind:value={userData.phone}
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                    placeholder="Enter phone number"
                  />
                {:else}
                  <p class="text-gray-900 p-3 bg-gray-50 rounded-lg w-full">
                    {userData.phone || "Not provided"}
                  </p>
                {/if}
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Date of Birth</label
              >
              <div class="flex items-center gap-2">
                <Calendar size={16} class="text-gray-400" />
                {#if isEditing}
                  <input
                    type="date"
                    bind:value={userData.date_of_birth}
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                  />
                {:else}
                  <p class="text-gray-900 p-3 bg-gray-50 rounded-lg w-full">
                    {userData.date_of_birth
                      ? new Date(userData.date_of_birth).toLocaleDateString()
                      : "Not provided"}
                  </p>
                {/if}
              </div>
            </div>

            <div class="space-y-2 md:col-span-2">
              <label class="text-sm font-medium text-gray-600">Address</label>
              <div class="flex items-center gap-2">
                <MapPin size={16} class="text-gray-400" />
                {#if isEditing}
                  <textarea
                    bind:value={userData.address}
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                    rows="2"
                    placeholder="Enter your address"
                  ></textarea>
                {:else}
                  <p class="text-gray-900 p-3 bg-gray-50 rounded-lg w-full">
                    {userData.address || "Not provided"}
                  </p>
                {/if}
              </div>
            </div>
          </div>
        </div>

        <!-- Physical Information -->
        <div class="bg-white rounded-xl shadow-sm p-8" transition:fade>
          <div class="flex items-center gap-3 mb-6">
            <Activity class="text-[#F41A53]" size={24} />
            <h3 class="text-xl font-semibold text-gray-900">
              Physical Information
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each [["height", "Height (cm)", "Enter height"], ["weight", "Weight (kg)", "Enter weight"]] as [key, label, placeholder]}
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-600">{label}</label>
                {#if isEditing}
                  <input
                    type="number"
                    bind:value={userData[key]}
                    class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                    {placeholder}
                  />
                {:else}
                  <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                    {userData[key]
                      ? `${userData[key]} ${key === "height" ? "cm" : "kg"}`
                      : "Not provided"}
                  </p>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <!-- Health Information -->
        <div class="bg-white rounded-xl shadow-sm p-8" transition:fade>
          <div class="flex items-center gap-3 mb-6">
            <AlertCircle class="text-[#F41A53]" size={24} />
            <h3 class="text-xl font-semibold text-gray-900">
              Health Information
            </h3>
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Medical Conditions</label
              >
              {#if isEditing}
                <textarea
                  bind:value={userData.medical_conditions}
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                  rows="3"
                  placeholder="List any medical conditions"
                ></textarea>
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {userData.medical_conditions ||
                    "No medical conditions listed"}
                </p>
              {/if}
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Dietary Restrictions</label
              >
              {#if isEditing}
                <textarea
                  bind:value={userData.dietary_restrictions}
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                  rows="3"
                  placeholder="List any dietary restrictions"
                ></textarea>
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {userData.dietary_restrictions ||
                    "No dietary restrictions listed"}
                </p>
              {/if}
            </div>

            <!-- Medical Documents -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Medical Documents</label
              >
              {#if isEditing}
                <div class="mt-2">
                  <label
                    class="cursor-pointer group flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F41A53] transition-all duration-300"
                  >
                    <Upload
                      size={20}
                      class="text-gray-400 group-hover:text-[#F41A53]"
                    />
                    <span class="text-gray-600 group-hover:text-[#F41A53]"
                      >Upload Documents</span
                    >
                    <input
                      type="file"
                      class="hidden"
                      accept=".pdf,.doc,.docx"
                      on:change={handleFileUpload}
                      bind:this={fileInput}
                    />
                  </label>
                  {#if userData.reports}
                    <p
                      class="mt-2 text-sm text-gray-600 flex items-center gap-2"
                    >
                      <span>📎</span>
                      {userData.reports.name}
                    </p>
                  {/if}
                </div>
              {:else if userData.reports}
                <div class="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                  <span>📎</span>
                  <span class="text-gray-900">{userData.reports.name}</span>
                </div>
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  No documents uploaded
                </p>
              {/if}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column -->
      <div class="space-y-8">
        <!-- Fitness Goals -->
        <div class="bg-white rounded-xl shadow-sm p-8" transition:fade>
          <div class="flex items-center gap-3 mb-6">
            <Heart class="text-[#F41A53]" size={24} />
            <h3 class="text-xl font-semibold text-gray-900">Fitness Goals</h3>
          </div>

          {#if isEditing}
            <textarea
              bind:value={userData.goals}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
              rows="4"
              placeholder="What are your fitness goals?"
            ></textarea>
          {:else}
            <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
              {userData.goals || "Not provided"}
            </p>
          {/if}
        </div>

        <!-- Workout Preferences -->
        <div class="bg-white rounded-xl shadow-sm p-8" transition:fade>
          <div class="flex items-center gap-3 mb-6">
            <Clock class="text-[#F41A53]" size={24} />
            <h3 class="text-xl font-semibold text-gray-900">
              Workout Preferences
            </h3>
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Preferred Time</label
              >
              {#if isEditing}
                <select
                  bind:value={userData.preferred_workout_time}
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select preferred time</option>
                  {#each workoutTimes as time}
                    <option value={time}>{time}</option>
                  {/each}
                </select>
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {userData.preferred_workout_time || "Not provided"}
                </p>
              {/if}
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Experience Level</label
              >
              {#if isEditing}
                <select
                  bind:value={userData.experience_level}
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select experience level</option>
                  {#each experienceLevels as level}
                    <option value={level}>{level}</option>
                  {/each}
                </select>
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {userData.experience_level || "Not provided"}
                </p>
              {/if}
            </div>
          </div>
        </div>

        <!-- Emergency Contact -->
        <div class="bg-white rounded-xl shadow-sm p-8" transition:fade>
          <div class="flex items-center gap-3 mb-6">
            <Phone class="text-[#F41A53]" size={24} />
            <h3 class="text-xl font-semibold text-gray-900">
              Emergency Contact
            </h3>
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Contact Name</label
              >
              {#if isEditing}
                <input
                  type="text"
                  bind:value={userData.emergency_contact_name}
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                  placeholder="Enter emergency contact name"
                />
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {userData.emergency_contact_name || "Not provided"}
                </p>
              {/if}
            </div>

            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-600"
                >Contact Number</label
              >
              {#if isEditing}
                <input
                  type="tel"
                  bind:value={userData.emergency_contact_number}
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#F41A53] focus:border-transparent transition-all duration-300"
                  placeholder="Enter emergency contact number"
                />
              {:else}
                <p class="text-gray-900 p-3 bg-gray-50 rounded-lg">
                  {userData.emergency_contact_number || "Not provided"}
                </p>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.animate-spin) {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
