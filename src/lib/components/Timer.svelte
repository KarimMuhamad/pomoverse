<script lang="ts">
   import * as Card from '$lib/components/ui/card';
   import { cn } from '$lib/utils';
   import Button from './ui/button/button.svelte';
   
	let activeTab = 'focus';

	const tabs = [
		{ id: 'focus', label: 'FOCUS' },
		{ id: 'break', label: 'BREAK' },
		{ id: 'long_break', label: 'LONG BREAK' }
	];

	function setTab(tabId: string) {
		activeTab = tabId;
	}
</script>

<Card.Root class="w-full max-w-2xl mx-auto shadow-md">
  <Card.Header class="text-center">
    <Card.Title class="font-bold text-2xl">ZERO DISTRACTION ZONE</Card.Title>
    <Card.Description class="italic">
      Close tabs, silence notifications, and dive in
    </Card.Description>
  </Card.Header>

  <Card.Content>
    <div class="flex max-w-full mx-auto justify-center mb-4 border rounded-full">
      {#each tabs as tab}
        <Button
          class="min-w-1/3 py-2 rounded-full {cn(
            activeTab === tab.id ? '' : 'text-muted-foreground'
          )}"
          variant={activeTab === tab.id ? 'default' : 'ghost'}
          onclick={() => setTab(tab.id)}
        >
          {tab.label}
        </Button>
      {/each}
    </div>

   <div class="flex justify-center">
      <div class="text-9xl font-semibold">25:00</div>
   </div>
    
  </Card.Content>

  <Card.Footer class="flex flex-col items-center justify-center space-y-4">
   <p class="text-sm italic text-muted-foreground">Start your first session by clicking the button below.</p>
   <Button class="w-full max-w-xs">START</Button>
  </Card.Footer>
</Card.Root>
