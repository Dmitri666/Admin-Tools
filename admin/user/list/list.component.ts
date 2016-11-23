import {Component} from '@angular/core';
import {Router} from '@angular/router';



@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class UserListComponent {




    constructor(private _router: Router) {
    }

    create(): void {
        this._router.navigate(['/admin/users/details', 'new']);
    }


}
