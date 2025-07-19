<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import {getColorName, getInitial} from "$lib/util/getColorName";

  let { name } = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Avatar.Root>
      <Avatar.Fallback style="background-color: {getColorName(name)}">{getInitial(name)}</Avatar.Fallback>
    </Avatar.Root>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>{name}</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Log Out</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>