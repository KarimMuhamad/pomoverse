<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import {getColorName, getInitial} from "$lib/util/getColorName";
  import {userLogoutRequest} from "$lib/api/userApi";
  import {toast} from "svelte-sonner";
  import {mode} from "mode-watcher";
  import {cn} from "$lib/utils";
  import {buttonVariants} from "$lib/components/ui/button";
  import {Settings2} from "@lucide/svelte";

  let { name } = $props();

  let colorName = $derived(getColorName(name, mode.current as string));

  const handleLogout = async () => {
    try {
      const res = await userLogoutRequest();
      console.log(res);
      toast.success("Succesfully Logout");
      localStorage.removeItem('accessToken');
      window.location.reload();
    } catch (e) {
      console.log(e);
      toast.error(e?.message);
    }
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Avatar.Root>
      <Avatar.Fallback style="background-color: {colorName?.bgColor}; color: {colorName?.textColor} " class="font-semibold">{getInitial(name)}</Avatar.Fallback>
    </Avatar.Root>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>{name}</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item onclick={handleLogout}>Log Out</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>