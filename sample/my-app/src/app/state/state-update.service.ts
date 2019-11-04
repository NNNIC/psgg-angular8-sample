import { StateManager } from './state-manager';
import { StateArray } from './state-array';
import { Injectable } from '@angular/core';
import { isUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class StateUpdateService {

  private static susvc: StateUpdateService;

  timer: number;

  callLoop: any; // call at everyloop
  callOnce: any; // call at once

  bEnable = true;

  stateArray: StateArray;

  eventList   = [];
  curEvent: any;

  constructor() {
    StateUpdateService.susvc = this;
    this.callLoop = null;
    this.callOnce = null;
    this.timer    = 0;

    this.curEvent = null;
    this.stateArray = new StateArray();
   }

   start() {
    this.bEnable = true;
    window.requestAnimationFrame(this.loop);
   }
   stop() {
     this.bEnable = false;
     window.requestAnimationFrame(null);
   }

   loop() {
     const my = StateUpdateService.susvc; // because of callback by DOM api
     my.timer ++;
    my.curEvent = my.eventList.length > 0 ? my.eventList.shift() : null;

    my.stateArray.update();

    if (my.callLoop != null) {
      my.callLoop();
    }

    if (my.callOnce != null) {
      my.callOnce();
      my.callOnce = null;
    }
    window.requestAnimationFrame(my.loop);
   }

   addEvent(event: any) {
     this.eventList.push(event);
   }

   addStateManager(sm: StateManager, id?: string) {
    if (isUndefined(id)) {
      id = 'global';
    }
    this.stateArray.add(id, sm);
   }

  deleteStateManager(id: string) {
    this.stateArray.clear(id);
  }

}
