export class HitTarget {
    public checkSides(currentGrid, position, side: string):string {
        var alreadyHit: string;
        var columnAdd: number = 0;
        var rowAdd: number = 0;
        switch (side) {
            case 'l':
                columnAdd = - 1;
                if (position.Column == 1){
                    alreadyHit = 'edge';
                }
                break;
            case 'r':
                columnAdd = 1;
                if (position.Column == 10){
                    alreadyHit = 'edge';
                }
                break;
            case 'u':
                rowAdd = 1;
                if (position.Row == 'A'){
                    alreadyHit = 'edge';
                }
                break;
            case 'd':
                rowAdd = - 1
                if (position.Row == 'J'){
                    alreadyHit = 'edge';
                }
                break;
        }
        
        if (alreadyHit != 'edge') {
            alreadyHit = 'blank';
            var columnPosition = position.Column + columnAdd;
            var rowPosition = String.fromCharCode(position.Row.charCodeAt(0) + rowAdd);
            for (var i = 0; i < currentGrid.length; i++ ){
                if ((columnPosition == currentGrid[i].Position.Column) && (rowPosition == currentGrid[i].Position.Row)){
                    if (currentGrid[i].WasHit){
                        alreadyHit = 'hitShip';
                    }
                    else{
                        alreadyHit = 'hitWater';
                    }
                }
            }
        }
        return alreadyHit;
    }
    public directionChange (shipInformation, position) {
        if (shipInformation.DirectionOfTravel == 'left' ) {
            shipInformation.DirectionOfTravel = 'right'
            shipInformation.CurrentPosition = position;
        }
        if (shipInformation.DirectionOfTravel == 'up' ) {
            shipInformation.DirectionOfTravel = 'down'
            shipInformation.CurrentPosition = position;
        }
        return shipInformation;
    }
    public checkSquare(position,square,shipInformation,columnAdd, rowAdd) {
        switch(square){
            case 'blank':
                shipInformation.EndsFound++;
                 shipInformation = this.directionChange(shipInformation,position);
                break;
            case 'hitWater':
                shipInformation.EndsFound++;
                shipInformation.BoatEndsFound++;
                shipInformation = this.directionChange(shipInformation, position);
                break;
            case 'edge':
                shipInformation.BoatEndsFound++;
                shipInformation.EndsFound++;
                shipInformation = this.directionChange(shipInformation,position);
                break
            case 'hitShip':
                var columnPosition = shipInformation.CurrentPosition.Column + columnAdd;
                var rowPosition = String.fromCharCode(shipInformation.CurrentPosition.Row.charCodeAt(0) + rowAdd);
                shipInformation.CurrentPosition = { Row: rowPosition, Column: columnPosition };
                shipInformation.lengthOfShip++
                break;
        }
        return shipInformation;
    }

    public checkDone(currentGrid, position): boolean {
        var shipInformation: {EndsFound: number, BoatEndsFound: number, CurrentPosition: {Row: string, Column: number }, LengthOfShip: number, DirectionOfTravel: string}
        var boatSunk = false
        var orientation = this.findOrientation(currentGrid, position)
        shipInformation.EndsFound = 0;
        shipInformation.BoatEndsFound = 0;
        shipInformation.CurrentPosition = position;
        shipInformation.LengthOfShip = 0;
        
        if (orientation != 'undetermined') {
            if (orientation == 'leftRight'){
                shipInformation.DirectionOfTravel = 'left';
                var counter: number = 0;
                while ((shipInformation.DirectionOfTravel != 'done') && (counter < 100)) {
                    var squareRight: string = this.checkSides(currentGrid, shipInformation.CurrentPosition, 'r')
                    if (shipInformation.DirectionOfTravel == 'right') {    
                        shipInformation = this.checkSquare(position,squareRight, shipInformation, 1, 0);
                    }
                    var squareLeft: string = this.checkSides(currentGrid, shipInformation.CurrentPosition, 'l')
                    if (shipInformation.DirectionOfTravel == 'left') {    
                        shipInformation = this.checkSquare(position,squareLeft, shipInformation, -1, 0);
                    }
                    
                    if ((shipInformation.EndsFound == 2)|| shipInformation.LengthOfShip == 5){
                        shipInformation.DirectionOfTravel = 'done';
                    }
                    counter++;
                }
                if (shipInformation.BoatEndsFound == 2 || shipInformation.LengthOfShip == 5){
                    boatSunk = true;
                };
            };

            if (orientation == 'upDown'){
                shipInformation.DirectionOfTravel = 'up'
                var counter: number = 0;
                while ((shipInformation.DirectionOfTravel != 'done') && (counter < 100)) {
                    var squareDown: string = this.checkSides(currentGrid, shipInformation.CurrentPosition, 'd');
                    if (shipInformation.DirectionOfTravel == 'down') {    
                        shipInformation = this.checkSquare(position,squareDown, shipInformation, 0, 1);
                    }
                    var squareUp: string = this.checkSides(currentGrid, shipInformation.CurrentPosition, 'u');
                    if (shipInformation.DirectionOfTravel == 'up') {    
                       shipInformation = this.checkSquare(position,squareUp, shipInformation, 0, -1); 
                    }
                    
                    if ((shipInformation.EndsFound == 2) || shipInformation.LengthOfShip == 5){
                        shipInformation.DirectionOfTravel = 'done';
                    }
                    counter++;
                }
                if (shipInformation.BoatEndsFound == 2 || shipInformation.LengthOfShip == 5){
                    boatSunk = true;
                };
            };
        }
        return boatSunk;
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
        if (squareUp == 'blank' && done == 'no'){
            done ='yes'
            hitSquare = { Row: String.fromCharCode(position.Row.charCodeAt(0) - 1), Column: (position.Column ) }
        }
        var squareDown: string = this.checkSides(currentGrid, position,'d');
        if (squareDown == 'blank' && done == 'no' ){
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
        if((squareUp != 'hitShip') && (squareDown != 'hitShip') && ( squareLeft != 'hitShip') && (squareRight != 'hitShip')){
            direction ='undetermined'
        } 
        return direction
    }
    public destroyShip(currentGrid, position) {
        var orientation = this.findOrientation(currentGrid,position);
        var hitSquare;
        var choosingSquare = 'searching';
        var currentPosition = position;
        if (orientation == 'leftRight') {
            var directionOfTravel: string = 'left'
            var counter: number = 0;
            while (choosingSquare != 'done' && counter < 100) {    
                var squareLeft: string = this.checkSides(currentGrid, currentPosition,'l')                
                if (directionOfTravel == 'left') {    
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
                if (directionOfTravel == 'right') {    
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

        if (orientation == 'upDown') {
            var directionOfTravel: string = 'up'
            var counter: number = 0;
            while (choosingSquare != 'done' && counter < 100) {    
                var squareUp: string = this.checkSides(currentGrid, currentPosition,'u')                
                if (directionOfTravel == 'up') {    
                    switch(squareUp){
                        case 'blank':
                            hitSquare = { Row: (String.fromCharCode(currentPosition.Row.charCodeAt(0) - 1)), Column: (currentPosition.Column) };
                            choosingSquare = 'done';
                            break;
                        case 'hitWater':
                            currentPosition = position;
                            directionOfTravel = 'down';
                            break;
                        case 'edge':
                            directionOfTravel = 'down';
                            currentPosition = position;
                            break;
                        case 'hitShip':
                            currentPosition = { Row: (String.fromCharCode(currentPosition.Row.charCodeAt(0) - 1)), Column: (currentPosition.Column) };
                            break;
                    }
                }
                var squareDown: string = this.checkSides(currentGrid,currentPosition,'d')
                if (directionOfTravel == 'down') {    
                    switch(squareDown){
                        case 'blank':
                            hitSquare = { Row: (String.fromCharCode(currentPosition.Row.charCodeAt(0) + 1)), Column: (currentPosition.Column) };
                            choosingSquare = 'done';
                            break;
                        case 'hitWater':
                            hitSquare = { Row: 'J', Column: 10 };
                            choosingSquare = 'done';
                            break;
                        case 'edge':
                            hitSquare = { Row: 'J', Column: 10 };
                            choosingSquare = 'done';
                            break;
                        case 'hitShip':
                            currentPosition = { Row: (String.fromCharCode(currentPosition.Row.charCodeAt(0) + 1)), Column: (currentPosition.Column) };
                            break;
                    }
                }
                counter++;
            }
        }
        return hitSquare;
    }
}