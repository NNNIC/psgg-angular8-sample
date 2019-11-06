import { StateManager } from "../state-manager";
import { StateProgramService } from './../state-program.service';
import { ElementRef, Renderer2 } from '@angular/core';
export class Sub002Control implements StateManager{

    sp: StateProgramService;
    public SetupSp(svc : any) : void { this.sp = svc; }

    //#region start of manager part
    public curstatename: string;
    public curstatecmt: string;

    public curstate : any;
    public nextstate : any;
    public candidatestate : any;
    public bNoWait : boolean;

    public bOutOfDate: boolean;

    public Goto(func: any) {
        this.nextstate = func;
    }

    public Update() : void {
        while (true) {
            this.bNoWait = false;
            this._update();
            if (this.bNoWait) {
                continue;
            } else {
                break;
            }
        }
    }
    private _update() {
        let bFirst = false;
        if (this.nextstate != null) {
            this.curstate  = this.nextstate;
            this.nextstate = null;
            bFirst = true;
        }

        if (this.curstate != null) {
            this.curstate(bFirst);
        }

         if (bFirst) {
            console.log(this.curstatename);
         }
    }

    public CheckState(func:any): boolean {
        return this.curstate === func;
    }

    // Candidate and go
    public HasNextState(): boolean {
        return this.nextstate != null;
    }

    // non wait update
    public NoWait() : void {
        this.bNoWait = true;
    }

    // go subroutine
    private m_callstack : Array<any> = new Array<any>();
    public GoSubState(subst : any, nexst: any) : void {
        this.m_callstack.push(nexst);
        this.Goto(subst);
    }
    // subroutine return
    public ReturnState() : void {
        this.Goto(this.m_callstack.pop());
    }

    //#endregion  end of manager part

    public start() : void {
        this.Goto(this.S_START);
    }
    public is_end() : boolean {
        return this.CheckState(this.S_END);
    }
    //                             [PSGG OUTPUT START]   $/^[SE]_/$
//  psggConverterLib.dll converted from Sub002Control.xlsx.    psgg-file:Sub002Control.psgg
    /*
        S_0001
        1tick待ち
    */
    S_0001(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_0001';
            // this.curstatecmt  = '1tick待ち';
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_INIT);
        }
    }
    /*
        S_DESTROY
        終了処理
    */
    S_DESTROY(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_DESTROY';
            // this.curstatecmt  = '終了処理';
            this.bOutOfDate=true;
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_END);
        }
        this.NoWait();
    }
    /*
        S_DRAW_CIRCLE
        円作成
    */
    S_DRAW_CIRCLE(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_DRAW_CIRCLE';
            // this.curstatecmt  = '円作成';
            this.draw_circle_init();
        }
        this.draw_circle_update();
        if (!this.draw_circle_wait()) { return; }
        if (!this.HasNextState()) {
            this.Goto(this.S_DESTROY);
        }
        this.NoWait();
    }
    /*
        S_END
    */
    S_END(bFirst: boolean) : void {
    }
    /*
        S_INIT
        キャンバス作成
    */
    S_INIT(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_INIT';
            // this.curstatecmt  = 'キャンバス作成';
            this.sub002_init();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_DRAW_CIRCLE);
        }
        this.NoWait();
    }
    /*
        S_START
    */
    S_START(bFirst: boolean) : void {
        this.Goto(this.S_0001);
        this.NoWait();
    }


    //                             [PSGG OUTPUT END]

    // write code here!
    ct: CanvasRenderingContext2D;
    angle: number;
    step:  number;
    
    sub002_init() {
      const app = this.sp.appComponent;
      const el = app.el;
      const rend = app.rend;
      const canvas_el = rend.createElement('canvas');
      rend.setAttribute(canvas_el, 'id', 'cv1');
      rend.setAttribute(canvas_el, 'width',  '400px');
      rend.setAttribute(canvas_el, 'height', '400px');
      rend.setStyle(canvas_el, 'backgroundColor', '#ffffff00' );
      rend.setStyle(canvas_el, 'position', 'absolute');
      rend.setStyle(canvas_el, 'left',   '200px');
      rend.setStyle(canvas_el, 'bottom', '200px');
      rend.appendChild(el.nativeElement, canvas_el);
  
      this.ct = (<HTMLCanvasElement>canvas_el).getContext('2d');
      this.ct.fillStyle = '#ff0000';
      this.ct.fillRect(0, 0, 200, 200);
    }
  
    draw_circle_init() {
      const ct = this.ct;
      ct.lineWidth = 8;
      this.angle = 0;
      this.step  = 1;
    }
  
    draw_circle_update() {
  
      let a: number = this.angle;
      if (a > 360) { a = 360; }
  
      const ct = this.ct;
      ct.fillStyle = '#ffffff';
      ct.beginPath();
      ct.arc(100 , 100, 80, 0, (Math.PI * 2) * (a / 360) );
      ct.stroke();
      this.angle += this.step;
  
    }
  
    draw_circle_wait(): boolean {
      return (this.angle - this.step > 360);
    }
  }
