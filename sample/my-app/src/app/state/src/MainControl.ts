import { StateManager } from "../state-manager";
import { Sub001Control } from "./Sub001Control";
import { StateProgramService } from './../state-program.service';
import { Sub002Control } from "./Sub002Control";
import { Sub003Control } from "./Sub003Control";
import { TdMainControl } from './TdMainControl';

export class MainControl implements StateManager{

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
//  psggConverterLib.dll converted from MainControl.xlsx.    psgg-file:MainControl.psgg
    /*
        S_ALERT
    */
    S_ALERT(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_ALERT';
            // this.curstatecmt  = '';
            alert(" Calling from subroutine.");
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_RETURN1);
        }
    }
    /*
        S_ALERT1
    */
    S_ALERT1(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_ALERT1';
            // this.curstatecmt  = '';
            alert(" Calling from subroutine.\n Couny="+ this.m_count);
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_RETURN2);
        }
    }
    /*
        S_BACKTO_BUTTON
    */
    S_BACKTO_BUTTON(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_BACKTO_BUTTON';
            // this.curstatecmt  = '';
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BUTTONS);
        }
    }
    /*
        S_BUTTONS
        ボタン分岐
    */
    S_BUTTONS(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_BUTTONS';
            // this.curstatecmt  = 'ボタン分岐';
        }
        if (this.sp.curEvent === 'test_1') { this.Goto( this.S_TEST0001 ); }
        else if (this.sp.curEvent === 'test_2') { this.Goto( this.S_TEST0002 ); }
        else if (this.sp.curEvent === 'test_3') { this.Goto( this.S_TEST0003 ); }
        else if (this.sp.curEvent === 'test_4') { this.Goto( this.S_TEST0004 ); }
        else if (this.sp.curEvent === 'test_5') { this.Goto( this.S_TEST0005 ); }
        else if (this.sp.curEvent === 'test_6') { this.Goto( this.S_TEST0006 ); }
        else if (this.sp.curEvent === 'test_7') { this.Goto( this.S_TEST0007 ); }
        else if (this.sp.curEvent === 'test_8') { this.Goto( this.S_TEST0008 ); }
        else if (this.sp.curEvent === 'test_9') { this.Goto( this.S_TEST0009 ); }
        else if (this.sp.curEvent === 'test_10') { this.Goto( this.S_TEST0010 ); }
        else if (this.sp.curEvent === 'test_11') { this.Goto( this.S_TEST0011 ); }
        else if (this.sp.curEvent === 'test_12') { this.Goto( this.S_LOOP1 ); }
    }
    /*
        S_END
    */
    S_END(bFirst: boolean) : void {
    }
    /*
        S_LOOP1
        ５回ループ
    */
    private m_count = 0;
    S_LOOP1(bFirst: boolean) : void {
        this.m_count = 0;
        this.Goto(this.S_LOOP1_LoopCheckAndGosub____);
        this.NoWait();
    }
    S_LOOP1_LoopCheckAndGosub____(bFirst: boolean) : void {
        if (this.m_count < 5) this.GoSubState(this.S_SUBSTART2,this.S_LOOP1_LoopNext____);
        else               this.Goto(this.S_BUTTONS);
        this.NoWait();
    }
    S_LOOP1_LoopNext____(bFirst: boolean)  : void {
        this.m_count++;
        this.Goto(this.S_LOOP1_LoopCheckAndGosub____);
        this.NoWait();
    }
    /*
        S_RETURN1
        A Subroutine Return
    */
    S_RETURN1(bFirst: boolean) : void
    {
        this.ReturnState();
        this.NoWait();
    }
    /*
        S_RETURN2
        A Subroutine Return
    */
    S_RETURN2(bFirst: boolean) : void
    {
        this.ReturnState();
        this.NoWait();
    }
    /*
        S_START
    */
    S_START(bFirst: boolean) : void {
        this.Goto(this.S_BUTTONS);
        this.NoWait();
    }
    /*
        S_SUBSTART1
        A Subroutine Start
    */
    S_SUBSTART1(bFirst: boolean) : void {
        this.Goto(this.S_ALERT);
        this.NoWait();
    }
    /*
        S_SUBSTART2
        A Subroutine Start
    */
    S_SUBSTART2(bFirst: boolean) : void {
        this.Goto(this.S_ALERT1);
        this.NoWait();
    }
    /*
        S_TEST0001
    */
    S_TEST0001(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0001';
            // this.curstatecmt  = '';
            console.log('test001 program');
            const app = this.sp.appComponent;
            const el = app.el;
            const rend = app.rend;
            const target = el.nativeElement;
            rend.setStyle(target, 'color', 'red');
            rend.listen(target, 'click', () => alert('ok'));
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0002
    */
    S_TEST0002(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0002';
            // this.curstatecmt  = '';
            console.log('test002 program');
            const app = this.sp.appComponent;
            const el = app.el;
            const rend = app.rend;
            const div = rend.createElement('div');
            const text = rend.createText('Hello world!');
            rend.appendChild(div, text);
            rend.appendChild(el.nativeElement, div);
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0003
    */
    S_TEST0003(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0003';
            // this.curstatecmt  = '';
            console.log('test003 program');
            const app = this.sp.appComponent;
            const el = app.el;
            const rend = app.rend;
            const target = document.getElementById('hoge');
            const span = rend.createElement('span');
            const text = rend.createText('Insert text by id');
            if (target != null) {
                rend.appendChild(span, text);
                rend.appendChild(target, span);
            }
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0004
    */
    S_TEST0004(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0004';
            // this.curstatecmt  = '';
            console.log('test004 program');
            const app = this.sp.appComponent;
            const el = app.el;
            const rend = app.rend;
            const parent = document.getElementById('hoge');
            if (parent != null && parent.firstChild != null) {
                rend.removeChild(parent, parent.firstChild);
            }
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0005
    */
    S_TEST0005(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0005';
            // this.curstatecmt  = '';
            console.log('test005 program');
            const app = this.sp.appComponent;
            const el = app.el;
            const rend = app.rend;
            const img = rend.createElement('img');
            rend.setAttribute(img, 'src'  , app.hertimg);
            rend.setAttribute(img, 'width', '100px');
            rend.appendChild(el.nativeElement, img);
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0006
    */
    S_TEST0006(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0006';
            // this.curstatecmt  = '';
            console.log('test006 program');
            const sc = new Sub001Control();
            sc.start();
            sc.SetupSp(this.sp);
            this.sp.addStateManager(sc);
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0007
    */
    S_TEST0007(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0007';
            // this.curstatecmt  = '';
            console.log('test007 program');
            const app = this.sp.appComponent;
            const el = app.el;
            const rend = app.rend;
            const canvas_el = rend.createElement('canvas');
            rend.setAttribute(canvas_el, 'id', 'cv1');
            rend.setAttribute(canvas_el, 'width',  '200px');
            rend.setAttribute(canvas_el, 'height', '200px');
            rend.setStyle(canvas_el, 'backgroundColor', '#ffffff00' );
            rend.setStyle(canvas_el, 'position', 'absolute');
            rend.setStyle(canvas_el, 'left',   '200px');
            rend.setStyle(canvas_el, 'bottom', '200px');
            rend.appendChild(el.nativeElement, canvas_el);
            const ctx = (<HTMLCanvasElement>canvas_el).getContext('2d');
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, 0, 80, 80);
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(40, 40, 40, 0, (Math.PI * 2) * (3 / 4));
            ctx.stroke();
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0008
    */
    S_TEST0008(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0008';
            // this.curstatecmt  = '';
            console.log('test008 program');
            const sc = new Sub002Control();
            sc.SetupSp(this.sp);
            sc.start();
            this.sp.addStateManager(sc);
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0009
    */
    S_TEST0009(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0009';
            // this.curstatecmt  = '';
            console.log('test009 program');
            const sc = new Sub003Control();
            sc.SetupSp(this.sp);
            sc.start();
            this.sp.addStateManager(sc);
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0010
    */
    S_TEST0010(bFirst: boolean) : void {
        if (bFirst) {
            this.curstatename = 'S_TEST0010';
            // this.curstatecmt  = '';
            console.log('test010 program');
            const sc = new TdMainControl();
            sc.SetupSp(this.sp);
            sc.start();
            this.sp.addStateManager(sc);
        }
        if (!this.HasNextState()) {
            this.Goto(this.S_BACKTO_BUTTON);
        }
    }
    /*
        S_TEST0011
        サブルーチン
    */
    S_TEST0011(bFirst: boolean) : void {
        this.GoSubState(this.S_SUBSTART1,this.S_BUTTONS);
        this.NoWait();
    }


    //                             [PSGG OUTPUT END]
}
