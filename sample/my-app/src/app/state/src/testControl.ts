import { StateManager } from "../state-manager";

export class testControl implements StateManager{

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
    //#endregion  end of manager part

    public start() : void {
        this.Goto(this.S_START);
    }
    public is_end() : boolean {
        return this.CheckState(this.S_END);
    }
    //                             [PSGG OUTPUT START]   $/^[SE]_/$
//  psggConverterLib.dll converted from testControl.xlsx.    psgg-file:testControl.psgg
    /*
        S_0001
        new state
    */
    S_0001(bFirst: boolean) {
        if (bFirst) {
            this.curstatename = 'S_0001';
            // this.curstatecmt  = 'new state';
            alert("!!");
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_END);
        }
    }
    /*
        S_END
    */
    S_END(bFirst: boolean) {
        if (bFirst) {
            this.curstatename = 'S_END';
            // this.curstatecmt  = '';
        }
    }
    /*
        S_START
    */
    S_START(bFirst: boolean) {
        if (bFirst) {
            this.curstatename = 'S_START';
            // this.curstatecmt  = '';
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_0001);
        }
    }


    //                             [PSGG OUTPUT END]
}
