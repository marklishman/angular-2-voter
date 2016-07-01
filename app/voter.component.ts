import { Component } from '@angular/core';

const defaultBlock:string = 'default';
const greenBlock:string = 'green';
const redBlock:string = 'red';

interface Vote {
    name:string,
    count:number
}

@Component({
    selector: 'voter',
    template:  `
        <p *ngFor="#vote of votes, #i=index">
            <button (click)="update(i)" >
                {{vote.name}}
            </button>
            <span *ngFor="#b of blocks(i)" 
                  [innerHTML]="'&#9609;'" 
                  [ngClass]="blockColor(i) + '-block'">
            </span>
            <span *ngIf="vote.count">
                {{vote.count}}
            </span>
        </p>`,
    styles: [`
              button { width: 50px; height: 27px; } 
              .default-block { color: Gray; }
              .red-block { color: Red; }
              .amber-block { color: Orange; }
              .green-block { color: LightGreen; }
            `]
})

export class VoterComponent {

    private  votes: Vote[] = [
        {name: 'one', count: 4},
        {name: 'two', count: 6},
        {name: 'three', count: 4},
        {name: 'four', count: 9}
    ];

    update(index:number) {
        this.votes[index].count += 1;
    }

    blocks(index:number) {
        return new Array(this.votes[index].count);
    }

    blockColor(index:number) {
        if (this.votes[index].count == 0) { return defaultBlock; }

        const maxValue = this.votes.reduce( (max, vote) => Math.max(max, vote.count), 0);
        if (this.votes[index].count == maxValue) {
            return greenBlock;
        }

        const minValue = this.votes.reduce( (min, vote) => Math.min(min, vote.count), Number.MAX_VALUE);
        if (this.votes[index].count == minValue) {
            return redBlock;
        }

        return defaultBlock;
    }
}