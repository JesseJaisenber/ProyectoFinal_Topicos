<script setup lang="ts">
import SubscriptionCard from "@/components/SubscriptionCard.vue";
import SubscriptionForm from "@/components/SubscriptionForm.vue";
import { useSubscriptions } from "@/composables/useSubscriptions";
import { onMounted } from "vue";

const {
  BASE_CURRENCY,
  subscriptions,
  formState,
  isEditing,
  totalMonthlyInBase,
  totalCount,
  startCreate,
  startEdit,
  saveSubscription,
  removeSubscription,
  resetForm,
  monthlyAmountFor,
  fetchSubscriptions,
} = useSubscriptions();

onMounted(() => {
  fetchSubscriptions();
});
</script>

<template>
  <section class="space-y-6">
    <header class="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-indigo-600/90 to-sky-500/90 p-5 text-slate-50 shadow-md">
      <div class="flex items-center justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">
            SubTracker
          </h1>
          <p class="text-xs text-indigo-100">
            Visualiza tus suscripciones recurrentes y su impacto mensual.
          </p>
        </div>
        <div class="text-right">
          <p class="text-xs uppercase tracking-wide text-indigo-100">
            Gasto mensual estimado
          </p>
          <p class="text-2xl font-extrabold">
            {{ totalMonthlyInBase.toFixed(2) }} {{ BASE_CURRENCY }}
          </p>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3 text-xs text-indigo-100/90">
        <span class="rounded-full bg-slate-950/15 px-3 py-1">
          Suscripciones activas: <strong>{{ totalCount }}</strong>
        </span>
        <span class="rounded-full bg-slate-950/15 px-3 py-1">
          Moneda base: <strong>{{ BASE_CURRENCY }}</strong>
        </span>
        <button
          type="button"
          class="ml-auto rounded-full bg-slate-950/20 px-3 py-1 text-xs font-semibold hover:bg-slate-950/35"
          @click="startCreate()"
        >
          Nueva suscripción
        </button>
      </div>
    </header>

    <div class="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
      <div class="space-y-3">
        <p v-if="subscriptions.length === 0" class="text-sm text-slate-400">
          Aún no tienes suscripciones registradas. Agrega la primera usando el
          formulario.
        </p>

        <div
          v-else
          class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        >
          <SubscriptionCard
            v-for="sub in subscriptions"
            :key="sub.id"
            :subscription="sub"
            :monthly-amount="monthlyAmountFor(sub)"
            :base-currency="BASE_CURRENCY"
            @edit="startEdit"
            @delete="removeSubscription"
          />
        </div>
      </div>

      <SubscriptionForm
        v-model="formState"
        :is-editing="isEditing"
        @submit="saveSubscription"
        @cancel="resetForm()"
      />
    </div>
  </section>
</template>


