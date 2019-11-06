import { StateManager } from "../state-manager";
import { StateProgramService } from './../state-program.service';

export class Sub003aControl implements StateManager{

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
//  psggConverterLib.dll converted from Sub003aControl.xlsx.    psgg-file:Sub003aControl.psgg
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
        S_DRAW_CIRCLE
        円描画
    */
    S_DRAW_CIRCLE(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_DRAW_CIRCLE';
            // this.curstatecmt  = '円描画';
            this.draw_init();
        }
        this.draw_update();
        if (!this.draw_wait()) { return; }
        if (!this.HasNextState()) {
            this.Goto(this.S_DESTROY);
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
        this.Goto(this.S_INIT);
        this.NoWait();
    }


    //                             [PSGG OUTPUT END]

    // implement
    
    public ct: CanvasRenderingContext2D;
    public center_x = 100;
    public center_y = 100;
    public radius   = 100;
    public step     = 1;

    angle: number;

    draw_init() {
        this.angle = 0;
        this.ct.lineWidth = 8;
    }
    
    draw_update() {
        let a = this.angle;
        if (a > 360) { a = 360; }

        const ct = this.ct;
        ct.strokeStyle = 'red';
        ct.beginPath();
        ct.arc(this.center_x, this.center_y, this.radius, 0, (Math.PI * 2) * (a / 360) );
        ct.stroke();
        this.angle += this.step;
    }
    
    draw_wait() {
        return (this.angle - this.step) > 360;
    }
}
