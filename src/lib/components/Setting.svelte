<script lang="ts">
   import * as Card from '$lib/components/ui/card';
   import Button from './ui/button/button.svelte';
   import Input from './ui/input/input.svelte';
   import { timer } from '$lib/state/Timer.svelte';
   import { toast } from 'svelte-sonner';

   const secondToMinute = (sec : number) => {
      const result = Math.floor(sec / 60);
      return result;
   }
   
   let focusTime = secondToMinute(timer.duration.focus);
   let shortBreakTime = secondToMinute(timer.duration.shortBreak);
   let longBreakTime = secondToMinute(timer.duration.longBreak);

   const handleSave = () => {
      timer.duration.focus = focusTime * 60;
      timer.duration.longBreak = longBreakTime * 60;
      timer.duration.shortBreak = shortBreakTime * 60;
      toast.success('Succes');
   }
</script>

<div class="flex flex-col gap-4">
   <Card.Root>
      <Card.Header>
         <Card.Title>Pomodoro Setting</Card.Title>
         <Card.Description>you can set your personal pomodor time</Card.Description>
         <Card.Action>
            <Button onclick={handleSave}>Save</Button>
         </Card.Action>
      </Card.Header>
      <Card.Content>
         <div class="flex flex-col gap-2 mb-4">
            <div class="flex items-center justify-between">
               <label for="pomodoro-time" class="min-w-9/12 font-semibold">Focus Time in Minutes</label>
               <Input type="number" placeholder="Pomodoro Time (minutes)" bind:value={focusTime} />
            </div>
            <div class="flex items-center justify-between">
               <label for="pomodoro-time" class="min-w-9/12 font-medium">Short Break Time</label>
               <Input type="number" placeholder="Pomodoro Time (minutes)" bind:value={shortBreakTime}/>
            </div>
            <div class="flex items-center justify-between">
               <label for="pomodoro-time" class="min-w-9/12 font-semibold">Long Break Time</label>
               <Input type="number" placeholder="Pomodoro Time (minutes)" bind:value={longBreakTime}/>
            </div>
         </div>
      </Card.Content>
   </Card.Root>
</div>