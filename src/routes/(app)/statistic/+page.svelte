<script lang="ts">
  import {goto} from "$app/navigation";

  if (!localStorage.getItem('accessToken')) {
    goto('/');
  }
</script>

<h1>Coming Soon...</h1>