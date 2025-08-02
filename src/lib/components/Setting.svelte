<script lang="ts">
   import * as Card from '$lib/components/ui/card';
   import Button from './ui/button/button.svelte';
   import Input from './ui/input/input.svelte';
   import { toast } from 'svelte-sonner';
   import {timerStore} from "$lib/state/Timer.svelte";
   import {timerRuntimeStore} from "$lib/state/TimerRuntime.svelte";
   import * as Avatar from "$lib/components/ui/avatar/index.js";
   import {getColorName, getInitial} from "$lib/util/getColorName";
   import {mode} from "mode-watcher";
   import {userStore} from "$lib/state/User.svelte";

   const secondToMinute = (sec : number) => {
      const result = Math.floor(sec / 60);
      return result;
   }

   let name = $state(userStore.user!.username);
   let email = $state(userStore.user!.email);
   let password = $state('');
   let colorName = $derived(getColorName(name, mode.current as string));

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

   <Card.Root>
      <Card.Header>
         <Card.Title>User Profile Setting</Card.Title>
         <Card.Description>you can set your personal information</Card.Description>
         <Card.Action>
            <Button>Save</Button>
         </Card.Action>
      </Card.Header>
      <Card.Content>
         <div class="flex flex-col gap-2 mb-4">
            <div class="flex items-center justify-start">
               <Avatar.Root class="w-15 h-15">
                  <Avatar.Fallback style="background-color: {colorName?.bgColor}; color: {colorName?.textColor} " class="font-semibold text-2xl">{getInitial(name)}</Avatar.Fallback>
               </Avatar.Root>
               <div class="flex flex-col items-baseline gap-1 ml-2.5">
                  <p class="">{name}</p>
                  <p class="font-semibold text-muted-foreground text-sm">{email}</p>
               </div>
            </div>
            <div class="flex items-center justify-between">
               <label for="pomodoro-time" class="min-w-9/12 font-semibold">Username</label>
               <Input type="text" placeholder="Username" bind:value={name}/>
            </div>
            <div class="flex items-center justify-between">
               <label for="pomodoro-time" class="min-w-9/12 font-medium">Email</label>
               <Input type="email" placeholder="User@gmail.com" bind:value={email}/>
            </div>
            <div class="flex items-center justify-between">
               <label for="pomodoro-time" class="min-w-9/12 font-semibold">Password</label>
               <Input type="password" placeholder="Password" bind:value={password}/>
            </div>
         </div>
      </Card.Content>
   </Card.Root>
</div>