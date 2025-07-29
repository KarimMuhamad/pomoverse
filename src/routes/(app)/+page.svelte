<script lang="ts">
  import Timer from '$lib/components/Timer.svelte';
  import Label from "$lib/components/Label.svelte";
  import {userStore} from "$lib/state/User.svelte";

  let { data } = $props();

  const userLoad = data.user;
</script>

<div class="w-full mx-auto flex flex-col items-center justify-center gap-6">
  <Timer />
  {#if userLoad !== null}
    <Label />
  {:else}
    <p class="font-semibold text-muted-foreground italic">Login to Organize your Session</p>
  {/if}
</div>