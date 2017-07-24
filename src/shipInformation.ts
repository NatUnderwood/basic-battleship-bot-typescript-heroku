export class ShipInformation {
    constructor (public endsFound: number, public boatEndsFound: number, public currentPosition: {Row: string, Column: number }, public lengthOfShip: number, public directionOfTravel: string) {

    }
}