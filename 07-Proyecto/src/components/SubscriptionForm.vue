<script setup lang="ts">
import type { Currency, Frequency } from "@/types/Subscription";
import type { SubscriptionFormState } from "@/composables/useSubscriptions";

const props = defineProps<{
  modelValue: SubscriptionFormState;
  isEditing: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: SubscriptionFormState): void;
  (e: "submit"): void;
  (e: "cancel"): void;
}>();

const updateField = <K extends keyof SubscriptionFormState>(
  key: K,
  value: SubscriptionFormState[K]
) => {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
};

const frequencies: { label: string; value: Frequency }[] = [
  { label: "Mensual", value: "monthly" },
  { label: "Anual", value: "annual" },
];

const currencies: { label: string; value: Currency }[] = [
  { label: "Lempiras (HNL)", value: "HNL" },
  { label: "Dólares (USD)", value: "USD" },
];
</script>

<template>
  <form
    class="space-y-4 rounded-xl border border-slate-700 bg-slate-800/80 p-4 shadow-sm"
    @submit.prevent="emit('submit')"
  >
    <h2 class="text-lg font-semibold text-slate-50 mb-1">
      {{ isEditing ? "Editar suscripción" : "Nueva suscripción" }}
    </h2>
    <p class="text-xs text-slate-400 mb-2">
      Gestiona tus gastos recurrentes. Todos los importes se normalizan a gasto
      mensual en moneda base.
    </p>

    <div class="grid gap-3 md:grid-cols-2">
      <div class="md:col-span-2">
        <label class="block text-xs font-medium text-slate-300 mb-1">
          Nombre del servicio
        </label>
        <input
          type="text"
          class="w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          placeholder="Netflix, Spotify, Gimnasio..."
          :value="modelValue.name"
          @input="updateField('name', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-300 mb-1">
          Precio
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          class="w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          :value="modelValue.price ?? ''"
          @input="
            updateField(
              'price',
              ($event.target as HTMLInputElement).valueAsNumber || null
            )
          "
        />
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-300 mb-1">
          Moneda
        </label>
        <select
          class="w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          :value="modelValue.currency"
          @change="
            updateField(
              'currency',
              ($event.target as HTMLSelectElement).value as Currency
            )
          "
        >
          <option
            v-for="currency in currencies"
            :key="currency.value"
            :value="currency.value"
          >
            {{ currency.label }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-300 mb-1">
          Frecuencia
        </label>
        <select
          class="w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          :value="modelValue.frequency"
          @change="
            updateField(
              'frequency',
              ($event.target as HTMLSelectElement).value as Frequency
            )
          "
        >
          <option
            v-for="frequency in frequencies"
            :key="frequency.value"
            :value="frequency.value"
          >
            {{ frequency.label }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-medium text-slate-300 mb-1">
          Próxima fecha de pago
        </label>
        <input
          type="date"
          class="w-full rounded-lg border border-slate-600 bg-slate-900/60 px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          :value="modelValue.nextPaymentDate"
          @input="
            updateField(
              'nextPaymentDate',
              ($event.target as HTMLInputElement).value
            )
          "
        />
      </div>
    </div>

    <div class="flex justify-end gap-2 pt-2">
      <button
        type="button"
        class="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-700"
        @click="emit('cancel')"
      >
        Limpiar
      </button>
      <button
        type="submit"
        class="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-slate-50 hover:bg-indigo-700 disabled:opacity-50"
        :disabled="!modelValue.name || modelValue.price === null"
      >
        {{ isEditing ? "Guardar cambios" : "Agregar suscripción" }}
      </button>
    </div>
  </form>
</template>


