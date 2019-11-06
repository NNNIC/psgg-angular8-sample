import { StateManager } from "../state-manager";
import { StateProgramService } from './../state-program.service';

export class Sub003bControl implements StateManager{

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
//  psggConverterLib.dll converted from Sub003bControl.xlsx.    psgg-file:Sub003bControl.psgg
    /*
        S_CLEARALL
        全削除
    */
    S_CLEARALL(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_CLEARALL';
            // this.curstatecmt  = '全削除';
        }
        this.clear_all();
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
        S_START
    */
    S_START(bFirst: boolean) : void {
        this.Goto(this.S_CLEARALL);
        this.NoWait();
    }


    //                             [PSGG OUTPUT END]

    // my code
    public ct: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public color:  string;

    clear_all() {
        this.ct.fillStyle = this.color;
        this.ct.fillRect(0, 0, this.width, this.height);
    }
     
}
