<script setup lang="ts">
import type { Subscription } from "@/types/Subscription";

const props = defineProps<{
  subscription: Subscription;
  monthlyAmount: number;
  baseCurrency: string;
}>();

const emit = defineEmits<{
  (e: "edit", id: string): void;
  (e: "delete", id: string): void;
}>();
</script>

<template>
  <article
    class="flex flex-col justify-between rounded-xl border border-slate-700 bg-slate-800/70 p-4 shadow-sm hover:border-indigo-400 hover:shadow-md transition"
  >
    <header class="flex items-center justify-between gap-2 mb-2">
      <h3 class="text-lg font-semibold text-slate-50">
        {{ subscription.name }}
      </h3>
      <span
        class="rounded-full px-2.5 py-0.5 text-xs font-medium"
        :class="subscription.frequency === 'monthly'
          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
          : 'bg-amber-500/10 text-amber-200 border border-amber-500/40'"
      >
        {{ subscription.frequency === "monthly" ? "Mensual" : "Anual" }}
      </span>
    </header>

    <p class="text-sm text-slate-300 mb-3">
      Próximo pago:
      <span class="font-medium text-slate-100">
        {{ new Date(subscription.nextPaymentDate).toLocaleDateString() }}
      </span>
    </p>

    <div class="flex items-end justify-between gap-2">
      <div>
        <p class="text-xs text-slate-400">Importe</p>
        <p class="text-base font-semibold text-slate-50">
          {{ subscription.price.toFixed(2) }} {{ subscription.currency }}
        </p>
        <p class="mt-1 text-xs text-slate-400">
          Equivalente mensual:
          <span class="font-semibold text-indigo-300">
            {{ monthlyAmount.toFixed(2) }} {{ baseCurrency }}
          </span>
        </p>
      </div>

      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-lg border border-slate-600 px-3 py-1 text-xs font-medium text-slate-100 hover:bg-slate-700"
          @click="emit('edit', subscription.id)"
        >
          Editar
        </button>
        <button
          type="button"
          class="rounded-lg bg-rose-600 px-3 py-1 text-xs font-medium text-slate-50 hover:bg-rose-700"
          @click="emit('delete', subscription.id)"
        >
          Eliminar
        </button>
      </div>
    </div>
  </article>
</template>


