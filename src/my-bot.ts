import {RandomTarget} from './randomTarget'
import {HitTarget} from './hitTarget'
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
            var previousShot = gamestate.MyShots[gamestate.MyShots.length - 1];
            var hitTarget = new HitTarget;
            var finished = hitTarget.checkDone(gamestate.MyShots,previousShot.Position);
            var result: {Row: string, Column: number };
            if((!previousShot.WasHit) || finished) {
                var isValid: number = 0;
                var randomTarget = new RandomTarget;
                while (isValid) {   
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
            else {
                var orientation = hitTarget.findOrientation(gamestate.MyShots, previousShot.Position);
                if (orientation == 'undetermined') {
                    result = hitTarget.guessOrientation(gamestate.MyShots, previousShot.Position)
                }
                else {
                    var randomTarget = new RandomTarget;
                    result = randomTarget.getNextRandomTarget()
                    //result = hitTarget.destroyShip(gamestate.MyShots, previousShot.Position)
                }
            }
            return result

        }
        else {
            return { Row: "A", Column: 5 };  
        }
    }
}

