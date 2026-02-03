<script lang="ts">
  import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-svelte';
  import { categories } from '@/data/products';
  
  let searchQuery = $state('');
  let selectedCategory = $state('All');
  let sortBy = $state('featured');
  let priceRange = $state({ min: 0, max: 1000 });
  let showFilters = $state(false);
  let inStockOnly = $state(false);
  
  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest' },
  ];

  function emitFilterChange() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('filter:change', {
          detail: {
            search: searchQuery,
            category: selectedCategory,
            sortBy,
            priceRange,
            inStockOnly,
          },
        })
      );
    }
  }

  function clearFilters() {
    searchQuery = '';
    selectedCategory = 'All';
    sortBy = 'featured';
    priceRange = { min: 0, max: 1000 };
    inStockOnly = false;
    emitFilterChange();
  }

  $effect(() => {
    emitFilterChange();
  });
</script>

<div class="bg-card rounded-lg border border-border p-4 mb-6 shadow-sm">
  <!-- Search Bar -->
  <div class="flex flex-col lg:flex-row gap-4">
    <div class="relative flex-1">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search products..."
        bind:value={searchQuery}
        class="w-full h-10 pl-10 pr-4 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
      {#if searchQuery}
        <button
          onclick={() => { searchQuery = ''; }}
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X class="h-4 w-4" />
        </button>
      {/if}
    </div>

    <!-- Category Dropdown -->
    <div class="relative">
      <select
        bind:value={selectedCategory}
        class="h-10 px-4 pr-8 rounded-md border border-border bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring min-w-[150px]"
      >
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
      <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>

    <!-- Sort Dropdown -->
    <div class="relative">
      <select
        bind:value={sortBy}
        class="h-10 px-4 pr-8 rounded-md border border-border bg-background text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring min-w-[180px]"
      >
        {#each sortOptions as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
      <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    </div>

    <!-- Filter Toggle Button -->
    <button
      onclick={() => { showFilters = !showFilters; }}
      class="h-10 px-4 rounded-md border border-border bg-background hover:bg-accent transition-colors flex items-center gap-2 {showFilters ? 'bg-accent' : ''}"
    >
      <SlidersHorizontal class="h-4 w-4" />
      <span>Filters</span>
    </button>
  </div>

  <!-- Advanced Filters -->
  {#if showFilters}
    <div class="mt-4 pt-4 border-t border-border">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Price Range -->
        <div>
          <label class="block text-sm font-medium mb-2">Price Range</label>
          <div class="flex items-center gap-3">
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                bind:value={priceRange.min}
                min="0"
                max={priceRange.max}
                class="w-full h-9 pl-7 pr-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Min"
              />
            </div>
            <span class="text-muted-foreground">-</span>
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                bind:value={priceRange.max}
                min={priceRange.min}
                class="w-full h-9 pl-7 pr-3 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <!-- In Stock Toggle -->
        <div>
          <label class="block text-sm font-medium mb-2">Availability</label>
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              bind:checked={inStockOnly}
              class="w-5 h-5 rounded border-border text-primary focus:ring-ring cursor-pointer"
            />
            <span>In Stock Only</span>
          </label>
        </div>

        <!-- Clear Filters -->
        <div class="flex items-end">
          <button
            onclick={clearFilters}
            class="h-9 px-4 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Active Filters Tags -->
  {#if searchQuery || selectedCategory !== 'All' || inStockOnly || priceRange.min > 0 || priceRange.max < 1000}
    <div class="mt-4 flex flex-wrap gap-2">
      {#if searchQuery}
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          Search: {searchQuery}
          <button onclick={() => { searchQuery = ''; }} class="hover:text-primary/70">
            <X class="h-3 w-3" />
          </button>
        </span>
      {/if}
      {#if selectedCategory !== 'All'}
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          {selectedCategory}
          <button onclick={() => { selectedCategory = 'All'; }} class="hover:text-primary/70">
            <X class="h-3 w-3" />
          </button>
        </span>
      {/if}
      {#if inStockOnly}
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          In Stock
          <button onclick={() => { inStockOnly = false; }} class="hover:text-primary/70">
            <X class="h-3 w-3" />
          </button>
        </span>
      {/if}
      {#if priceRange.min > 0 || priceRange.max < 1000}
        <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
          ${priceRange.min} - ${priceRange.max}
          <button onclick={() => { priceRange = { min: 0, max: 1000 }; }} class="hover:text-primary/70">
            <X class="h-3 w-3" />
          </button>
        </span>
      {/if}
    </div>
  {/if}
</div>
