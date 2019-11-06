import { StateManager } from "../state-manager";
import { StateProgramService } from './../state-program.service';
import { ElementRef, Renderer2 } from '@angular/core';
export class Sub001Control implements StateManager{

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
//  psggConverterLib.dll converted from Sub001Control.xlsx.    psgg-file:Sub001Control.psgg
    /*
        S_DESTROY
        終了処理
    */
    S_DESTROY(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_DESTROY';
            // this.curstatecmt  = '終了処理';
            this.destroy();
            this.bOutOfDate = true;
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_END);
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
        初期化
    */
    S_INIT(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_INIT';
            // this.curstatecmt  = '初期化';
            this.init();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_UPDATE);
        }
        this.NoWait();
    }
    /*
        S_START
    */
    S_START(bFirst: boolean) : void {
        this.Goto(this.S_INIT);
        this.NoWait();
    }
    /*
        S_UPDATE
        更新
    */
    S_UPDATE(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_UPDATE';
            // this.curstatecmt  = '更新';
        }
        this.update();
        if (!this.isDone()) { return; }
        if (!this.HasNextState()) {
            this.Goto(this.S_DESTROY);
        }
    }


    //                             [PSGG OUTPUT END]

    // write code here!

    private el:   ElementRef;
    private img:  any;
    private pos:  any;
    private rend: Renderer2;
    private parent: any;
    private left: number;
 

    init() {
  
      const app = this.sp.appComponent;
  
      this.left = 1;
  
      this.el = app.el;
      this.rend = app.rend;
      this.img  = this.rend.createElement('img');
      this.rend.setAttribute(this.img, 'src'  , app.hertimg);
      this.rend.setAttribute(this.img, 'width', '100px');
  
  
      this.rend.setStyle(this.img, 'position', 'absolute');
      this.rend.setStyle(this.img, 'top', '0px' );
      this.rend.setStyle(this.img, 'left', this.left.toString() + 'px' );
      this.rend.appendChild(this.el.nativeElement, this.img);
    }
    update() {
        this.left += 10;
        this.rend.setStyle(this.img, 'left', this.left.toString() + 'px' );
        this.rend.setAttribute(this.img, 'width', this.left.toString() + 'px' );
    }
  
    isDone(): boolean {
        if (this.left > 800) {
            this.rend.removeChild(this.el.nativeElement, this.img);
            return true;
        }
        return false;
    }
  
    destroy() {
  
    }
}
