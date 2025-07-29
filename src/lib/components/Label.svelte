<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { BookmarkPlus, Pencil, Delete } from '@lucide/svelte';
  import {Button} from "$lib/components/ui/button";
  import {Badge} from "$lib/components/ui/badge/index.js";
  import {onMount} from "svelte";
  import {labelStore} from "$lib/state/Labels.svelte";
  import AddLabelDialog from "$lib/components/AddLabelDialog.svelte";

  let selectedLabel = $state(labelStore.labels[0]);
  $inspect(console.log(selectedLabel));
  let labels = $state(labelStore.labels);

  const handleSelect = (label: any) => {
    // labelStore.setLabel(label);
    selectedLabel = label;
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
      <AddLabelDialog />
    </Card.Action>
  </Card.Header>
  <Card.Content class="flex flex-wrap justify-center space-x-2 space-y-2">
    {#each labels as label}
      <Badge
        onclick={() => handleSelect(label)}
        style={
          selectedLabel?.id === label.id
            ? `background-color: ${label.color}; filter: drop-shadow(0 4px 8px ${label.color}50)`
            : `background-color: ${label.color};`
          }
          class={`h-8 rounded-full cursor-pointer transition-all ${
            selectedLabel?.id === label.id
            ? 'text-white ring-1 ring-primary'
            : 'bg-muted text-muted hover:bg-muted/70'
          }`}
      >

      {label.name}
        {#if selectedLabel?.id === label.id && label.isDefault === false}
          <Button size="icon" variant="ghost">
            <Pencil/>
          </Button>
          <Button size="icon" variant="ghost">
            <Delete/>
          </Button>
        {/if}
      </Badge>
    {/each}
  </Card.Content>
<!--  <Card.Footer class="flex flex-col justify-center">-->
<!--    <Button>Add Label</Button>-->
<!--  </Card.Footer>-->
</Card.Root>