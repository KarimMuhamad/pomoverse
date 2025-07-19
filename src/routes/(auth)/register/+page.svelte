<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { UserPlus } from "@lucide/svelte";
  import {cn} from "$lib/utils";
  import {buttonVariants} from "$lib/components/ui/button";
  import {userRegisterRequest} from "$lib/api/userApi";
  import { toast } from 'svelte-sonner';
  import {goto} from "$app/navigation";

  let user = $state({
    username: "",
    email: "",
    password: "",
  });

  let confirmPassword = $state("");

  const handleRegister = async (e : Event) => {
    e.preventDefault();

    if (user.password !== confirmPassword) {
        toast.error("Password not Match!!!");
        return;
    }

    try {
      const res = await userRegisterRequest(user);
      toast.success(res?.message);
      await goto("/login");
    } catch (e) {
      toast.error(e?.response?.data?.error || e?.message || "Something went wrong");
    }
  }
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header class="text-center">
    <Card.Title>Create to your account</Card.Title>
    <Card.Description>Enter your email below to Create to your account</Card.Description>
  </Card.Header>
  <Card.Content>
    <form>
      <div class="flex flex-col gap-4">
        <div class="grid gap-2">
          <label for="username">Username</label>
          <Input id="username" type="username" placeholder="username" required bind:value={user.username}/>
        </div>
        <div class="grid gap-2">
          <label for="email">Email</label>
          <Input id="email" type="email" placeholder="m@example.com" required bind:value={user.email}/>
        </div>
        <div class="grid gap-2">
          <label for="password">Password</label>
          <Input id="password" type="password" required bind:value={user.password}/>
        </div>
        <div class="grid gap-2">
          <label for="confirmPassword">Confirm Passowrd</label>
          <Input id="confirmPassword" type="password" required bind:value={confirmPassword}/>
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button type="submit" class="w-full" onclick={handleRegister}><UserPlus/>Register</Button>
    <p class="text-sm">Already have an account?</p>
    <a href="/login" class={cn(buttonVariants({variant: "link", size: "sm"}), 'h-2')}>Sign In</a>
  </Card.Footer>
</Card.Root>