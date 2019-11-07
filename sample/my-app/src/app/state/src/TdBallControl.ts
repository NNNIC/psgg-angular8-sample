import { StateManager } from "../state-manager";
import { StateProgramService } from './../state-program.service';
import { TdRender } from './TdRender';

export class TdBallControl implements StateManager{

    sp: StateProgramService;
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
//  psggConverterLib.dll converted from TdBallControl.xlsx.    psgg-file:TdBallControl.psgg
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
            this.initialize();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_MOVE);
        }
        this.NoWait();
    }
    /*
        S_MOVE
        移動
    */
    S_MOVE(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_MOVE';
            // this.curstatecmt  = '移動';
        }
        this.move();
        if (!this.is_done()) { return; }
        if (!this.HasNextState()) {
            this.Goto(this.S_DESTROY);
        }
    }
    /*
        S_START
    */
    S_START(bFirst: boolean) : void {
        this.Goto(this.S_INIT);
        this.NoWait();
    }


    //                             [PSGG OUTPUT END]
    // Imprement here!

  width  = 10;
  height = 10;

  x = 0;
  y = 100;
  step = 1;


  xmax = 800;

  initialize() {

  }

  move() {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;
    TdRender.add( TdRender.MID, (ct: CanvasRenderingContext2D) => {
      ct.fillStyle = '#ffff00';
      ct.fillRect( x, y, w, h);
    } );
    this.x += this.step;
  }

  is_done() {
    return (this.x - this.step > this.xmax);
  }

}
