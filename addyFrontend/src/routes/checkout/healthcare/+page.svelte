<script>
  import { onMount } from "svelte";
  import { healthcareStore } from "$lib/stores/healthStore";
  import { profileStore } from "$lib/stores/profileStore";
  import { loadRazorpay, initializeRazorpay } from "$lib/utils/paymentUtils";
  import { createOrder } from "$lib/services/paymentService";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { token } from "$lib/stores/auth.js";
  import { gsToHttp } from "$lib/CommonComponents/utils.js";
  import {
    createAppointment,
    updateAppointment,
  } from "$lib/services/appointment.js";

  let mounted = false;
  let isLoading = true;
  let error = null;
  let selectedDate = "";
  let selectedTime = "";

  let formData = {
    full_name: "",
    phone: "",
    address: "",
    appointment_date: "",
    appointment_time: "",
  };

  // Time slots (you can make this dynamic later)
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ];

  onMount(async () => {
    mounted = true;
    isLoading = true; // Set loading state at the start
    try {
      await loadRazorpay();
      if (!$healthcareStore.serviceData) {
        goto("/healthcare");
        return;
      }

      if ($profileStore) {
        formData = {
          ...formData,
          full_name: $profileStore.full_name,
          phone: $profileStore.phone,
          address: $profileStore.address,
        };
      }
    } catch (err) {
      console.error("Error in checkout mount:", err);
      error = "Failed to load payment system";
      goto("/healthcare");
    } finally {
      isLoading = false; // Ensure loading state is reset
    }
  });

  async function handlePlaceOrder() {
    try {
      isLoading = true;
      error = null;

      if (!$token) {  // Add token check
        error = "Please sign in to book an appointment";
        goto('/signin');
        return;
      }

      if (!selectedDate || !selectedTime) {
        error = "Please select both appointment date and time";
        return;
      }

      const formattedDate = selectedDate; // already in YYYY-MM-DD format

      // First create the appointment
      const appointmentData = {
        service_name: $healthcareStore.serviceData.name,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        full_name: formData.full_name,
        phone: formData.phone,
        address: formData.address,
      };

      try {
        // Pass token to createAppointment
        const appointment = await createAppointment(appointmentData, $token);

        const appointmentDateTime = new Date(`${selectedDate} ${selectedTime}`);
        const appointmentEndDateTime = new Date(appointmentDateTime);
        appointmentEndDateTime.setHours(appointmentEndDateTime.getHours() + 1);

        const orderData = {
          title: `${$healthcareStore.serviceData.name} Consultation`,
          amount: parseFloat($healthcareStore.serviceData.price),
          start_date: appointmentDateTime,
          end_date: appointmentEndDateTime,
          appointment_id: appointment.id
        };

        // Pass token to createOrder
        const orderDetails = await createOrder(orderData, $token);

        initializeRazorpay(orderDetails, async (result) => {
          // Pass token to updateAppointment
          await updateAppointment(
            appointment.id, 
            { order_id: result.razorpay_order_id },
            $token
          );
          healthcareStore.clear();
          goto("/my-appointments");
        });
      } catch (err) {
        if (err.message.includes('401') || err.message.includes('403')) {
          error = "Session expired. Please sign in again.";
          goto('/signin');
        } else {
          error = "Failed to create appointment. Please try again.";
          console.error(err);
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      error = err.message || "Failed to process payment";
    } finally {
      isLoading = false;
    }
}
</script>

{#if mounted && $healthcareStore?.serviceData}
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Form section -->
      <div class="md:col-span-2 bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-6">Appointment Details</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Personal Information -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600"
              >Full Name<span class="text-red-500">*</span></label
            >
            <input
              type="text"
              bind:value={formData.full_name}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600"
              >Phone<span class="text-red-500">*</span></label
            >
            <input
              type="tel"
              bind:value={formData.phone}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              placeholder="Enter phone number"
              required
            />
          </div>

          <!-- Appointment Date -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600"
              >Preferred Date<span class="text-red-500">*</span></label
            >
            <input
              type="date"
              bind:value={selectedDate}
              min={new Date().toISOString().split("T")[0]}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          <!-- Appointment Time -->
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-600"
              >Preferred Time<span class="text-red-500">*</span></label
            >
            <select
              bind:value={selectedTime}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              required
            >
              <option value="">Select a time slot</option>
              {#each timeSlots as slot}
                <option value={slot}>{slot}</option>
              {/each}
            </select>
          </div>

          <div class="space-y-2 md:col-span-2">
            <label class="text-sm font-medium text-gray-600"
              >Address <span class="text-red-500">*</span></label
            >
            <textarea
              bind:value={formData.address}
              class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
              rows="2"
              placeholder="Enter your address"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Summary section -->
      <div class="bg-white p-6 rounded-lg shadow h-fit">
        <h2 class="text-xl font-semibold mb-4">Appointment Summary</h2>

        {#if $healthcareStore.serviceData}
          <!-- Service Image -->
          <div class="mb-4">
            <img
              src={gsToHttp($healthcareStore.serviceData.image)}
              alt={$healthcareStore.serviceData.name}
              class="w-full md:h-60 h:32 object-cover rounded-lg"
            />
          </div>

          <!-- Service Details -->
          <div class="space-y-3 mb-6">
            <div class="flex justify-between">
              <h3 class="font-medium">{$healthcareStore.serviceData.name}</h3>
              <span class="font-medium"
                >₹{$healthcareStore.serviceData.price}/-</span
              >
            </div>

            <div class="text-sm text-gray-600">
              <p>Service: {$healthcareStore.serviceData.description}</p>
              {#if selectedDate && selectedTime}
                <p>
                  Appointment: {new Date(selectedDate).toLocaleDateString()} at {selectedTime}
                </p>
              {/if}
            </div>
          </div>

          <hr class="my-4" />

          <!-- Total -->
          <div class="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span>₹{$healthcareStore.serviceData.price}/-</span>
          </div>

          <!-- Error message -->
          {#if error}
            <div class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          {/if}

          <hr class="mb-6" />

          <!-- Place Order Button -->
          <button
            class="w-full bg-[#F41A53]/80 text-white py-3 rounded-lg mb-4 hover:bg-[#F41A53] transition-all duration-300 disabled:bg-gray-400"
            on:click={handlePlaceOrder}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Confirm Appointment"}
          </button>

          <p class="text-xs text-gray-500 text-center">
            By confirming your appointment, you agree to AddyFitness's
            <a href="/terms" class="text-blue-600 hover:underline"
              >Terms of Service</a
            >
          </p>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-lg">Loading...</p>
  </div>
{/if}
