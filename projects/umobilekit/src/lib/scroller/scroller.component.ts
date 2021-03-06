import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core'

declare class ScrollerParams {
    /*  
     *  Should scrollbar be shown?
     */
    scrollbars: boolean
    interactiveScrollbars: boolean
    click: boolean
    /*
     * Should mouse be supported?
     */
    disablePointer?: boolean
    disableTouch: boolean
    fadeScrollbars: boolean
    shrinkScrollbars: 'clip'
}
declare class IScroll {
    constructor(wrapper: HTMLElement, params: ScrollerParams)
    refresh(): void
}

@Component({
    selector: 'mk-scroller',
    templateUrl: './scroller.component.html',
    styleUrls: ['./scroller.component.css']
})
export class ScrollerComponent implements OnInit, AfterViewInit {

    static refresh() {
        ScrollerComponent.scrollers.forEach(n => n.refresh())
    }

    @ViewChild("scroller")
    scroller: ElementRef

    @Input()
    showScrollBar = true

    constructor() { }

    ngOnInit() {
        ScrollerComponent.scrollers = ScrollerComponent.scrollers.concat([this])
    }

    ngAfterViewInit() {
        this.iscroll = new IScroll(this.scroller.nativeElement, {
            scrollbars: this.showScrollBar,
            interactiveScrollbars: this.showScrollBar,
            click: true,
            //disablePointer: true,
            disableTouch: false,
            fadeScrollbars: true,
            shrinkScrollbars: 'clip'
        })

        this.observer.observe(this.scroller.nativeElement, {
            subtree: true,
            childList: true
        })
        this.iscroll.refresh()
    }

    refresh() { this.iscroll.refresh() }

    private static scrollers: ScrollerComponent[] = []

    private readonly observer = new MutationObserver(mutations => 
        this.iscroll.refresh()
    )

    private iscroll: any
}

