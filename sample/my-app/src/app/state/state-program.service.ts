import { StateManager } from './state-manager';
import { AppComponent } from './../app.component';
import { StateUpdateService } from './state-update.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateProgramService {

  appComponent: AppComponent;

  constructor(public stateUpdate: StateUpdateService) { }

  get timer()   { return this.stateUpdate.timer;       }
  get bEnable() { return this.stateUpdate.bEnable;    }

  get curEvent() { return this.stateUpdate.curEvent; }

  addEvent(event) { this.stateUpdate.addEvent(event); }
  addStateManager(sm: StateManager) { this.stateUpdate.addStateManager(sm); }

    // random
  public get_random_int(max: number): number {
      return Math.floor(Math.random() * Math.floor(max));
  }

}
