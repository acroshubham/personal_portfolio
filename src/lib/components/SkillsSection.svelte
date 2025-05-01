<script lang="ts">
  import { fly } from 'svelte/transition';
  import { inview } from 'svelte-inview';
  
  let inViewSkills = false;
  
  const handleSkillsChange = ({ detail }: CustomEvent<any>) => {
    inViewSkills = detail.inView;
  };
  
  interface Skill {
    name: string;
    value: number;
  }
  
  const skills: Skill[] = [
    { name: 'HTML', value: 100 },
    { name: 'CSS', value: 90 },
    { name: 'JavaScript', value: 85 },
    { name: 'C/C++', value: 100 },
    { name: 'Java', value: 75 },
    { name: 'React/Node.js', value: 85 },
    { name: 'My-SQL', value: 85 },
    { name: 'No-SQL:Mongo-DB/ Mongoose', value: 85 }
  ];
  
  const colors = [
    'from-primary-500 to-primary-600',
    'from-secondary-500 to-secondary-600',
    'from-accent-500 to-accent-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-yellow-500 to-yellow-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600'
  ];
  
  let animatedSkills: Skill[] = skills.map(skill => ({ ...skill, value: 0 }));
  
  // Animate skill bars when in view
  function animateSkills() {
    if (inViewSkills) {
      setTimeout(() => {
        animatedSkills = skills.map(skill => ({ ...skill }));
      }, 300);
    }
  }
  
  $: if (inViewSkills) animateSkills();
</script>

<section 
  id="skills" 
  class="py-20 bg-dark-900"
  use:inview={{ 
    rootMargin: '-20% 0px -20% 0px',
    unobserveOnEnter: true
  }}
  on:inview_change={handleSkillsChange}
>
  <div class="container mx-auto px-4 md:px-8 max-w-6xl">
    {#if inViewSkills}
      <div in:fly={{ y: 20, duration: 600 }}>
        <h2 class="section-title text-white">Skills</h2>
        
        <p class="text-dark-200 mb-12 max-w-3xl">
          My Coding Journey Started when I was in class 8th as per ICSE syllabus, JAVA coding was a part of the curriculum. 
          From there, the fire started in me to explore coding, and I don't think it will ever extinguish.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {#each skills as skill, i}
            <div class="mb-6" in:fly={{ y: 20, duration: 300, delay: i * 100 }}>
              <div class="flex justify-between items-center mb-2">
                <span class="text-lg font-semibold text-white">{skill.name}</span>
                <span class="text-primary-400">{animatedSkills[i].value}%</span>
              </div>
              
              <div class="skill-progress">
                <div 
                  class="skill-progress-bar bg-gradient-to-r {colors[i % colors.length]}"
                  style="width: {animatedSkills[i].value}%"
                ></div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>