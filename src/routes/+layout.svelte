<script lang="ts">

	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
  import { Toaster } from 'svelte-sonner';
	
	let { children } = $props();
</script>

<ModeWatcher/>
<Toaster position="top-right" closeButton/>
{@render children()}
