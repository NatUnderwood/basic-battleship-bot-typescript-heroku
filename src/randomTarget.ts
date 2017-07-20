export class RandomTarget {
    public getNextRandomTarget() {
        return this.getNextRandomRowAndColumn();
    }    
    public findRandomTarget(numberOfSquares: number): number {
        var nextTarget: number =Math.floor(Math.random() * numberOfSquares + 1)
        return nextTarget
    }

    public getNextRandomRowAndColumn() {
        var randomPosition: number = this.findRandomTarget(50);
        var newRowNumber: number = Math.ceil(((randomPosition)*2)/10) + 64;
        var newCol: number = (randomPosition*2)%10+1;
        var newRowString: string =String.fromCharCode(newRowNumber);
        return {Row: newRowString, Column: newCol}
    }

}