// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    /**
     * The enemy is initiated with a starting x and y coordinate position 
     */

    this.x = -60;

    /**
     * This is to avoid players from colliding with each other
     * Players have their own territory to safe guard
     */

    this.y = getRandomIntInclusive(60, 240);
    this.speed = getRandomIntInclusive(100, 300);

    this.reset = function() {
        this.x = getRandomIntInclusive(-300, -60);
        this.y = getRandomIntInclusive(60, 240);
        this.speed = getRandomIntInclusive(100, 300);

    };

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * this.speed);

    /**
     * Reposition the enemy when it has exit the game area.
     */
    if (this.x > 460) {
        this.x = -60;
        //enemy render between 240 and 60
        this.y = getRandomIntInclusive(60, 240);
    }

};

/**
 * Function for get random numbers inclusive
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 *
 */

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 440;
    this.xPosition = this.x;
    this.yPosition = this.y;

    this.update = function(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x = ((dt * 100) + this.xPosition);
        this.y = ((dt * 100) + this.yPosition);
    };

    // Draw the enemy on the screen, required method for game
    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    this.reset = function() {
        this.xPosition = 200;
        this.yPosition = 440;
    };


    this.handleInput = function(keyCode) {

        if (keyCode === 'left') {
            if (this.x >= 100) {
                this.xPosition -= 100;
            }
        } else if (keyCode === 'up') {
            if (this.y >= 0) {
                this.yPosition -= 40;
            }
        } else if (keyCode === 'right') {
            if (this.x <= 310) {
                this.xPosition += 100;
            }
        } else if (keyCode === 'down') {

            //10 is buffer

            if (this.y <= 410) {
                this.yPosition += 40;
            }
        }

    };



}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [];

allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());
allEnemies.push(new Enemy());

// Place the player object in a variable called player

var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});