export class TdRender {

    // 超簡単レンダラー
    public static MIN  = 0;
    public static HIGH = 1;
    public static MID  = 2;
    public static MAX  = 3;

    public static render_main_list: { [ key: number ]: Array<any> };

    public static add(priority: number, func: any) {
        let element: Array<any> = null;
        if (this.render_main_list.hasOwnProperty(priority)) {
            element = this.render_main_list[priority];
        }
        if (element == null) {
            element = [];
        }
        element.push(func);
        this.render_main_list[priority] = element;
    }

    public static clear() {
        this.render_main_list = {};
    }

    public static Renderer(ct: CanvasRenderingContext2D) {
        if (this.render_main_list == null) { return; }
        for (let i = TdRender.MIN; i < TdRender.MAX; i++) {
            let element: Array<any> = null;
            if (this.render_main_list.hasOwnProperty(i)) {
                element = this.render_main_list[i];
            }
            if (element == null) { continue; }
            element.forEach(j => {
                j(ct);
            });
        }
    }
}
