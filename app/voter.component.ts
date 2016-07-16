import { Component } from '@angular/core';
import { CandidateService, Candidate, Position } from './candidate-service'

@Component({
    selector: 'voter',
    template:  `
        <p *ngFor="let candidate of candidates.all, let i=index">
            <button (click)="vote(i)" >{{candidate.name}}</button>
            <span *ngFor="let block of blocks(i)" 
                  [innerHTML]="'&#9609;'" 
                  class="hover"
                  [ngClass]="blockStyle(i)"
                  (mouseover)="hover(i)"
                  (mouseleave)="hover()">
            </span>
            <span [ngStyle]="numberStyle(candidate)">{{candidate.count}}</span>
        </p>
        
        <div *ngIf="hoverOver">
            <div [ngSwitch]="hoverOver.position">
                <h1 *ngSwitchCase="Position.FIRST">{{hoverOver.name}} is winning!</h1>
                <h3 *ngSwitchCase="Position.LAST">{{hoverOver.name}} is losing</h3>
                <h2 *ngSwitchDefault>{{hoverOver.name}} has {{hoverOver.count}} votes</h2>
            </div>
        </div>`,
    styles: [`
        button { width: 50px; height: 27px; }
        .hover { cursor: pointer } 
        .first { color: LightGreen; }
        .last { color: Red; }
        .other { color: Gray; }`
    ],
    providers: [CandidateService]
})
export class VoterComponent {

    private hoverOver: Candidate = null;
    private Position: any = Position;

    constructor(private candidates: CandidateService) {};

    private blockStyle(index: number) {
        return Position.toString(this.candidates.getOne(index).position);
    }

    private numberStyle(candidate: Candidate): any {
        return {
            'font-size' : '20px',
            'font-weight' : candidate.position == Position.FIRST ? 'bold' : 'normal'
        }
    }

    private vote(index: number) {
        this.candidates.vote(index);
    }

    private blocks(index: number) {
        return new Array(this.candidates.getOne(index).count);
    }

    private hover(index: number = null): void {
        this.hoverOver = index == null ? null : this.candidates.getOne(index);
    }
}