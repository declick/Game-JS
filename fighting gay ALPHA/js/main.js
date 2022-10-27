const canvas = document.querySelector('canvas')
// Context 2d,3d and more / c = canvas //
const c = canvas.getContext('2d')

// CSS//
canvas.width = 1024
canvas.height = 576

// Coordonates Canvas //
c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.2 // gravity

// **class** //

// position gravity height Sprite //
class Sprite {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
    }

    // Draw Sprite//

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height)
    }

    // Update Spray (*pixel) //
    update() {
        this.draw()
        
        this.position.y += this.velocity.y

        if (this.position.y + this.height +this.velocity.y >= canvas.height) {
            this.velocity.y = 0 
        } else this.velocity.y += gravity       
    }
}

// Position Gavity Player //
const player = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

// Position Gavity Enemy //
const enemy = new Sprite({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    }
})

console.log(player)

// Animation //

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()
}

animate()