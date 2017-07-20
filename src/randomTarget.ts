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
        var parity: number = (Math.ceil(randomPosition/5))%2
        var newRowNumber: number = Math.ceil(randomPosition/5) + 64;
        var newRowString: string =String.fromCharCode(newRowNumber);
        var newCol: number;
        if (parity == 0) {
            newCol = (randomPosition*2)%10+1;
        }
        else {
            newCol = (randomPosition*2+1)%10+1;
        }
        
        return {Row: newRowString, Column: newCol}
    }

}