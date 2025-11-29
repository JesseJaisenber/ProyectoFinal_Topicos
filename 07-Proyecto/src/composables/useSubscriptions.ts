import { computed, ref } from "vue";
import type { Currency, Frequency, Subscription } from "@/types/Subscription";
import { subscriptionsApi } from "@/api/subscriptionsApi";

const BASE_CURRENCY: Currency = "HNL";
const USD_TO_HNL_RATE = 26; // tasa fija de ejemplo

export interface SubscriptionFormState {
  id?: string;
  name: string;
  price: number | null;
  currency: Currency;
  frequency: Frequency;
  nextPaymentDate: string;
}

const emptyFormState = (): SubscriptionFormState => ({
  name: "",
  price: null,
  currency: "HNL",
  frequency: "monthly",
  nextPaymentDate: new Date().toISOString().slice(0, 10),
});

const toBaseCurrency = (amount: number, currency: Currency): number => {
  if (currency === BASE_CURRENCY) return amount;
  return amount * USD_TO_HNL_RATE;
};

const normalizeMonthly = (sub: Subscription): number => {
  const baseAmount = toBaseCurrency(sub.price, sub.currency);
  if (sub.frequency === "monthly") return baseAmount;
  return baseAmount / 12;
};

export const useSubscriptions = () => {
  const subscriptions = ref<Subscription[]>([]);
  const isLoading = ref(false);

  const formState = ref<SubscriptionFormState>(emptyFormState());
  const isEditing = ref(false);

  const totalMonthlyInBase = computed(() =>
    subscriptions.value.reduce((acc, sub) => acc + normalizeMonthly(sub), 0)
  );

  const totalCount = computed(() => subscriptions.value.length);

  const resetForm = () => {
    formState.value = emptyFormState();
    isEditing.value = false;
  };

  const startCreate = () => {
    resetForm();
  };

  const startEdit = (id: string) => {
    const sub = subscriptions.value.find((s) => s.id === id);
    if (!sub) return;
    formState.value = {
      id: sub.id,
      name: sub.name,
      price: sub.price,
      currency: sub.currency,
      frequency: sub.frequency,
      nextPaymentDate: sub.nextPaymentDate,
    };
    isEditing.value = true;
  };

  const saveSubscription = () => {
    if (!formState.value.name || formState.value.price == null) return;

    // la lógica concreta de crear/editar se hará en funciones separadas async
  };

  const removeSubscription = (id: string) => {
  };

  const monthlyAmountFor = (sub: Subscription): number => normalizeMonthly(sub);

  const fetchSubscriptions = async () => {
    isLoading.value = true;
    try {
      const { data } = await subscriptionsApi.get<Subscription[]>("/subscriptions");
      subscriptions.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  const createSubscription = async () => {
    if (!formState.value.name || formState.value.price == null) return;
    const payload = {
      name: formState.value.name,
      price: formState.value.price,
      currency: formState.value.currency,
      frequency: formState.value.frequency,
      nextPaymentDate: formState.value.nextPaymentDate,
    };
    const { data } = await subscriptionsApi.post<Subscription>("/subscriptions", payload);
    subscriptions.value.unshift(data);
    resetForm();
  };

  const updateSubscription = async () => {
    if (!formState.value.id) return;
    const id = formState.value.id;
    const payload = {
      name: formState.value.name,
      price: formState.value.price!,
      currency: formState.value.currency,
      frequency: formState.value.frequency,
      nextPaymentDate: formState.value.nextPaymentDate,
    };
    const { data } = await subscriptionsApi.put<Subscription>(
      `/subscriptions/${id}`,
      payload
    );
    const index = subscriptions.value.findIndex((s) => s.id === id);
    if (index !== -1) {
      subscriptions.value[index] = data;
    }
    resetForm();
  };

  const submitForm = async () => {
    if (isEditing.value) await updateSubscription();
    else await createSubscription();
  };

  const deleteSubscription = async (id: string) => {
    await subscriptionsApi.delete(`/subscriptions/${id}`);
    subscriptions.value = subscriptions.value.filter((s) => s.id !== id);
    if (formState.value.id === id) {
      resetForm();
    }
  };

  return {
    BASE_CURRENCY,
    USD_TO_HNL_RATE,
    subscriptions,
    isLoading,
    formState,
    isEditing,
    totalMonthlyInBase,
    totalCount,

    startCreate,
    startEdit,
    saveSubscription: submitForm,
    removeSubscription: deleteSubscription,
    resetForm,
    monthlyAmountFor,
    fetchSubscriptions,
  };
};



