<script lang="ts">
  import { fly } from 'svelte/transition';
  import { inview } from 'svelte-inview';
  
  let inViewAbout = false;
  
  const handleAboutChange = ({ detail }: CustomEvent<any>) => {
    inViewAbout = detail.inView;
  };
  
  const personalInfo = [
    { label: 'Birthday', value: '9th of November, 2001' },
    { label: 'Website', value: '@acroshubham', url: 'https://acroshubham.github.io/cv/' },
    { label: 'Phone', value: '+91 8219861182' },
    { label: 'City', value: 'Himachal Pradesh, India' },
    { label: 'Age', value: '23' },
    { label: 'Degree', value: 'Pursuing Bachelors in Computer Science' },
    { label: 'Email', value: '@acroshubham', url: 'mailto:email@acroshubham09.com' },
    { label: 'Freelance', value: 'Available' }
  ];
</script>

<section 
  id="about" 
  class="py-20 bg-dark-950"
  use:inview={{ 
    rootMargin: '-20% 0px -20% 0px',
    unobserveOnEnter: true
  }}
  on:inview_change={handleAboutChange}
>
  <div class="container mx-auto px-4 md:px-8 max-w-6xl">
    {#if inViewAbout}
      <div in:fly={{ y: 20, duration: 600 }}>
        <h2 class="section-title text-white">About</h2>
        
        <p class="text-dark-200 mb-8 max-w-3xl">
          Hi there, I am a B.Tech in Computer Science Student. I love coding as it's my passion and profession. 
          I am pursuing my bachelor's degree in GEETA UNIVERSITY, KURUKSHETRA Affiliated. 
          My hobby is traveling and exploring. I love solving riddles especially when it comes to Rubik's cube.
          I also 💝 coffee which is the power to <code>code</code> up to hours.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div class="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://images.pexels.com/photos/1553783/pexels-photo-1553783.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Shubham Sharma" 
              class="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div>
            <h3 class="text-2xl font-bold text-white mb-4">Coder & Web Developer</h3>
            
            <p class="text-dark-200 italic mb-6">
              I like cracking Data Structure and Algorithm questions. Since when I enrolled myself in web development, I am really really fond of it.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8">
              {#each personalInfo as info, i}
                <div class="flex" in:fly={{ y: 20, duration: 300, delay: i * 50 }}>
                  <i class="bx bx-chevron-right text-primary-500 mr-2 mt-1"></i>
                  <div>
                    <span class="font-semibold text-white">{info.label}:</span>
                    {#if info.url}
                      <a href={info.url} class="ml-1 text-primary-400 hover:text-primary-500 transition-colors">
                        {info.value}
                      </a>
                    {:else}
                      <span class="ml-1 text-dark-300">{info.value}</span>
                    {/if}
                  </div>
                </div>
              {/each}
            </div>
            
            <p class="text-dark-200 mt-6">
              My birth town is Kullu-Manali, Himachal Pradesh. Yes, often people say that trekking, mountain climbing, driving, skiing are common in those valleys of mountains. You know what I do, "Smile and say yes, those are my hobbies. Wanna Plan a tour with me, pack your bags and let's explore my world."
            </p>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>