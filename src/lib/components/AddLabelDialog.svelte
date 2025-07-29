<script lang="ts">
  import {Button} from "$lib/components/ui/button/index.js";
  import {BookmarkPlus} from "@lucide/svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import {Input} from "$lib/components/ui/input/index.js";
  import { cn } from "$lib/utils";
  import {labelStore} from "$lib/state/Labels.svelte";
  import {toast} from "svelte-sonner";

  let labelName = $state("");
  let labelColor = $state("#808080");
  let inputColorRef: HTMLInputElement | null = null;

  const handleColorChange = (e: Event) => {
    labelColor = e.target?.value;
  }

  const handleClick = () => {
    inputColorRef!.click();
  }

  const handleSubmit = async () => {
    await labelStore.addLabel({name: labelName, color: labelColor});
    labelName = "";
    labelColor = "#808080";
    toast.success("Label added successfully");
  }

</script>

<Dialog.Root>
  <Dialog.Trigger><Button size="icon"><BookmarkPlus/></Button></Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Add New Label</Dialog.Title>
      <Dialog.Description>
        Enter name and color for your new label.
      </Dialog.Description>
    </Dialog.Header>
      <div class="grid gap-4 my-5">
        <div class="grid grid-cols-4 gap-2 items-center">
          <label for="name" class="text-left col-span-1">Name</label>
          <Input id="name" placeholder="Work" class="col-span-3" bind:value={labelName}/>
        </div>
        <div class="grid grid-cols-4 gap-2 items-center">
          <label for="color" class="text-left col-span-1">Color</label>

          <div class="relative col-span-3">
            <Button
              class={cn(
                "selection:bg-primary dark:bg-input/30 selection:text-primary-foreground border-input ring-offset-background placeholder:text-muted-foreground shadow-xs flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 pt-1.5 text-sm font-medium outline-none transition-[color,box-shadow] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              )}
              style="background-color: {labelColor}"
              onclick={handleClick}
            ></Button>

            <input
              type="color"
              bind:value={labelColor}
              bind:this={inputColorRef}
              class="absolute inset-0 opacity-0 cursor-pointer"
              onchange={handleColorChange}
            />
          </div>
        </div>
      </div>
    <Dialog.Footer>
      <Button onclick={handleSubmit}>Add Label</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>