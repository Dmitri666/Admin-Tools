import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';





@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class UserDetailsComponent  implements OnInit {

    public isRoleAddview: boolean;
    public imageUrl: string;



    constructor(router: Router) {


    }

    ngOnInit(): void {

    }










}
