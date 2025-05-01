<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  
  let parallaxContainer: HTMLElement;
  let scrollY: number;
  
  // TypedJS effect emulation
  let typeIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typedText = '';
  
  const titles = ['Web-Developer', 'C|C++ Coder', 'UI/UX-Designer'];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;
  
  function typeEffect() {
    const currentTitle = titles[typeIndex];
    
    if (isDeleting) {
      typedText = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      setTimeout(() => typeEffect(), pauseTime);
      return;
    }
    
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % titles.length;
    }
    
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(() => typeEffect(), speed);
  }
  
  function handleScroll() {
    if (parallaxContainer) {
      const yPos = window.scrollY * 0.5;
      parallaxContainer.style.transform = `translate3d(0, ${yPos}px, 0)`;
    }
  }
  
  onMount(() => {
    typeEffect();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<section 
  id="home" 
  class="relative h-screen overflow-hidden"
>
  <div 
    bind:this={parallaxContainer}
    class="absolute inset-0 w-full h-full"
    style="background-image: url('/assets/hero-bg.jpg'); background-size: cover; background-position: center; will-change: transform;"
  ></div>
  
  <div class="absolute inset-0 bg-dark-950 bg-opacity-60"></div>
  
  <div class="relative z-10 h-full flex items-center justify-center text-center px-4" in:fly={{ y: 20, duration: 800 }}>
    <div>
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
        Shubham Sharma
      </h1>
      
      <p class="text-xl md:text-2xl text-white mt-6">
        I'm <span class="text-primary-500 font-semibold relative">
          {typedText}<span class="animate-pulse">|</span>
        </span>
      </p>
      
      <div class="mt-10">
        <a 
          href="#portfolio" 
          class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          View My Work
        </a>
      </div>
    </div>
  </div>
  
  <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
    <a href="#about" class="text-white opacity-75 hover:opacity-100 transition-opacity">
      <i class="bx bx-chevron-down text-3xl"></i>
    </a>
  </div>
</section>