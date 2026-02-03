<template>
  <div class="bg-card rounded-lg border border-border p-6 shadow-sm">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-xl font-semibold flex items-center gap-2">
        <MessageSquare class="h-5 w-5 text-primary" />
        Customer Reviews
      </h3>
      <div class="flex items-center gap-2">
        <div class="flex">
          <Star
            v-for="i in 5"
            :key="i"
            :class="[
              'h-5 w-5',
              i <= Math.floor(averageRating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300',
            ]"
          />
        </div>
        <span class="font-semibold">{{ averageRating.toFixed(1) }}</span>
        <span class="text-muted-foreground"
          >({{ reviews.length }} reviews)</span
        >
      </div>
    </div>

    <!-- Rating Distribution -->
    <div class="mb-6 space-y-2">
      <div
        v-for="rating in [5, 4, 3, 2, 1]"
        :key="rating"
        class="flex items-center gap-3"
      >
        <span class="text-sm w-8">{{ rating }} ★</span>
        <div class="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            class="h-full bg-yellow-400 rounded-full transition-all duration-500"
            :style="{ width: `${getRatingPercentage(rating)}%` }"
          ></div>
        </div>
        <span class="text-sm text-muted-foreground w-12 text-right">
          {{ getRatingCount(rating) }}
        </span>
      </div>
    </div>

    <!-- Reviews List -->
    <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      <TransitionGroup name="review">
        <div
          v-for="review in displayedReviews"
          :key="review.id"
          class="p-4 rounded-lg bg-secondary/30 border border-border/50"
        >
          <div class="flex items-start justify-between mb-2">
            <div>
              <div class="flex items-center gap-2">
                <div
                  class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <span class="text-sm font-semibold text-primary">
                    {{ review.author.charAt(0) }}
                  </span>
                </div>
                <div>
                  <p class="font-medium">{{ review.author }}</p>
                  <div class="flex items-center gap-1">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      :class="[
                        'h-3 w-3',
                        i <= review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300',
                      ]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <span class="text-xs text-muted-foreground">{{
              formatDate(review.date)
            }}</span>
          </div>

          <p class="text-sm text-foreground/80 mb-3">{{ review.comment }}</p>

          <div class="flex items-center gap-4">
            <button
              @click="markHelpful(review.id)"
              class="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <ThumbsUp class="h-3 w-3" />
              Helpful ({{ review.helpful }})
            </button>
            <button
              class="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Flag class="h-3 w-3" />
              Report
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <!-- Load More -->
    <div v-if="reviews.length > displayCount" class="mt-4 text-center">
      <button
        @click="loadMore"
        class="px-4 py-2 text-sm text-primary hover:bg-primary/10 rounded-md transition-colors"
      >
        Load More Reviews
      </button>
    </div>

    <!-- Write Review -->
    <div class="mt-6 pt-6 border-t border-border">
      <h4 class="font-medium mb-4">Write a Review</h4>
      <div class="space-y-4">
        <div>
          <label class="block text-sm mb-2">Your Rating</label>
          <div class="flex gap-1">
            <button
              v-for="i in 5"
              :key="i"
              @click="newReview.rating = i"
              @mouseenter="hoverRating = i"
              @mouseleave="hoverRating = 0"
              class="p-1 transition-transform hover:scale-110"
            >
              <Star
                :class="[
                  'h-6 w-6 cursor-pointer transition-colors',
                  i <= (hoverRating || newReview.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 hover:text-yellow-300',
                ]"
              />
            </button>
          </div>
        </div>
        <div>
          <label class="block text-sm mb-2">Your Review</label>
          <textarea
            v-model="newReview.comment"
            rows="3"
            placeholder="Share your experience with this product..."
            class="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          ></textarea>
        </div>
        <button
          @click="submitReview"
          :disabled="!newReview.rating || !newReview.comment"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Star, ThumbsUp, Flag, MessageSquare } from "lucide-vue-next";
import type { Review } from "@/data/products";

interface Props {
  productId?: number;
  initialReviews?: Review[];
}

const props = withDefaults(defineProps<Props>(), {
  productId: 1,
  initialReviews: () => [],
});

const reviews = ref<Review[]>(
  props.initialReviews.length > 0
    ? props.initialReviews
    : [
        {
          id: 1,
          productId: 1,
          author: "John D.",
          rating: 5,
          comment:
            "Amazing sound quality! The noise cancellation is top-notch. I use these every day for work calls and music.",
          date: "2026-01-15",
          helpful: 24,
        },
        {
          id: 2,
          productId: 1,
          author: "Sarah M.",
          rating: 4,
          comment:
            "Great headphones, comfortable for long listening sessions. Battery life could be a bit better though.",
          date: "2026-01-10",
          helpful: 18,
        },
        {
          id: 3,
          productId: 1,
          author: "Mike R.",
          rating: 5,
          comment:
            "Best purchase I've made this year. Highly recommended for audiophiles!",
          date: "2026-01-05",
          helpful: 32,
        },
        {
          id: 4,
          productId: 1,
          author: "Emily L.",
          rating: 4,
          comment:
            "Excellent build quality and the case is premium. Sound is crisp and clear.",
          date: "2026-01-02",
          helpful: 15,
        },
        {
          id: 5,
          productId: 1,
          author: "David K.",
          rating: 5,
          comment:
            "Worth every penny! The ANC is incredible and they're so comfortable.",
          date: "2025-12-28",
          helpful: 21,
        },
      ],
);

const displayCount = ref(3);
const hoverRating = ref(0);
const newReview = ref({
  rating: 0,
  comment: "",
});

const displayedReviews = computed(() =>
  reviews.value.slice(0, displayCount.value),
);

const averageRating = computed(() => {
  if (reviews.value.length === 0) return 0;
  const sum = reviews.value.reduce((acc, r) => acc + r.rating, 0);
  return sum / reviews.value.length;
});

function getRatingCount(rating: number): number {
  return reviews.value.filter((r) => r.rating === rating).length;
}

function getRatingPercentage(rating: number): number {
  if (reviews.value.length === 0) return 0;
  return (getRatingCount(rating) / reviews.value.length) * 100;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function markHelpful(reviewId: number) {
  const review = reviews.value.find((r) => r.id === reviewId);
  if (review) {
    review.helpful++;
  }
}

function loadMore() {
  displayCount.value += 3;
}

function submitReview() {
  if (!newReview.value.rating || !newReview.value.comment) return;

  const review: Review = {
    id: Date.now(),
    productId: props.productId,
    author: "You",
    rating: newReview.value.rating,
    comment: newReview.value.comment,
    date: new Date().toISOString().split("T")[0],
    helpful: 0,
  };

  reviews.value.unshift(review);
  newReview.value = { rating: 0, comment: "" };
}
</script>

<style scoped>
.review-enter-active,
.review-leave-active {
  transition: all 0.3s ease;
}

.review-enter-from,
.review-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
