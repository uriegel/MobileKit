import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        this.items = Array.from(Array(100).keys()).map((_, i) => `Eintrag ${i}`)
    }

    items: string[]

    constructor() {}

    onClickStart() {
        console.log("Haptic")
    }

    onNeue() {
        this.items = this.items.concat([...Array(50)].map((_, i) => `Eintrag ${i}`))
    }

    onWeg() {
        this.items = this.items.slice(0, this.items.length - 10)
    }
}

