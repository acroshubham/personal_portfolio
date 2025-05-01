<script lang="ts">
  import { onMount } from 'svelte';
  import { theme } from './lib/stores';
  import Sidebar from './lib/components/Sidebar.svelte';
  import HeroSection from './lib/components/HeroSection.svelte';
  import AboutSection from './lib/components/AboutSection.svelte';
  import SkillsSection from './lib/components/SkillsSection.svelte';
  import ResumeSection from './lib/components/ResumeSection.svelte';
  import PortfolioSection from './lib/components/PortfolioSection.svelte';
  import ContactSection from './lib/components/ContactSection.svelte';
  import Footer from './lib/components/Footer.svelte';
  import toast from 'svelte-french-toast';
  
  // Custom cursor element
  let cursor: HTMLDivElement;
  let cursorSmall: HTMLDivElement;
  let mouseX = 0;
  let mouseY = 0;
  let cursorVisible = false;
  
  function updateCursor(e: MouseEvent) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    if (cursor && cursorSmall) {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      cursorSmall.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }
  }
  
  function showCursor() {
    cursorVisible = true;
  }
  
  function hideCursor() {
    cursorVisible = false;
  }
  
  onMount(() => {
    // Initialize boxicons if it's not already loaded
    if (typeof window !== 'undefined' && !document.getElementById('boxicons-css')) {
      const link = document.createElement('link');
      link.id = 'boxicons-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css';
      document.head.appendChild(link);
    }
    
    // Set document title
    document.title = 'Shubham Sharma - Developer Portfolio';
    
    // Initialize theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    theme.set(savedTheme);
    
    // Subscribe to theme changes
    const unsubscribe = theme.subscribe(value => {
      document.documentElement.classList.toggle('dark', value === 'dark');
      localStorage.setItem('portfolio-theme', value);
    });
    
    // Initialize toast
    toast.success('Welcome to my portfolio!', {
      position: 'bottom-right',
      duration: 3000,
    });
    
    return () => {
      unsubscribe();
    };
  });
  
  // Toggle theme function
  function toggleTheme() {
    theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
</script>

<svelte:head>
  <title>Shubham Sharma - Developer Portfolio</title>
  <meta name="description" content="Shubham Sharma's portfolio - Web Developer, C/C++ Coder, and UI/UX Designer">
</svelte:head>

<svelte:window 
  on:mousemove={updateCursor} 
  on:mouseenter={showCursor} 
  on:mouseleave={hideCursor} 
/>

<!-- Custom cursor (will only show on desktop) -->
<div 
  bind:this={cursor} 
  class="custom-cursor w-8 h-8 bg-primary-500 hidden md:block"
  style="transform: translate3d({mouseX}px, {mouseY}px, 0); opacity: {cursorVisible ? 0.5 : 0}"
></div>

<div 
  bind:this={cursorSmall} 
  class="custom-cursor w-2 h-2 bg-white hidden md:block"
  style="transform: translate3d({mouseX}px, {mouseY}px, 0); opacity: {cursorVisible ? 1 : 0}"
></div>

<!-- Theme toggle button -->
<button 
  class="fixed top-4 right-20 z-30 p-2 rounded-full bg-dark-800 text-dark-100 
         hover:bg-primary-600 hover:text-white transition-all duration-300"
  on:click={toggleTheme}
  aria-label="Toggle theme"
>
  <i class="bx {$theme === 'dark' ? 'bx-sun' : 'bx-moon'} text-xl"></i>
</button>

<!-- Main content -->
<div class="min-h-screen flex flex-col md:flex-row">
  <Sidebar />
  
  <main class="flex-1 md:ml-72">
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <ResumeSection />
    <PortfolioSection />
    <ContactSection />
    <Footer />
  </main>
</div>