<script lang="ts">
  import { fly } from 'svelte/transition';
  import { inview } from 'svelte-inview';
  
  let inViewResume = false;
  
  const handleResumeChange = ({ detail }: CustomEvent<any>) => {
    inViewResume = detail.inView;
  };
  
  interface ResumeItem {
    title: string;
    period: string;
    organization: string;
    location: string;
    details: string | string[];
  }
  
  const education: ResumeItem[] = [
    {
      title: 'Bachelor of Technology in Computer Science',
      period: '2020 - ongoing',
      organization: 'Geeta University, Panipat, Near Delhi NCR',
      location: 'Panipat, HR',
      details: 'Currently I am in 3rd year, 5th Semester and I compassed my previous semester with 8.8 cgpa.'
    },
    {
      title: 'Standard 12 | HSC',
      period: '2018 - 2020 (CBSE)',
      organization: 'Mother India School, Marout, Jhajjar, Haryana',
      location: 'Jhajjar, HR',
      details: 'I enrolled myself in JEE/MAINS, NDA Training academy named as New Heights.'
    },
    {
      title: 'Standard 10 | SSC',
      period: '2018 - 2020 (ICSE)',
      organization: 'Kullu Valley School, Kullu, Himachal-Pradesh',
      location: 'Kullu, HP',
      details: '2017 passout. Learned JAVA as the part of curriculum.'
    }
  ];
  
  const experience: ResumeItem[] = [
    {
      title: 'Coding',
      period: '2017 - Present',
      organization: '',
      location: 'Panipat, HR',
      details: [
        'C: Advanced (⭐⭐⭐⭐⭐)',
        'C++: Advanced (⭐⭐⭐⭐⭐)',
        'Java: Intermediate (⭐⭐⭐⭐)',
        'DS And Algo: Intermediate (⭐⭐⭐)'
      ]
    },
    {
      title: 'Web Development',
      period: '2022 - ongoing',
      organization: '',
      location: 'Panipat, HR',
      details: [
        'HTML 5: Advanced (⭐⭐⭐⭐⭐)',
        'CSS 3: Advanced (⭐⭐⭐⭐⭐)',
        'BOOTSTRAP 5: Advanced (⭐⭐⭐⭐⭐)',
        'JavaScript ES6: Intermediate (⭐⭐⭐⭐)',
        'UI/UX Design: Intermediate (⭐⭐⭐⭐)',
        'React.js/Node.js: Intermediate (⭐⭐⭐⭐)',
        'No-SQL/SQL: Advanced (⭐⭐⭐⭐⭐)'
      ]
    },
    {
      title: 'Project Links',
      period: '2022 - ongoing',
      organization: '',
      location: 'Panipat, HR',
      details: 'Please scroll down to the Portfolio section for my projects work.'
    },
    {
      title: 'Certification',
      period: '2022',
      organization: 'Udemy',
      location: '',
      details: 'Recently I just completed the certification for the course of full-stack-web-development by Angela Yu. It was really-really great learning. Here\'s a course resource link: <a href="https://www.udemy.com/certificate/UC-24ee69e7-2eca-4702-9a73-78c9cc3e5220/" class="text-primary-400 hover:text-primary-300">Click Here</a>'
    }
  ];
</script>

<section 
  id="resume" 
  class="py-20 bg-dark-950"
  use:inview={{ 
    rootMargin: '-20% 0px -20% 0px',
    unobserveOnEnter: true
  }}
  on:inview_change={handleResumeChange}
>
  <div class="container mx-auto px-4 md:px-8 max-w-6xl">
    {#if inViewResume}
      <div in:fly={{ y: 20, duration: 600 }}>
        <h2 class="section-title text-white">Resume</h2>
        
        <p class="text-dark-200 mb-12 max-w-3xl">
          Have a meritorious day to the reader ahead! This is Shubham, Shubham Sharma, a student of Bachelors in computer science. 
          I am a <strong class="text-white">Determined, Focused and Enthusiast</strong> coder.
        </p>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left Column - Education -->
          <div>
            <h3 class="text-2xl font-bold text-primary-500 mb-8">Education</h3>
            
            {#each education as item, i}
              <div 
                class="mb-10 relative pl-6 border-l-2 border-dark-700"
                in:fly={{ y: 20, duration: 300, delay: i * 100 }}
              >
                <div class="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-0"></div>
                
                <h4 class="text-xl font-bold text-white mb-1">{item.title}</h4>
                <span class="inline-block px-3 py-1 bg-dark-800 text-dark-300 rounded mb-3 text-sm">
                  {item.period}
                </span>
                <p class="text-primary-400 mb-2"><em>{item.organization}</em></p>
                
                <p class="text-dark-300">{item.details}</p>
              </div>
            {/each}
          </div>
          
          <!-- Right Column - Experience -->
          <div>
            <h3 class="text-2xl font-bold text-primary-500 mb-8">Skills & Experience</h3>
            
            {#each experience as item, i}
              <div 
                class="mb-10 relative pl-6 border-l-2 border-dark-700"
                in:fly={{ y: 20, duration: 300, delay: i * 100 }}
              >
                <div class="absolute w-4 h-4 bg-primary-500 rounded-full -left-[9px] top-0"></div>
                
                <h4 class="text-xl font-bold text-white mb-1">{item.title}</h4>
                <span class="inline-block px-3 py-1 bg-dark-800 text-dark-300 rounded mb-3 text-sm">
                  {item.period}
                </span>
                {#if item.organization}
                  <p class="text-primary-400 mb-2"><em>{item.organization}</em></p>
                {/if}
                
                {#if Array.isArray(item.details)}
                  <ul class="list-disc list-inside text-dark-300 space-y-1">
                    {#each item.details as detail}
                      <li>{@html detail}</li>
                    {/each}
                  </ul>
                {:else}
                  <p class="text-dark-300">{@html item.details}</p>
                {/if}
              </div>
            {/each}
          </div>
        </div>
        
        <div class="mt-12 text-center">
          <a 
            href="/assets/resume.pdf" 
            class="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                   transition-colors duration-300 shadow-lg hover:shadow-xl inline-flex items-center"
            target="_blank"
          >
            <i class="bx bx-download mr-2"></i> Download CV
          </a>
        </div>
      </div>
    {/if}
  </div>
</section>