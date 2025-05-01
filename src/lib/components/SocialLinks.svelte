<script lang="ts">
  export let socials: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
</script>

<div class="flex space-x-2">
  {#each socials as social}
    <a href={social.url} target="_blank" rel="noopener noreferrer" class="social-icon" aria-label={social.platform}>
      <i class={social.icon}></i>
    </a>
  {/each}
</div>