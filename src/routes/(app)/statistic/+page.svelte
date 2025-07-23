<script lang="ts">
  import {goto} from "$app/navigation";
  let { data } = $props();

  if (data.user === null) {
    goto('/');
  }
</script>

<h1>Coming Soon...</h1>