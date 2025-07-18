<script lang="ts">
  let { children } = $props();
</script>

<div class="min-w-full min-h-screen flex flex-col items-center justify-center">
  <a href="/" class="text-4xl font-bold mb-4">POMOVERSE</a>
  {@render children()}
</div>