import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../auth';
import { TokenService } from './../../auth';
import { ProjectMenuService } from './../services/project-menu.service';

@Component({
    selector: 'appbar',
    templateUrl: 'appbar.component.html',
    styleUrls: ['appbar.component.css']
})
export class AppBarComponent implements OnInit {
    @Input()
    title: string;

    public isMenuActive: boolean;

    constructor(
        private auth: AuthService,
        private router: Router,
        private projectMenu: ProjectMenuService,
        private token: TokenService,
    ) { }

    ngOnInit() {
        this.projectMenu.menuActive
            .subscribe(active => this.isMenuActive = active);
    }

    toggleMenu() {
        if (this.isMenuActive) {
            this.projectMenu.setInactive();
        } else {
            this.projectMenu.setActive();
        }
    }

    menuToggleHidden() {
        // Match nested routes of /projects/*
        return !this.router.url.match(/projects\/[\w\d].*/);
    }

    get isAuth(): boolean {
        return this.auth.isLoggedIn();
    }

    logout(): void {
        this.token.removeToken();
        this.router.navigate(['/login']);
    }
}
