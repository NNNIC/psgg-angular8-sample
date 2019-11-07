import { TdRender } from './TdRender';
import { TdBallControl } from './TdBallControl';
import { StateManager } from "../state-manager";
import { StateProgramService } from './../state-program.service';

export class TdMainControl implements StateManager{

    sp: StateProgramService;
    ct: CanvasRenderingContext2D;

    public SetupSp(svc : any) { this.sp = svc; }

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
//  psggConverterLib.dll converted from TdMainControl.xlsx.    psgg-file:TdMainControl.psgg
    /*
        S_BALL
        new state
    */
    S_BALL(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_BALL';
            // this.curstatecmt  = 'new state';
            this.ball_update();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_WORK);
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
        CANVAS作成等
    */
    S_INIT(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_INIT';
            // this.curstatecmt  = 'CANVAS作成等';
            this.initialize();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_UPDATE_BEGIN);
        }
    }
    /*
        S_START
    */
    S_START(bFirst: boolean) : void {
        this.Goto(this.S_INIT);
        this.NoWait();
    }
    /*
        S_TICK
        new state
    */
    S_TICK(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TICK';
            // this.curstatecmt  = 'new state';
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_UPDATE_BEGIN);
        }
    }
    /*
        S_UPDATE_BEGIN
        更新開始
    */
    S_UPDATE_BEGIN(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_UPDATE_BEGIN';
            // this.curstatecmt  = '更新開始';
            this.render_begin();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BALL);
        }
        this.NoWait();
    }
    /*
        S_WORK
    */
    S_WORK(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_WORK';
            // this.curstatecmt  = '';
        }
        this.render();
        if (!this.HasNextState()) {
            this.Goto(this.S_TICK);
        }
        this.NoWait();
    }


    //                             [PSGG OUTPUT END]

    initialize() {

        const app = this.sp.appComponent;
        const el = app.el;
        const rend = app.rend;
        const canvas_el = rend.createElement('canvas');
        rend.setAttribute(canvas_el, 'id', 'cv1');
        rend.setAttribute(canvas_el, 'width',  '800px');
        rend.setAttribute(canvas_el, 'height', '600px');
        rend.setStyle(canvas_el, 'backgroundColor', '#a9a9a9' );
        rend.setStyle(canvas_el, 'position', 'absolute');
        rend.setStyle(canvas_el, 'left',   '200px');
        rend.setStyle(canvas_el, 'bottom', '200px');
        rend.appendChild(el.nativeElement, canvas_el);
    
        this.ct = (<HTMLCanvasElement>canvas_el).getContext('2d');
    
        for ( let i = 0; i < 100; i++) {
          for (let j = 0; j < 30; j++) {
            const ballsc = new TdBallControl();
            ballsc.x = 10 + 12 * i;
            ballsc.y = 10 + 12 * j;
            ballsc.step = 0.1 + 0.3 * j;
            ballsc.start();
    
            this.sp.addStateManager(ballsc);
          }
        }
      }
    
      render_begin() {
        TdRender.clear();
        TdRender.add(1, (ct: CanvasRenderingContext2D)  => {
          ct.fillStyle = '#aaaaaa';
          ct.fillRect(0, 0, 800, 600);
        });
      }
    
      ball_update() {
        // this.updater.update();
      }
    
      render() {
        const ct = this.ct;
        this.sp.stateUpdate.callOnce = () => {
          TdRender.Renderer(this.ct);
        };
      }
}
