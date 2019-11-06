import { Sub003aControl } from './Sub003aControl';
import { Sub003bControl } from './Sub003bControl';
import { StateManager } from "../state-manager";
import { StateProgramService } from './../state-program.service';

export class Sub003Control implements StateManager{

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
//  psggConverterLib.dll converted from Sub003Control.xlsx.    psgg-file:Sub003Control.psgg
    /*
        S_ChangeValues
        値変更
    */
    S_ChangeValues(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_ChangeValues';
            // this.curstatecmt  = '値変更';
            this.change_values();
        }
        if (!this.b_stop) { this.Goto( this.S_KickDrawCircle ); }
        else { this.Goto( this.S_END ); }
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
            this.sub003_init();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_ChangeValues);
        }
    }
    /*
        S_KickDrawCircle
        円描画を起動
    */
    S_KickDrawCircle(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_KickDrawCircle';
            // this.curstatecmt  = '円描画を起動';
            this.kick_draw();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_WAIT);
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
        S_WAIT
        待ち
    */
    S_WAIT(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_WAIT';
            // this.curstatecmt  = '待ち';
        }
        if (!this.wait_isdone()) { return; }
        if (!this.HasNextState()) {
            this.Goto(this.S_ChangeValues);
        }
    }


    //                             [PSGG OUTPUT END]

    // my-code
    count = 0;
    b_stop: boolean;
  
    ct: CanvasRenderingContext2D;

    sub003_init() {
        this.b_stop = false;
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

        //
        const sc = new Sub003bControl();
        sc.ct = this.ct;
        sc.width = 800;
        sc.height = 600;
        sc.color  = '#aaaaaa';
        sc.start();
        this.sp.addStateManager(sc);
  }
  change_values() {
        this.b_stop = this.count > 500;
  }

//   br_godraw(st) {
//     if (!this.b_stop) {
//         this.SetNext(st);
//     }
//   }

//   br_notAbove(st) {
//     if (!this.HasNextState()) {
//         this.SetNext(st);
//     }
//   }

  kick_draw() {
    const sc = new Sub003aControl();
    sc.ct = this.ct;
    sc.center_x = this.sp.get_random_int(800);
    sc.center_y = this.sp.get_random_int(600);
    sc.radius   = 1 + this.sp.get_random_int(50);
    sc.start();

    this.sp.addStateManager(sc);

    this.count ++;
  }

  wait_isdone() {
    return true;
  }




}
