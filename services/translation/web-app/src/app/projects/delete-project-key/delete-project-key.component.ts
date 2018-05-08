import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'delete-project-key',
    templateUrl: 'delete-project-key.component.html'
})
export class DeleteProjectKeyComponent implements OnInit {
    @Input()
    public pending: boolean = false;
    @Input()
    public key: string;
    @Input()
    private submit;

    public repeatKey: string;
    public modalOpen: boolean;

    constructor() { }

    ngOnInit() { }

    confirm() {
        this.submit(this.repeatKey);
    }

    openModal() {
        this.modalOpen = true;
    }

    closeModal() {
        this.modalOpen = false;
        this.reset();
    }

    valid(): boolean {
        if (!this.repeatKey) {
            return false;
        }
        if (this.repeatKey.length <= 0) {
            return false;
        }
        return this.repeatKey === this.key;
    }

    reset() {
        this.repeatKey = '';
    }
}
