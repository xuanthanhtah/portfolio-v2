<script lang="ts">
  import { Package, TrendingUp, Users, Star } from 'lucide-svelte';

  interface Stat {
    icon: typeof Package;
    label: string;
    value: string;
    change: string;
    positive: boolean;
  }

  const stats: Stat[] = [
    { icon: Package, label: 'Total Products', value: '1,234', change: '+12%', positive: true },
    { icon: TrendingUp, label: 'Sales', value: '$45,678', change: '+8.5%', positive: true },
    { icon: Users, label: 'Customers', value: '5,678', change: '+23%', positive: true },
    { icon: Star, label: 'Avg Rating', value: '4.8', change: '+0.2', positive: true },
  ];
</script>

<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  {#each stats as stat}
    <div class="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-primary/10">
          <stat.icon class="h-5 w-5 text-primary" />
        </div>
        <div>
          <p class="text-sm text-muted-foreground">{stat.label}</p>
          <div class="flex items-center gap-2">
            <span class="text-xl font-bold">{stat.value}</span>
            <span class="text-xs px-1.5 py-0.5 rounded {stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
              {stat.change}
            </span>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
