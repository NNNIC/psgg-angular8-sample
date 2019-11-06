import { MainControl } from './state/src/MainControl';
import { StateProgramService } from './state/state-program.service';
import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  hertimg = './assets/valentines-heart.svg';
  
  constructor(private sp: StateProgramService, public el: ElementRef, public rend: Renderer2 ) {
    this.sp.stateUpdate.start();
    this.sp.appComponent = this;
  }

  get timer() { return this.sp!=null ? this.sp.timer : 0; }

  ngOnInit()
  {
    const sm = new MainControl();
    sm.SetupSp(this.sp);
    sm.start();
    this.sp.addStateManager(sm);    
  }

  test(id) {
    this.sp.addEvent('test_' + id);
  }

}
