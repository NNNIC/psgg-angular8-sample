import { StateManager } from './state-manager';
export class StateArray {

    public controlList: { [ key: string ]: Array<StateManager> };

    constructor() {
        this.controlList = {};
    }

    public update() {
        // Update
        for (const key in this.controlList) {
            if (this.controlList.hasOwnProperty(key)) {
                const element = this.controlList[key];
                if (element != null) {
                    element.forEach(sc => {
                    sc.Update();
                    });
                }
            }
        }
        // 期限切れを削除
        for (const key in this.controlList) {
            if (this.controlList.hasOwnProperty(key)) {
                const element = this.controlList[key];
                if (element != null) {
                    for (let i = 0; i < element.length; i++) {
                        const sc = element[i];
                        if (sc.bOutOfDate) {
                            element.splice(i, 1);
                            this.controlList[key] = element;
                            break;
                        }
                    }
                }
            }
        }
    }

    // for sub state machines with uuid
    public add(uuid: string, sc: StateManager) {
        let element: Array<StateManager> = null;
        if (this.controlList.hasOwnProperty(uuid)) {
            element = this.controlList[uuid];
        }
        if (element == null) {
        element = [];
        }

        element.push(sc);
        this.controlList[uuid] = element;
    }
    // 指定uuidのscを削除
    public clear(uuid: string) {
        if (this.controlList.hasOwnProperty(uuid)) {
        delete this.controlList[uuid];
        }
    }

    public add_wo_uuid(sc: StateManager) {
        this.add('none-uuid', sc);
    }

    public clear_wo_uuid() {
        this.clear('none-uuid');
    }
}
