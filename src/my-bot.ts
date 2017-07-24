import {RandomTarget} from './randomTarget'
import {HitTarget} from './hitTarget'
export class MyBot {
    public getShipPositions() {
        return [
            { StartingSquare: { Row: "A", Column: 2 }, EndingSquare : { Row: "A", Column: 6 } },
            { StartingSquare: { Row: "C", Column: 1 }, EndingSquare : { Row: "C", Column: 4 } },
            { StartingSquare: { Row: "H", Column: 5 }, EndingSquare : { Row: "J", Column: 5 } },
            { StartingSquare: { Row: "G", Column: 1 }, EndingSquare : { Row: "G", Column: 3 } },
            { StartingSquare: { Row: "I", Column: 1 }, EndingSquare : { Row: "J", Column: 1 } },
        ]
    }

    public selectTarget(gamestate) {
        if  (gamestate.MyShots.length > 0) {
            var finished = true;
            var previousShot = gamestate.MyShots[gamestate.MyShots.length - 1];
            var hitTarget = new HitTarget;
            for ( var i = 0; i < Math.min(gamestate.MyShots.length,4); i++){
                 previousShot = gamestate.MyShots[gamestate.MyShots.length - i - 1];
                 if (previousShot.WasHit) {
                   finished = hitTarget.checkDone(gamestate.MyShots,previousShot.Position);
                   break;
                 }
            }
            var result: {Row: string, Column: number };
            if (finished) {
                var isValid: boolean = true ;
                var randomTarget = new RandomTarget;
                while (isValid) {   
                    var newShot = randomTarget.getNextRandomTarget();
                    var alreadyHit = false;
                    for (var i = 0;i< gamestate.MyShots.length; i++ ){
                        if (newShot.Column == gamestate.MyShots[i].Position.Column && newShot.Row == gamestate.MyShots[i].Position.Row){
                            alreadyHit = true;
                        }

                    }
                    if (!alreadyHit){
                        isValid = false
                    }

                    result = newShot;
                }
            }
            else {
                var orientation = hitTarget.findOrientation(gamestate.MyShots, previousShot.Position);
                if (orientation == 'undetermined') {
                    result = hitTarget.guessOrientation(gamestate.MyShots, previousShot.Position);
                }
                else {
                    result = hitTarget.destroyShip(gamestate.MyShots, previousShot.Position);
                }
            }
            return result;

        }
        else {
            var randomTarget = new RandomTarget;
            var newShot = randomTarget.getNextRandomTarget();
            return newShot; 
        }
    }
}

