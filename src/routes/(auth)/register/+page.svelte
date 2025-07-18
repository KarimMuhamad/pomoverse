<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  // import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import {cn} from "$lib/utils";
  import {buttonVariants} from "$lib/components/ui/button";
</script>

<Card.Root class="w-full max-w-sm">
  <Card.Header class="text-center">
    <Card.Title>Create to your account</Card.Title>
    <Card.Description>Enter your email below to Create to your account</Card.Description>
  </Card.Header>
  <Card.Content>
    <form>
      <div class="flex flex-col gap-6">
        <div class="grid gap-2">
          <label for="emaik">Email</label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <label for="password">Password</label>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button type="submit" class="w-full">Register</Button>
    <p class="text-sm">Already have an account?</p>
    <a href="/login" class={cn(buttonVariants({variant: "link", size: "sm"}), 'h-2')}>Sign In</a>
  </Card.Footer>
</Card.Root>