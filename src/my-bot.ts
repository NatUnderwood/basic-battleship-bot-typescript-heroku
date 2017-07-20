import {RandomTarget} from './randomTarget'
export class MyBot {
    public getShipPositions() {
        return [
            { StartingSquare: { Row: "A", Column: 1 }, EndingSquare : { Row: "A", Column: 5 } },
            { StartingSquare: { Row: "C", Column: 1 }, EndingSquare : { Row: "C", Column: 4 } },
            { StartingSquare: { Row: "E", Column: 1 }, EndingSquare : { Row: "E", Column: 3 } },
            { StartingSquare: { Row: "G", Column: 1 }, EndingSquare : { Row: "G", Column: 3 } },
            { StartingSquare: { Row: "I", Column: 1 }, EndingSquare : { Row: "I", Column: 2 } },
        ]
    }

    public selectTarget(gamestate) {
        if  (gamestate.MyShots.length > 0) {
            //var previousShot = gamestate.MyShots[0].WasHit;
            var result: {Row: string, Column: number };
            if(true/*!previousShot*/ ) {
                var isValid: number = 0;
                var randomTarget = new RandomTarget;
                while (isValid == 0) {   
                    var newShot = randomTarget.getNextRandomTarget();
                    var alreadyHit: number = 0;
                    for (var i = 0;i< gamestate.MyShots.length; i++ ){
                        if (newShot.Column == gamestate.MyShots[i].Position.Column && newShot.Row == gamestate.MyShots[i].Position.Row){
                            alreadyHit = 1
                        }

                    }
                    if (alreadyHit == 0){
                        isValid = 1
                    }

                    result = newShot
                }
            }
            return result //*/
            //return { Row: "D", Column: 10 };  

        }
        else {
            return { Row: "A", Column: 1 };  
        }
    }
}

