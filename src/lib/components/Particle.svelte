<script lang="ts">
  import { onMount } from 'svelte';
   import tsParticles from 'tsparticles';
  onMount(() => {
    tsParticles.load('particles-js', {
      fullScreen: { enable: false },
      particles: {
        number: { value: 20 },
        color: { value: "#ffffff" },
        opacity: { value: 0.1 },
        size: { value: 2 },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none"
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false },
          onClick: { enable: false }
        }
      },
      detectRetina: true
    });
  });
</script>

<div id="particles-js" class="absolute inset-0 -z-10"></div>
