<script>
  import { onMount } from "svelte";
  import { checkoutStore } from "$lib/stores/checkoutStore";
  import { profileStore } from "$lib/stores/profileStore";
  import { user } from "$lib/stores/userStore";
  import { loadRazorpay, initializeRazorpay } from "$lib/utils/paymentUtils";
  import { createOrder } from "$lib/services/paymentService";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import {
    fetchUserProfile,
    updateUserProfile,
  } from "$lib/services/profile.js";
  import { token } from "$lib/stores/auth.js";

  let mounted = false;
  let isLoading = true;
  let error = null;

  async function loadUserProfile() {
    try {
      const profile = await fetchUserProfile($token);
      profileStore.setProfile(profile);
      console.log(profileStore.subscribe);
    } catch (err) {
      console.error("Error loading profile:", err);
      error = "Failed to load profile data";
    } finally {
      isLoading = false;
    }
  }

  onMount(async () => {
    mounted = true;
    try {
      await loadRazorpay();
      const checkoutData = browser
        ? JSON.parse(localStorage.getItem("checkoutData"))
        : null;
      if (!checkoutData) {
        goto("/training");
        return;
      }

      checkoutStore.setPlanData(checkoutData);
      console.log(checkoutData);
      await loadUserProfile(); // Load user profile data
    } catch (err) {
      console.error("Error in checkout mount:", err);
      console.error("Error loading Razorpay:", err);
      error = "Failed to load payment system";
      goto("/");
    }
  });

  function getDurationInDays(duration) {
    const [number, unit] = duration.split(" ");
    switch (unit.toLowerCase()) {
      case "months":
      case "month":
        return number * 30;
      case "weeks":
      case "week":
        return number * 7;
      default:
        return number;
    }
  }

  async function handlePlaceOrder() {
    try {
      isLoading = true;
      error = null;

      // First update the user profile using the existing service
      try {
        const profileData = {
          ...$profileStore,
          full_name: $profileStore.full_name || null,
          phone: $profileStore.phone || null,
          address: $profileStore.address || null,
          height: $profileStore.height
            ? parseFloat($profileStore.height)
            : null,
          weight: $profileStore.weight
            ? parseFloat($profileStore.weight)
            : null,
          medical_conditions: $profileStore.medical_conditions || null,
          dietary_restrictions: $profileStore.dietary_restrictions || null,
        };

        console.log("Sending profile data:", profileData);

        await updateUserProfile(profileData, $token);

        // Now proceed with payment
        let orderData;

        if ($checkoutStore.planType === "training") {
          orderData = {
            title: `${$checkoutStore.planData.name} - ${$checkoutStore.selectedTrainingType}`,
            amount: $checkoutStore.selectedPlan.price,
            start_date: new Date(),
            end_date: new Date(
              Date.now() +
                getDurationInDays($checkoutStore.selectedPlan.duration) *
                  24 *
                  60 *
                  60 *
                  1000
            ),
          };
        } else {
          // For nutrition plans
          orderData = {
            title: $checkoutStore.planData.name,
            amount: parseInt($checkoutStore.pricing.discounted), // Make sure amount is an integer
            start_date: new Date(),
            end_date: new Date(
              Date.now() +
                getDurationInDays($checkoutStore.pricing.duration) *
                  24 *
                  60 *
                  60 *
                  1000
            ),
          };
        }

        const orderDetails = await createOrder(orderData);

        initializeRazorpay(orderDetails, async (result) => {
          checkoutStore.clear();
          goto("/my-orders");
        });
      } catch (err) {
        console.error("Profile update error:", err);
        error = "Failed to update profile information. Please try again.";
        return;
      }
    } catch (err) {
      console.error("Payment error:", err);
      error = err.message || "Failed to process payment";
    } finally {
      isLoading = false;
    }
  }
</script>

{#if mounted && $checkoutStore?.planData}
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Form section -->
      <div class="md:col-span-2 bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6">Contact Information</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Personal Information -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600">Full Name<span class="text-red-500">*</span></label>
            <input
              type="text"
              bind:value={$profileStore.full_name}
              on:input={(e) =>
                profileStore.updateField("full_name", e.target.value)}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600">Phone<span class="text-red-500">*</span></label>
            <input
              type="tel"
              bind:value={$profileStore.phone}
              on:input={(e) =>
                profileStore.updateField("phone", e.target.value)}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600">Height (cm)<span class="text-red-500">*</span></label>
            <input
              type="number"
              bind:value={$profileStore.height}
              on:input={(e) =>
                profileStore.updateField("height", e.target.value)}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter height"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600">Weight (kg) <span class="text-red-500">*</span></label>
            <input
              type="number"
              bind:value={$profileStore.weight}
              on:input={(e) =>
                profileStore.updateField("weight", e.target.value)}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter weight"
              required
            />
          </div>

          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium text-gray-600">Address <span class="text-red-500">*</span></label>
            <textarea
              bind:value={$profileStore.address}
              on:input={(e) =>
                profileStore.updateField("address", e.target.value)}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              rows="2"
              placeholder="Enter your address"
              required
            ></textarea>
          </div>

          <!-- Health Information -->
          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium text-gray-600"
              >Medical Conditions</label
            >
            <textarea
              bind:value={$profileStore.medical_conditions}
              on:input={(e) =>
                profileStore.updateField("medical_conditions", e.target.value)}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              rows="2"
              placeholder="List any medical conditions"
              required
            ></textarea>
          </div>

          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium text-gray-600"
              >Dietary Restrictions</label
            >
            <textarea
              bind:value={$profileStore.dietary_restrictions}
              on:input={(e) =>
                profileStore.updateField(
                  "dietary_restrictions",
                  e.target.value
                )}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              rows="2"
              placeholder="List any dietary restrictions"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Summary section -->
      <div class="bg-white p-6 rounded-lg shadow h-fit">
        <!-- Summary Section -->
        <h2 class="text-xl font-semibold mb-4">Order Summary</h2>

        {#if $checkoutStore.planData}
          <!-- Plan Image -->
          {#if $checkoutStore.planData.image}
            <div class="mb-4">
              <img
                src={$checkoutStore.planData.image}
                alt={$checkoutStore.planData.name}
                class="w-full md:h-60 h:32 object-cover rounded-lg"
              />
            </div>
          {/if}

          <!-- Plan Details -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <h3 class="font-medium">{$checkoutStore.planData.name}</h3>
              <span class="font-medium"
                >₹{$checkoutStore.planType === "training"
                  ? $checkoutStore.selectedPlan.price
                  : $checkoutStore.pricing.discounted}/-</span
              >
            </div>

            <div class="text-sm text-gray-600">
              <p>
                Duration: {$checkoutStore.planType === "training"
                  ? $checkoutStore.selectedPlan.duration
                  : $checkoutStore.pricing.duration}
              </p>

              {#if $checkoutStore.planType === "training"}
                <p>Training Type: {$checkoutStore.selectedTrainingType}</p>
                <p>Time Slot: {$checkoutStore.selectedTimeSlot}</p>
              {:else}
                <p>Nutritionist: {$checkoutStore.planData.coach}</p>
                <p>Included: {$checkoutStore.planData.included}</p>
              {/if}
            </div>
          </div>

          <hr class="mb-4" />

          <!-- Price Breakdown -->
          <div class="space-y-2 text-sm">
            {#if $checkoutStore.planType === "nutrition"}
              <div class="flex justify-between">
                <span class="text-gray-600">Original Price</span>
                <span class="line-through"
                  >₹{$checkoutStore.pricing.original}/-</span
                >
              </div>
            {/if}
            <div class="flex justify-between">
              <span class="text-gray-600">Plan Price</span>
              <span
                >₹{$checkoutStore.planType === "training"
                  ? $checkoutStore.selectedPlan.price
                  : $checkoutStore.pricing.discounted}/-</span
              >
            </div>
            <!-- Discount Calculation -->
            <div class="flex justify-between">
              <span class="text-gray-600">Discount (15%)</span>
              <span class="text-green-600">
                -₹{Math.round($checkoutStore.pricing.original * 0.15)}/-
              </span>
            </div>
            <!-- GST calculation -->
            <div class="flex justify-between">
              <span class="text-gray-600">GST (18%)</span>
              <span>Included</span>
            </div>
          </div>

          <hr class="my-4" />

          <!-- Total -->
          <div class="flex justify-between font-bold text-lg">
            <span>Order Total:</span>
            <span>
              ₹{(() => {
                if ($checkoutStore.planType === "nutrition") {
                  // Apply 15% discount for nutrition plans
                  const originalPrice = $checkoutStore.pricing.discounted;
                  const discountAmount = Math.round(originalPrice * 0.15);
                  return originalPrice - discountAmount;
                } else {
                  // For training plans, use the selected plan price
                  return $checkoutStore.selectedPlan.price;
                }
              })()}/-
            </span>
          </div>
        {/if}

        <hr class="mb-6" />

        <!-- Place Order Section -->
        <button
          class="w-full bg-[#F41A53]/80 text-white py-3 rounded-lg mb-4 hover:bg-[#F41A53] transition-all duration-300 disabled:bg-gray-400"
          on:click={handlePlaceOrder}
          disabled={isLoading}
        >
          Place your order
        </button>
        <p class="text-xs text-gray-500 text-center mb-6">
          By placing your order, you agree to AddyFitness's
          <a href="/terms" class="text-blue-600 hover:underline"
            >Terms of Service</a
          >
        </p>
      </div>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-lg">Loading...</p>
  </div>
{/if}
