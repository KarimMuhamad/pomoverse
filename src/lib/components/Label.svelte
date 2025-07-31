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
  import {timerRuntimeStore} from "$lib/state/TimerRuntime.svelte";

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
  onclick={() => {
    if (timerRuntimeStore.runtimeTimer.isRunning) return;
    labelStore.setLabel(label);
  }}
  style={labelStore.label?.id === label.id
    ? `background-color: ${label.color}; filter: drop-shadow(0 8px 12px ${label.color}40)`
    : timerRuntimeStore.runtimeTimer.isRunning
      ? 'background-color: #00000070;'
      : `background-color: ${label.color};`
  }
  class={`h-8 transition-all
    ${timerRuntimeStore.runtimeTimer.isRunning
      ? 'cursor-not-allowed'
      : 'cursor-pointer'
    }
    ${labelStore.label?.id === label.id 
      ? !label.isDefault && !timerRuntimeStore.runtimeTimer.isRunning
        ? 'ring-1 ring-primary'
        : 'ring-1 ring-primary'
      : ''
    }
  `}
>
  {label.name}
  {#if labelStore.label?.id === label.id && !label.isDefault && !timerRuntimeStore.runtimeTimer.isRunning}
    <EditLabelDrawer id={label.id} name={label.name} color={label.color} />
    <DeleteLabelDialog idLabel={label.id}/>
  {/if}
</Badge>
{/each}
  </Card.Content>
  <Card.Footer class="flex flex-col justify-center">
    {#if timerRuntimeStore.runtimeTimer.isRunning}
      <Card.Description class="text-sm italic"># Not Allowed to change if session was started, finish it!!!</Card.Description>
    {:else}
      <Card.Description class="text-sm italic"># Default Label is Unlabelled</Card.Description>
    {/if}
  </Card.Footer>
</Card.Root>