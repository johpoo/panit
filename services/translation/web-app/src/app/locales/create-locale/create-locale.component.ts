import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './../../users/services/user.service';
import { LocalesService } from './../services/locales.service';
import { Locale, LocaleInfo } from './../model';
import { ErrorsService } from './../../shared/errors.service';

@Component({
    selector: 'create-locale',
    templateUrl: 'create-locale.component.html',
    styleUrls: ['create-locale.component.css']
})
export class CreateLocaleComponent {
    public selectedLocale: Locale;
    private availableLocales: LocaleInfo[] = [];

    public searchString: string;
    public modalOpen: boolean;
    public loading: boolean;
    public errors: string[];

    constructor(
        private localesService: LocalesService,
        private route: ActivatedRoute,
        private errorsService: ErrorsService,
    ) {
        this.reset();
        this.localesService.locales
            .subscribe(existingLocales => this.availableLocales = this.computeAvailableLocales(existingLocales));
    }

    filteredLocales() {
        let str = this.searchString || '';
        return this.availableLocales.filter(locale => {
            let v = `${locale.ident} ${locale.country} ${locale.language}`.toLowerCase();
            return v.includes(str.toLowerCase());
        });
    }

    select(locale: Locale) {
        this.selectedLocale = locale;
    }

    deselect() {
        this.selectedLocale = null;
    }

    openModal() {
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
        this.reset();
    }

    reset() {
        this.deselect();
        this.searchString = '';
    }

    computeAvailableLocales(existingLocales: Locale[]): LocaleInfo[] {
        return this.localesService.localeInfoList
            .filter(localeInfo => !existingLocales.find(locale => locale.ident === localeInfo.ident));
    }

    submit() {
        this.loading = true;
        let projectId = this.route.snapshot.params['projectId'];
        this.localesService.createLocale(projectId, this.selectedLocale).subscribe(
            () => { },
            err => {
                this.errors = this.errorsService.mapErrors(err, 'CreateLocale');
                this.loading = false;
            },
            () => {
                this.loading = false;
                this.closeModal();
            }
        );
    }
}
