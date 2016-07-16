import { Injectable } from "@angular/core";

export enum Position {
    FIRST,
    LAST,
    OTHER
}
export namespace Position {
    export function toString(position: Position): string {
        return Position[position].toLocaleLowerCase();
    }
}

export class Candidate {
    constructor(private _name: string,
                private _count: number,
                public position: Position=Position.OTHER) {}

    get name() {
        return this._name;
    }
    get count() {
        return this._count;
    }
    addVote() {
        this._count++;
    }
}

@Injectable()
export class CandidateService {

    private candidates: Candidate[] = [];

    constructor() {
        this.add(new Candidate('Bob', 4, Position.LAST));
        this.add(new Candidate('Sue', 6));
        this.add(new Candidate('Tom', 4, Position.LAST));
        this.add(new Candidate('Jane', 8, Position.FIRST));
    }

    get all(): Candidate[] {
        return this.candidates;
    }

    getOne(index: number): Candidate {
        return this.all[index];
    }

    vote(index: number): void {
        this.all[index].addVote();
        this.all.forEach( candidate => {
            switch(candidate.count) {
                case this.maxCount():
                    candidate.position = Position.FIRST;
                    break;
                case this.minCount():
                    candidate.position = Position.LAST;
                    break;
                default:
                    candidate.position = Position.OTHER;
            }
        });
    }

    private add(candidate: Candidate): void {
        this.all.push(candidate);
    }

    private maxCount() {
        return this.all.reduce( (max, vote) => Math.max(max, vote.count), 0);
    }

    private minCount() {
        return this.all.reduce( (min, vote) => Math.min(min, vote.count), Number.MAX_VALUE);
    }
}