export interface StateManager {
    curstatename: string;
    curstatecmt: string;

    curstate: any;
    nextstate: any;
    bNoWait: boolean;

    bOutOfDate: boolean;

    Goto(func: any) : void;

    Update() : void ;


    CheckState(func: any): boolean;

    // Candidate and go
    HasNextState(): boolean;

    // non wait update
    NoWait() : void;

    start() : void;
    is_end() : boolean;

}

