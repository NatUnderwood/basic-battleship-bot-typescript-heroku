export class HitTarget {
    public checkSides(currentGrid, position, side: string):string {
        var alreadyHit: string;
        var columnAdd: number = 0;
        var rowAdd: number = 0;
        switch (side) {
            case 'l':
            columnAdd = -1;
            if (position.Column == 1){
                alreadyHit = 'edge';
            }
            break;
            case 'r':
            columnAdd = +1;
            if (position.Column == 10){
                alreadyHit = 'edge';
            }
            break;
            case 'u':
            rowAdd = +1
            if (position.Row == 'A'){
                alreadyHit = 'edge'
            }
            break
            case 'd':
            rowAdd = -1
            if (position.Row == 'J'){
            alreadyHit = 'edge'
            }
        }
        
        if (alreadyHit != 'edge') {
            alreadyHit = 'blank';
            for (var i = 0;i< currentGrid.length; i++ ){
                if (((position.Column + columnAdd) == currentGrid[i].Position.Column) && (String.fromCharCode(position.Row.charCodeAt(0) + rowAdd) == currentGrid[i].Position.Row)){
                    if (currentGrid[i].WasHit){
                        alreadyHit = 'hitShip'
                    }
                    else{
                        alreadyHit = 'hitWater'
                    }
                }
            }
        }
        return alreadyHit;
    }

    public checkDone(currentGrid, position): boolean {
        var boatEndsFound = 0;
        //var blankEndsFound = 0;
        //var length = 1;
        var endsFound = 0;
        var boatSunk = false
        var orientation = this.findOrientation(currentGrid, position)
        var directionOfTravel: string = 'left';
        var currentPosition = position
        
        if (orientation != 'undetermined'){
            if (orientation == 'leftRight'){
                var counter: number = 0;
                while (directionOfTravel != 'done'&& counter<100) {
                    var squareRight: string = this.checkSides(currentGrid, currentPosition, 'r')
                    if (directionOfTravel = 'right') {    
                        switch(squareRight){
                            case 'blank':
                                //blankEndsFound++
                                endsFound++
                                break
                            case 'hitWater':
                                boatEndsFound++
                                endsFound++
                                break
                            case 'edge':
                                boatEndsFound++
                                endsFound++
                                break
                            case 'hitShip':
                                currentPosition = { Row: currentPosition.Row, Column: (currentPosition.Column + 1) }
                                //length++
                                break
                        }
                    }
                    var squareLeft: string = this.checkSides(currentGrid, currentPosition, 'l')
                    if (directionOfTravel = 'left') {    
                        switch(squareLeft){
                            case 'blank':
                                directionOfTravel = 'right'
                                //blankEndsFound++
                                endsFound++
                                currentPosition = position
                                break
                            case 'hitWater':
                                boatEndsFound++
                                endsFound++
                                directionOfTravel = 'right'
                                currentPosition = position
                                break
                            case 'edge':
                                boatEndsFound++
                                endsFound++
                                directionOfTravel = 'right'
                                currentPosition = position
                                break
                            case 'hitShip':
                                currentPosition = { Row: currentPosition.Row, Column: (currentPosition.Column - 1) }
                                //length++
                                break
                        }
                    }
                    
                    if ((/*(blankEndsFound + boatEndsFound)*/endsFound == 2)/*|| length == 5*/){
                        directionOfTravel = 'done'
                    }
                    counter++
                }
                if (boatEndsFound == 2 /*|| length == 5*/){
                    boatSunk = true
                }
            }
        }
        return boatSunk
    }
    public guessOrientation(currentGrid, position){
        var done: string = 'no'
        var hitSquare
        var squareLeft: string = this.checkSides(currentGrid, position,'l');
        if (squareLeft == 'blank' ){
            done ='yes'
            hitSquare = { Row: position.Row, Column: (position.Column - 1) }
        }
        var squareRight: string = this.checkSides(currentGrid, position,'r');
        if (squareRight == 'blank' && done == 'no' ){
            done ='yes'
            hitSquare = { Row: position.Row, Column: (position.Column + 1) }
        }
        var squareUp: string = this.checkSides(currentGrid, position,'u');
        if (squareLeft == 'blank' && done == 'no'){
            done ='yes'
            hitSquare = { Row: String.fromCharCode(position.Row.charCodeAt(0) - 1), Column: (position.Column ) }
        }
        var squareDown: string = this.checkSides(currentGrid, position,'d');
        if (squareRight == 'blank' && done == 'no' ){
            done ='yes'
            hitSquare = { Row: String.fromCharCode(position.Row.charCodeAt(0) + 1), Column: (position.Column) }
        }
        return hitSquare
    }
    
    public findOrientation(currentGrid, position): string {
        var direction: string
        var squareLeft: string = this.checkSides(currentGrid, position,'l')
        var squareRight: string = this.checkSides(currentGrid,position,'r')
        if (squareLeft == 'hitShip'|| squareRight == 'hitShip') {
            direction ='leftRight'
        }
        var squareUp: string = this.checkSides(currentGrid, position,'u')
        var squareDown: string = this.checkSides(currentGrid,position,'d')
        if (squareUp == 'hitShip'|| squareDown == 'hitShip') {
            direction ='upDown'
        }
        if(squareUp != 'hitShip'&& squareDown != 'hitShip'&& squareLeft != 'hitShip'&& squareRight != 'hitShip'){
            direction ='undetermined'
        } 
        return direction
    }
    public destroyShip(currentGrid, position) {
        //var orientation = this.findOrientation(currentGrid,position);
        var hitSquare;
        var choosingSquare = 'searching';
        var currentPosition = position;
        if (/*orientation == 'leftRight'*/true) {
            var directionOfTravel: string = 'left'
            var counter: number = 0;
            while (choosingSquare != 'done'&&counter<100) {    
                var squareLeft: string = this.checkSides(currentGrid, currentPosition,'l')
                
                if (directionOfTravel = 'left') {    
                    switch(squareLeft){
                        case 'blank':
                        hitSquare = { Row: currentPosition.Row, Column: (currentPosition.Column - 1) }
                        choosingSquare = 'done'
                        break
                        case 'hitWater':
                        currentPosition = position;
                        directionOfTravel = 'right'
                        break
                        case 'edge':
                        directionOfTravel = 'right';
                        currentPosition = position;
                        break
                        case 'hitShip':
                        currentPosition = { Row: currentPosition.Row, Column: (currentPosition.Column - 1) }
                        break
                    }
                }
                var squareRight: string = this.checkSides(currentGrid,currentPosition,'r')
                if (directionOfTravel = 'right') {    
                    switch(squareRight){
                        case 'blank':
                            hitSquare = { Row: currentPosition.Row, Column: (currentPosition.Column + 1) }
                            choosingSquare = 'done'
                            break
                        case 'hitWater':
                            hitSquare = { Row: 'J', Column: 10 }
                            choosingSquare = 'done'
                            break
                        case 'edge':
                            hitSquare = { Row: 'J', Column: 10 }
                            choosingSquare = 'done'
                            break
                        case 'hitShip':
                            currentPosition = { Row: currentPosition.Row, Column: (currentPosition.Column + 1) }
                            break
                    }
                }
                counter++
            }
        }
        return hitSquare;
    }
    public findNextTarget() {

    }
}