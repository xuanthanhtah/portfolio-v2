<template>
  <div
    class="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg p-6 mb-8"
  >
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div class="flex-1">
        <h2 class="text-2xl md:text-3xl font-bold mb-2">
          {{ currentPromo.title }}
        </h2>
        <p class="text-muted-foreground mb-4">{{ currentPromo.description }}</p>
        <div class="flex items-center gap-4">
          <button
            class="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Shop Now
          </button>
          <span class="text-sm text-muted-foreground">
            Ends in:
            <span class="font-mono font-semibold text-foreground">{{
              countdown
            }}</span>
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-for="(_, index) in promos"
          :key="index"
          @click="currentIndex = index"
          :class="[
            'w-2 h-2 rounded-full transition-all',
            index === currentIndex
              ? 'bg-primary w-6'
              : 'bg-primary/30 hover:bg-primary/50',
          ]"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Promo {
  title: string;
  description: string;
  endTime: Date;
}

const promos: Promo[] = [
  {
    title: "🔥 Flash Sale - Up to 50% Off!",
    description:
      "Limited time offer on selected electronics and accessories. Don't miss out!",
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    title: "🚚 Free Shipping Weekend",
    description: "Free shipping on all orders over $50. No code needed!",
    endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
  },
  {
    title: "🎁 Buy 2 Get 1 Free",
    description: "On all fashion items. Mix and match your favorites!",
    endTime: new Date(Date.now() + 72 * 60 * 60 * 1000),
  },
];

const currentIndex = ref(0);
const countdown = ref("");

const currentPromo = computed(() => promos[currentIndex.value]);

let countdownInterval: number;
let slideInterval: number;

function updateCountdown() {
  const now = new Date();
  const diff = currentPromo.value.endTime.getTime() - now.getTime();

  if (diff <= 0) {
    countdown.value = "Expired";
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdown.value = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  slideInterval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % promos.length;
  }, 5000);
});

onUnmounted(() => {
  clearInterval(countdownInterval);
  clearInterval(slideInterval);
});
</script>
