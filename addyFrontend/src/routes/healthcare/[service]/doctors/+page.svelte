<!-- src/routes/healthcare/[service]/doctors/+page.svelte -->
<script>
    import { healthcareStore } from "$lib/stores/healthstore";
    import { goto } from "$app/navigation";
    import { gsToHttp } from "$lib/CommonComponents/utils.js";

    export let data;

    function handleDoctorSelect(doctor) {
        healthcareStore.setSelectedDoctor(doctor);
        goto("/checkout/healthcare");
    }
</script>

<div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-center">Choose Your Doctor</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.doctors as doctor}
            <div
                class="border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
                <img
                    src={gsToHttp(doctor.image)}
                    alt={doctor.name}
                    class="w-full h-64 object-cover rounded-lg mb-4 object-top"
                />
                <h2 class="text-xl font-semibold mb-2">{doctor.name}</h2>
                <p class="text-gray-600 mb-2">{doctor.specialization}</p>
                <div class="space-y-2 mb-4">
                    <p class="text-sm text-gray-500">
                        ✓ {doctor.experience} experience
                    </p>
                    <p class="text-sm text-gray-500">📍 {doctor.location}</p>
                    <!-- <p class="text-sm text-gray-500">💰 ${doctor.consultationFee}</p> -->
                </div>
                <button
                    on:click={() => handleDoctorSelect(doctor)}
                    class="w-full py-2 bg-[#F41952] text-white rounded-lg hover:bg-[#F41952]/90 transition-colors"
                >
                    Book Appointment
                </button>
            </div>
        {/each}
    </div>
</div>
