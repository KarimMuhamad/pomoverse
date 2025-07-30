<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { BookmarkPlus, Pencil, Delete } from '@lucide/svelte';
  import {Button} from "$lib/components/ui/button";
  import {Badge} from "$lib/components/ui/badge/index.js";
  import {onMount} from "svelte";
  import {labelStore} from "$lib/state/Labels.svelte";
  import AddLabelDialog from "$lib/components/AddLabelDialog.svelte";
  import DeleteLabelDialog from "$lib/components/DeleteLabelDialog.svelte";
  import EditLabelDrawer from "$lib/components/EditLabelDrawer.svelte";

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
{#each labelStore.labels as label}
  <Badge
    onclick={() => labelStore.setLabel(label)}
    style={labelStore.label?.id === label.id
     ? `background-color: ${label.color}; filter: drop-shadow(0 4px 8px ${label.color}40)` : `background-color: ${label.color};`}
    class={`h-8 cursor-pointer transition-all ${labelStore.label?.id === label.id
     ? !label.isDefault ? 'ring-1 ring-primary pr-0' : 'ring-1 ring-primary'
     : 'hover:ring-1 hover:ring-primary'}`}
  >
    {label.name}
    {#if labelStore.label?.id === label.id && !label.isDefault}
      <EditLabelDrawer id={label.id} name={label.name} color={label.color} />
      <DeleteLabelDialog idLabel={label.id}/>
    {/if}
  </Badge>
{/each}
  </Card.Content>
  <Card.Footer class="flex flex-col justify-center">
    <Card.Description class="text-sm italic">Default Label is Unlabelled</Card.Description>
  </Card.Footer>
</Card.Root>