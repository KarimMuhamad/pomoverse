<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";

  interface Props {
    title: string;
    description: string;
    footerText?: string;
    compact?: boolean;
    children: any;
  }

  let { title, description, footerText, compact, children }: Props = $props();

</script>

<div class="w-full h-full">
  <Card.Root class="h-full flex flex-col">
    <Card.Header class={compact ? "pb-2" : ""}>
      <Card.Title class={compact ? "text-sm" : ""}>{title}</Card.Title>
      <Card.Description class={compact ? "text-xs" : ""}>{description}</Card.Description>
    </Card.Header>
    <Card.Content class="flex-1 flex flex-col justify-center min-h-[256px]">
      {@render children()}
    </Card.Content>
    {#if footerText}
    <Card.Footer>
      <p>{footerText}</p>
    </Card.Footer>
    {/if}
  </Card.Root>
</div>

