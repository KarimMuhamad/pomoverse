<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import {Button, buttonVariants} from "$lib/components/ui/button";
  import {Delete} from "@lucide/svelte";
  import { cn } from '$lib/utils';
  import {labelStore} from "$lib/state/Labels.svelte";
  import {toast} from "svelte-sonner";

  let { idLabel } = $props();

  const deleteLabel = () => {
    labelStore.deleteLabel(idLabel);
    toast.success('Success Deleted Label');
  }
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>
    <Button size="icon" variant="ghost"><Delete /></Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your label
        and remove your data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action onclick={deleteLabel} class={cn(buttonVariants({variant: 'destructive'}))}>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>