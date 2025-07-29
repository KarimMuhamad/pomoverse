<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { BookmarkPlus } from '@lucide/svelte';
  import {Button} from "$lib/components/ui/button";
  import {Badge} from "$lib/components/ui/badge/index.js";
  import {onMount} from "svelte";
  import {labelStore} from "$lib/state/Labels.svelte";

  let label = $state(labelStore.label);
  let labels = $state(labelStore.labels);

  const handleSelect = (label: any) => {
    labelStore.setLabel(label);
  }

  onMount(() => {
     labelStore.init();
  });
</script>

<Card.Root class="w-full max-w-2xl mx-auto shadow-md">
  <Card.Header class="text-center">
    <Card.Title>Organize Your Sessions</Card.Title>
    <Card.Description>Select or manage label for this Session</Card.Description>
    <Card.Action>
      <Button size="icon"><BookmarkPlus/></Button>
    </Card.Action>
  </Card.Header>
  <Card.Content class="flex flex-wrap justify-center space-x-2 space-y-2">
    {#each labels as label}
      <Badge
        onclick={() => handleSelect(label)}
        style={`background-color: ${label.color}`}
        class={`h-8 rounded-full px-4 cursor-pointer transition-all ${
          label?.id === label.id
            ? 'text-white ring-2 ring-offset-2 ring-primary'
            : 'text-white opacity-70 hover:opacity-100'
        }`}
      >
        {label.name}
      </Badge>
    {/each}
  </Card.Content>
<!--  <Card.Footer class="flex flex-col justify-center">-->
<!--    <Button>Add Label</Button>-->
<!--  </Card.Footer>-->
</Card.Root>