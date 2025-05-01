<script lang="ts">
  import { fly } from 'svelte/transition';
  import { inview } from 'svelte-inview';
  import { contactForm } from '../stores';
  import { sendContactMessage } from '../supabase';
  import toast from 'svelte-french-toast';
  
  let inViewContact = false;
  
  const handleContactChange = ({ detail }: CustomEvent<any>) => {
    inViewContact = detail.inView;
  };
  
  async function handleSubmit() {
    if (!$contactForm.name || !$contactForm.email || !$contactForm.subject || !$contactForm.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Set loading state
    contactForm.update(form => ({ ...form, loading: true }));
    
    try {
      const result = await sendContactMessage(
        $contactForm.name,
        $contactForm.email,
        $contactForm.subject,
        $contactForm.message
      );
      
      if (result.success) {
        toast.success('Message sent successfully!');
        // Reset form
        contactForm.set({
          name: '',
          email: '',
          subject: '',
          message: '',
          loading: false,
          success: true,
          error: null
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again later.');
      contactForm.update(form => ({ 
        ...form, 
        loading: false, 
        error: 'Failed to send message'
      }));
    }
  }
</script>

<section 
  id="contact" 
  class="py-20 bg-dark-950"
  use:inview={{ 
    rootMargin: '-20% 0px -20% 0px',
    unobserveOnEnter: true
  }}
  on:inview_change={handleContactChange}
>
  <div class="container mx-auto px-4 md:px-8 max-w-6xl">
    {#if inViewContact}
      <div in:fly={{ y: 20, duration: 600 }}>
        <h2 class="section-title text-white">Contact</h2>
        
        <p class="text-dark-200 mb-12 max-w-3xl">
          <strong class="text-white">So, are you a coding person.</strong>
          Wanna code with me while taking a sip of coffee and planning to travel and explore the unknown paths?
          You can contact me using the form below. Or you can directly visit me.
        </p>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div class="bg-dark-900 rounded-lg shadow-lg p-8">
            <div class="mb-8 flex items-start">
              <div class="flex-shrink-0 bg-primary-500 bg-opacity-20 rounded-full p-3 mr-4">
                <i class="bx bx-map text-2xl text-primary-500"></i>
              </div>
              <div>
                <h4 class="text-xl font-semibold text-white mb-1">Location:</h4>
                <p class="text-dark-300">Geeta Engineering College Panipat</p>
              </div>
            </div>
            
            <div class="mb-8 flex items-start">
              <div class="flex-shrink-0 bg-primary-500 bg-opacity-20 rounded-full p-3 mr-4">
                <i class="bx bx-envelope text-2xl text-primary-500"></i>
              </div>
              <div>
                <h4 class="text-xl font-semibold text-white mb-1">Email:</h4>
                <p class="text-dark-300">@acroshubham12</p>
              </div>
            </div>
            
            <div class="mb-8 flex items-start">
              <div class="flex-shrink-0 bg-primary-500 bg-opacity-20 rounded-full p-3 mr-4">
                <i class="bx bx-phone text-2xl text-primary-500"></i>
              </div>
              <div>
                <h4 class="text-xl font-semibold text-white mb-1">Call:</h4>
                <p class="text-dark-300">+91 8219861182</p>
              </div>
            </div>
            
            <div class="h-64 w-full rounded-lg overflow-hidden">
              <iframe 
                title="Google Maps"
                width="100%" 
                height="100%" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0" 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=geeta%20engineering%20college+(Contact%20Us)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                class="border-0"
              ></iframe>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="bg-dark-900 rounded-lg shadow-lg p-8">
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-white mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    class="contact-form-input"
                    bind:value={$contactForm.name}
                    required
                  />
                </div>
                
                <div>
                  <label for="email" class="block text-white mb-2">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    class="contact-form-input"
                    bind:value={$contactForm.email}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label for="subject" class="block text-white mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  class="contact-form-input"
                  bind:value={$contactForm.subject}
                  required
                />
              </div>
              
              <div>
                <label for="message" class="block text-white mb-2">Message</label>
                <textarea
                  id="message"
                  rows="6"
                  class="contact-form-input"
                  bind:value={$contactForm.message}
                  required
                ></textarea>
              </div>
              
              <div class="flex justify-center">
                <button
                  type="submit"
                  class="px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 
                        transition-colors duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  disabled={$contactForm.loading}
                >
                  {#if $contactForm.loading}
                    <span class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  {:else}
                    Send Message
                  {/if}
                </button>
              </div>
              
              {#if $contactForm.success}
                <div class="bg-green-900 bg-opacity-30 text-green-400 p-4 rounded-md">
                  Your message has been sent. Thank you!
                </div>
              {/if}
              
              {#if $contactForm.error}
                <div class="bg-red-900 bg-opacity-30 text-red-400 p-4 rounded-md">
                  {$contactForm.error}
                </div>
              {/if}
            </form>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>