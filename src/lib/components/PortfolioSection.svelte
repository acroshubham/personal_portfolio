<script lang="ts">
  import { fly } from 'svelte/transition';
  import { inview } from 'svelte-inview';
  import { activeFilter } from '../stores';
  
  let inViewPortfolio = false;
  
  const handlePortfolioChange = ({ detail }: CustomEvent<any>) => {
    inViewPortfolio = detail.inView;
  };
  
  interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    image: string;
    detailUrl?: string;
  }
  
  const portfolioItems: PortfolioItem[] = [
    {
      id: 1,
      title: 'Web Application 1',
      category: 'web',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailUrl: '#'
    },
    {
      id: 2,
      title: 'Mobile App Development',
      category: 'app',
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailUrl: '#'
    },
    {
      id: 3,
      title: 'UI Design Project',
      category: 'design',
      image: 'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailUrl: '#'
    },
    {
      id: 4,
      title: 'E-commerce Solution',
      category: 'web',
      image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailUrl: '#'
    },
    {
      id: 5,
      title: 'Branding Identity',
      category: 'design',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailUrl: '#'
    },
    {
      id: 6,
      title: 'Mobile Game',
      category: 'app',
      image: 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      detailUrl: '#'
    }
  ];
  
  const filters = [
    { id: '*', label: 'All' },
    { id: 'web', label: 'Web' },
    { id: 'app', label: 'App' },
    { id: 'design', label: 'Design' }
  ];
  
  // Filter portfolio items based on active filter
  $: filteredItems = $activeFilter === '*' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === $activeFilter);
</script>

<section 
  id="portfolio" 
  class="py-20 bg-dark-900"
  use:inview={{ 
    rootMargin: '-20% 0px -20% 0px',
    unobserveOnEnter: true
  }}
  on:inview_change={handlePortfolioChange}
>
  <div class="container mx-auto px-4 md:px-8 max-w-6xl">
    {#if inViewPortfolio}
      <div in:fly={{ y: 20, duration: 600 }}>
        <h2 class="section-title text-white">Portfolio</h2>
        
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          {#each filters as filter}
            <button 
              class="portfolio-filter {$activeFilter === filter.id ? 'active' : ''}"
              on:click={() => activeFilter.set(filter.id)}
            >
              {filter.label}
            </button>
          {/each}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each filteredItems as item, i}
            <div class="portfolio-item" in:fly={{ y: 20, duration: 400, delay: i * 100 }}>
              <div class="relative overflow-hidden group">
                <img 
                  src={item.image} 
                  alt={item.title}
                  class="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                
                <div class="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 class="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p class="text-primary-400">{filters.find(f => f.id === item.category)?.label}</p>
                </div>
                
                <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div class="flex gap-3">
                    <a 
                      href={item.image} 
                      class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
                      aria-label="View larger image"
                    >
                      <i class="bx bx-plus"></i>
                    </a>
                    
                    {#if item.detailUrl}
                      <a 
                        href={item.detailUrl} 
                        class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
                        aria-label="View details"
                      >
                        <i class="bx bx-link"></i>
                      </a>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>