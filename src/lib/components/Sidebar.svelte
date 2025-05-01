<script lang="ts">
  import { onMount } from 'svelte';
  import { activeSection, isMobileMenuOpen } from '../stores';
  import SocialLinks from './SocialLinks.svelte';
  
  export let profileImage: string = "https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
  
  // Profile data
  const name = "Shubham Sharma";
  const socials = [
    { platform: 'twitter', url: 'https://twitter.com/acroshubham1', icon: 'bx bxl-twitter' },
    { platform: 'facebook', url: 'https://www.facebook.com/profile.php?id=100043263941720', icon: 'bx bxl-facebook' },
    { platform: 'instagram', url: 'https://www.instagram.com/acroshubham/?hl=en', icon: 'bx bxl-instagram' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/shubham-sharma-335391176/', icon: 'bx bxl-linkedin' }
  ];
  
  // Navigation links
  const navLinks = [
    { id: 'home', label: 'Home', icon: 'bx bx-home' },
    { id: 'about', label: 'About', icon: 'bx bx-user' },
    { id: 'resume', label: 'Resume', icon: 'bx bx-file-blank' },
    { id: 'portfolio', label: 'Portfolio', icon: 'bx bx-book-content' },
    { id: 'contact', label: 'Contact', icon: 'bx bx-envelope' }
  ];
  
  // Handle navigation click
  function handleNavClick(id: string) {
    activeSection.set(id);
    isMobileMenuOpen.set(false);
  }
  
  onMount(() => {
    // Observe sections for scrolling
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeSection.set(entry.target.id);
        }
      });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  });
</script>

<aside class="fixed top-0 left-0 h-full w-72 bg-dark-900 shadow-lg z-20 transition-transform duration-300 
              transform-gpu {$isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}">
  <div class="flex flex-col h-full">
    <!-- Profile -->
    <div class="flex flex-col items-center pt-10 pb-6">
      <div class="w-32 h-32 rounded-full border-4 border-primary-500 overflow-hidden mb-4">
        <img 
          src={profileImage} 
          alt="Shubham Sharma" 
          class="w-full h-full object-cover"
        />
      </div>
      
      <h1 class="text-2xl font-bold text-white mb-2">{name}</h1>
      
      <!-- Social links -->
      <div class="flex space-x-2 mt-2">
        <SocialLinks socials={socials} />
      </div>
    </div>
    
    <!-- Navigation -->
    <nav class="mt-8 flex-grow">
      <ul>
        {#each navLinks as link}
          <li>
            <a 
              href="#{link.id}" 
              class="nav-link {$activeSection === link.id ? 'active' : ''}"
              on:click|preventDefault={() => handleNavClick(link.id)}
            >
              <i class="{link.icon} mr-3 text-xl"></i>
              <span>{link.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
    
    <!-- Footer -->
    <div class="py-4 px-6 text-center text-sm text-dark-400">
      <p>&copy; {new Date().getFullYear()} Shubham Sharma</p>
    </div>
  </div>
</aside>

<!-- Mobile Toggle Button -->
<button 
  class="fixed top-4 right-4 z-30 md:hidden p-2 rounded-full bg-primary-600 text-white"
  on:click={() => isMobileMenuOpen.update(v => !v)}
  aria-label="Toggle Menu"
>
  <i class="bx {$isMobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl"></i>
</button>

<style>
  /* Add any component-specific styles here */
</style>