<script lang="ts">
   import * as Card from '$lib/components/ui/card';
   import Button from './ui/button/button.svelte';
   import Input from './ui/input/input.svelte';
   import { toast } from 'svelte-sonner';
   import {timerStore} from "$lib/state/Timer.svelte";
   import {timerRuntimeStore} from "$lib/state/TimerRuntime.svelte";

   const secondToMinute = (sec : number) => {
      const result = Math.floor(sec / 60);
      return result;
   }

   const timer = $state(timerStore.timer);
   const runtimeTimer = $state(timerRuntimeStore);

   let focusTime = $state(secondToMinute(timer.duration.focus));
   let shortBreakTime = $state(secondToMinute(timer.duration.short_Break));
   let longBreakTime = $state(secondToMinute(timer.duration.long_Break));

   const handleSave = () => {
      timerStore.updateDuration({
         focus: focusTime * 60,
         short_Break: shortBreakTime * 60,
         long_Break: longBreakTime * 60
      });

      if (localStorage.getItem('accessToken')) {
         timerStore.updatePreferencesApi();
      }

      runtimeTimer.reset();
      toast.success("Success Saved Setting");
   }
</script>

<div class="flex flex-col gap-4">
   <Card.Root>
      <Card.Header>
         <Card.Title>Pomodoro Setting</Card.Title>
         <Card.Description>you can set your personal pomodoro</Card.Description>
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