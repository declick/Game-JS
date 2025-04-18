
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Canvas Settings
canvas.width = 1024;            // 1024
canvas.height = 576;            // 576

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;    // Graviter

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    ImageSrc: 'assets/background.png'
});

const shop = new Sprite({
    position:{
        x:600,
        y:395
    },
    ImageSrc: 'assets/shop.png',
    scale: 2.75,
    framesMax: 6,
    framesCurrent:1
});

// Player Object
const player = new Fighter({
    position:{
        x:100,
        y:100
    },

    velocity:{
        x:0,
        y:0
    },

    color: 'red',

    offset:{
        x:0,
        y:0
    },

    offset:{
        x:200,
        y:90
    },

    ImageSrc: 'assets/samuraiMack/Idle.png',
    framesMax: 8,
    scale:2.5,

    sprites:{
        idle:{
            ImageSrc: 'assets/samuraiMack/Idle.png',
            framesMax:8
        },
        run:{
            ImageSrc: 'assets/samuraiMack/Run.png',
            framesMax:8,
        },
        jump:{
            ImageSrc: 'assets/samuraiMack/Jump.png',
            framesMax:2,
        },
        fall:{
            ImageSrc: 'assets/samuraiMack/Fall.png',
            framesMax:2,
        },
        attack1:{
            ImageSrc: 'assets/samuraiMack/short_attack1.png',
            framesMax:4,
        },
        takeHit:{
            ImageSrc: 'assets/samuraiMack/Take Hit - white silhouette.png',
            framesMax:4,
        },
        death:{
            ImageSrc: 'assets/samuraiMack/Death.png',
            framesMax:6,
        },
        super_attack:{
            ImageSrc: 'assets/samuraiMack/emotional_damage.png',
            framesMax:4,
        }
    },

    attackBox:{
        offset:{
            x:100,
            y:50
        },
        width:155,
        height:50
    }
})

// Enemy Object
const enemy = new Fighter({
    position:{
        x: 800,
        y: 100
    },

    velocity:{
        x:0,
        y:0
    },

    color: 'blue',

    offset:{
        x:200,
        y:105
    },

    ImageSrc: 'assets/kenji/Idle.png',
    framesMax: 4,
    scale:2.5,

    sprites:{
        idle:{
            ImageSrc: 'assets/kenji/Idle.png',
            framesMax:4
        },
        run:{
            ImageSrc: 'assets/kenji/Run.png',
            framesMax:8,
        },
        jump:{
            ImageSrc: 'assets/kenji/Jump.png',
            framesMax:2,
        },
        fall:{
            ImageSrc: 'assets/kenji/Fall.png',
            framesMax:2,
        },
        attack1:{
            ImageSrc: 'assets/kenji/Attack1.png',
            framesMax:4,
        },
        takeHit:{
            ImageSrc: 'assets/kenji/Take Hit.png',
            framesMax:3,
        },
        death:{
            ImageSrc: 'assets/kenji/Death.png',
            framesMax:7,
        },
        super_attack:{
            ImageSrc: 'assets/kenji/emotional_damage.png',
            framesMax:4,
        }
    },

    attackBox:{
        offset:{
            x:-160,             
            y:50
        },
        width:160,
        height:50
    }
})



player.draw();
enemy.draw();


// Keys
const keys = {
    a:{
        pressed: false
    },

    d:{
        pressed: false
    },

    w:{
        pressed: false
    },

    e:{
        pressed: false
    },

    ArrowRight:{
        pressed:false
    },

    ArrowLeft:{
        pressed:false
    },

    ArrowUp:{
        pressed:false
    }
}


decreaseTimer();    // Assure toi d'appeler les fonctions

// Fonction BG principale du jeu 

function animate() {
    window.requestAnimationFrame(animate);         // Signifie FRAME OR FPS
    // console.log('Animating');    // Objectif du débogage
    
    c.fillStyle = 'black';
    c.fillRect(0,0, canvas.width, canvas.height);   // le faire pour que les sprites pour qu'ils aient un aspect individuel

    // Rendu des sprites et des combattants
    background.update();    // Assurez-vous d'appeler les mises à jour afin qu'elles apparaissent
    shop.update();
    c.fillStyle = 'rgba(255,255,255,0.15)';
    c.fillRect(0,0, canvas.width, canvas.height);
    player.update();
    enemy.update();


    // Default Value
    player.velocity.x = 0;  
    enemy.velocity.x = 0;    

    // Player

    if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    }
    else {
        player.switchSprite('idle');
    }

    // Jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump');
    }
    else if (player.velocity.y > 0) {
        player.switchSprite('fall');
    }



    // Enemy
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
        enemy.switchSprite('run');
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    }
    else {
        enemy.switchSprite('idle');
    }

        // Jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump');
    }
    else if (enemy.velocity.y > 0) {
        enemy.switchSprite('fall');
    }


    // Détecter les collisions

     // Collision de joueur et l'ennemi obtient des coups
    if (
        rectangularCollisions({
            rectangle1: player,
            rectangle2: enemy
        })
        && player.isAttacking && player.framesCurrent == 2
    )   {
        enemy.takeHit();
        player.isAttacking = false;
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

        // if player misses
    if (player.isAttacking && player.framesCurrent == 2) {
        player.isAttacking = false;
    }

     // Enemy Collision
     if (
        rectangularCollisions({
            rectangle1: enemy,
            rectangle2: player
        })
        && enemy.isAttacking && enemy.framesCurrent == 2
    )   {
        player.takeHit();
        enemy.isAttacking = false;
        // document.querySelector('#playerHealth').style.width = player.health + '%';
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

        // if player misses
    if (enemy.isAttacking && enemy.framesCurrent == 2) {
        enemy.isAttacking = false;
    }


// SUPER ATTACK - EMOTIONAL DAMAGE ///////////

     // Player Collision and enemy gets Hits
    if (
        rectangularCollisions({
            rectangle1: player,
            rectangle2: enemy
        })
        && player.superActivated && player.framesCurrent == 2
    )   {
        enemy.emotionalDamage();
        player.superActivated = false;
        // document.querySelector('#enemyHealth').style.width = enemy.health + '%';
        gsap.to('#enemyHealth', {
            width: enemy.health + '%'
        })
    }

        // if player misses
    if (player.superActivated && player.framesCurrent == 2) {
        player.superActivated = false;
    }

     // Enemy Collision
     if (
        rectangularCollisions({
            rectangle1: enemy,
            rectangle2: player
        })
        && enemy.superActivated && enemy.framesCurrent == 2
    )   {
        player.emotionalDamage();
        enemy.superActivated = false;
        // document.querySelector('#playerHealth').style.width = player.health + '%';
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

        // if player misses
    if (enemy.superActivated && enemy.framesCurrent == 2) {
        enemy.superActivated = false;
    }


    // Game Over according to healths or gets defeated
    if (enemy.health <= 0  ||  player.health <= 0) {
        determineWinner({player, enemy, timerID});
    }


}

animate();




// Mouvements de personnage

    // Player Movements
window.addEventListener('keydown', (event)=>{
    //console.log(event.key);

    if (!player.dead) {
        switch  (event.key) {

                // Player Keys
            case 'd':
                keys.d.pressed = true;
                player.lastKey = 'd';
                break 

            case 'a':
                keys.a.pressed = true;
                player.lastKey = 'a';
                break

            case 'w':
                player.velocity.y = -20;
                player.lastKey = 'w';
                break

            case ' ':   // spacebar
                player.attack();
                break
            case 's':   // spacebar
                player.attack();
                break

            case 'e':
                player.superAttack();
                break
        }
    }

    if (!enemy.dead) {
        switch  (event.key) {
                // Enemy Keys
            case 'ArrowRight':
                keys.ArrowRight.pressed = true;
                enemy.lastKey = 'ArrowRight';
                break

            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true;
                enemy.lastKey = 'ArrowLeft';
                break

            case 'ArrowUp':
                enemy.velocity.y = -20;
                enemy.lastKey = 'ArrowUp';
                break

            case 'ArrowDown':
                enemy.attack();
                break

            case 'Enter':
                enemy.superAttack();
                break
        }
    }

})

window.addEventListener('keyup', (event)=>{
    // console.log(event.key);

    switch  (event.key) {

            // Player KeysUp
        case 'd':
            keys.d.pressed = false;
            break 
        
        case 'a':
            keys.a.pressed = false;
            break
        

            // Enemy KeysUP
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break
        
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break
        
    }
})

