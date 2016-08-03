import {Component, NgZone} from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {shell} from 'electron';


@Component({
    selector: 'myapp',
    templateUrl: 'app.component.html',
    directives: [MaterializeDirective]
})

export class AppComponent {
    subr:string;
    constructor(private http:Http, private zone: NgZone) {}
    entries = [];
    showcards: boolean = false;
    makecall() {
        this.http.get('https://www.reddit.com/r/' + this.subr + '.json')
        .map(res => res.json())
        .map(json => json.data.children)
        .map(child => child.map(e => {
            let temp = 'http://placehold.it/70x70';
            if(e.data.preview != undefined){
                temp = e.data.preview.images[0].source.url;
            }
            
            return {
                id: e.data.id,
                title: e.data.title,
                url: e.data.url,
                image: temp
            }
            
         }))
        .subscribe(data => {
            this.entries = data;
            this.zone.run(() => {
            this.showcards = true;    
            })
            
        })
    }
    
    openlinks(incomingurl) {
        shell.openExternal(incomingurl);
    }
}