<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { TrendingUp, TrendingDown, Minus, Flame, Trophy } from '@lucide/svelte';
</script>

<div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
  <Card.Root>
    <Card.Header>
      <Card.Title class="font-semibold">Focus</Card.Title>
      <Card.Action>
        <Badge variant="default">
          <TrendingUp class="h-4 w-4"/> 20 %
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <p class="text-2xl font-bold">210 Min</p>
    </Card.Content>
    <Card.Footer>
      <p class="text-muted-foreground font-semibold text-sm">Card Footer</p>
    </Card.Footer>
  </Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title class="font-semibold">Session</Card.Title>
      <Card.Action>
        <Badge variant="destructive">
          <TrendingDown class="h-4 w-4"/> 5 %
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <p class="text-2xl font-bold">10x</p>
    </Card.Content>
    <Card.Footer>
      <p class="text-muted-foreground font-semibold text-sm">Card Footer</p>
    </Card.Footer>
  </Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title class="font-semibold">Breaks Taken</Card.Title>
      <Card.Action>
        <Badge variant="secondary">
          <Minus class="h-4 w-4"/> 0 %
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <p class="text-2xl font-bold">4x</p>
    </Card.Content>
    <Card.Footer>
      <p class="text-muted-foreground font-semibold text-sm">Card Footer</p>
    </Card.Footer>
  </Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title class="font-semibold">Consistency</Card.Title>
      <Card.Action>
        <Badge variant="secondary" class="bg-amber-600">
          <Flame class="h-4 w-4"/> 5x
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <p class="text-2xl font-bold">5 Day</p>
    </Card.Content>
    <Card.Footer>
      <p class="text-muted-foreground font-semibold text-sm">Card Footer</p>
    </Card.Footer>
  </Card.Root>

  <Card.Root>
    <Card.Header>
      <Card.Title class="font-semibold">Top Label</Card.Title>
      <Card.Action>
        <Badge variant="default">
          <Trophy class="h-4 w-4"/> Java
        </Badge>
      </Card.Action>
    </Card.Header>
    <Card.Content>
      <p class="text-2xl font-bold">320 Min</p>
    </Card.Content>
    <Card.Footer>
      <p class="text-muted-foreground font-semibold text-sm">Card Footer</p>
    </Card.Footer>
  </Card.Root>
</div>
