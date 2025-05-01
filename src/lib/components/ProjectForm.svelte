<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { addProject } from '../stores';
  import toast from 'svelte-french-toast';
  
  const dispatch = createEventDispatcher();
  
  let loading = false;
  let title = '';
  let description = '';
  let imageUrl = '';
  let projectUrl = '';
  let category = 'web';
  
  async function handleSubmit() {
    if (!title || !imageUrl || !category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    loading = true;
    
    try {
      const result = await addProject({
        title,
        description,
        image_url: imageUrl,
        project_url: projectUrl,
        category
      });
      
      if (result.success) {
        toast.success('Project added successfully!');
        dispatch('close');
      } else {
        throw new Error('Failed to add project');
      }
    } catch (error) {
      toast.error('Failed to add project. Please try again.');
    } finally {
      loading = false;
    }
  }
</script>

<div class="fixed inset-0 bg-dark-950 bg-opacity-50 flex items-center justify-center z-50">
  <div class="bg-dark-900 p-6 rounded-lg shadow-xl max-w-lg w-full mx-4">
    <h3 class="text-2xl font-bold text-white mb-4">Add New Project</h3>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label for="title" class="block text-white mb-2">Title *</label>
        <input
          type="text"
          id="title"
          bind:value={title}
          class="contact-form-input"
          required
        />
      </div>
      
      <div>
        <label for="description" class="block text-white mb-2">Description</label>
        <textarea
          id="description"
          bind:value={description}
          rows="3"
          class="contact-form-input"
        ></textarea>
      </div>
      
      <div>
        <label for="imageUrl" class="block text-white mb-2">Image URL *</label>
        <input
          type="url"
          id="imageUrl"
          bind:value={imageUrl}
          class="contact-form-input"
          required
        />
      </div>
      
      <div>
        <label for="projectUrl" class="block text-white mb-2">Project URL</label>
        <input
          type="url"
          id="projectUrl"
          bind:value={projectUrl}
          class="contact-form-input"
        />
      </div>
      
      <div>
        <label for="category" class="block text-white mb-2">Category *</label>
        <select
          id="category"
          bind:value={category}
          class="contact-form-input"
          required
        >
          <option value="web">Web</option>
          <option value="app">App</option>
          <option value="design">Design</option>
        </select>
      </div>
      
      <div class="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          class="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
          on:click={() => dispatch('close')}
        >
          Cancel
        </button>
        
        <button
          type="submit"
          class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {#if loading}
            <span class="flex items-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </span>
          {:else}
            Add Project
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>