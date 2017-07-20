export  class Coordinates {
    constructor(public row: string, public column: number) {}
    public getCoordinates() {
        return { Row: this.row, Column: this.column}
    }
}