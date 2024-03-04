class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        // set custom player properties 
        this.dashCooldown = 300    // in ms
        this.hurtTimer = 250       // in ms

        this.body.setCollideWorldBounds(true)
        // Set the initial size of the physics body
        this.body.setSize(60, 120)
        this.body.setImmovable(true)

        // Define custom hitbox properties for different animations
        this.customHitboxes = {
            punch: { width: 200, height: 120, offsetX: 45, offsetY: -120},
            downpunch: { width: 70, height: 120, offsetX: 120, offsetY: -120 },
            kick: { width: this.body.width * 2, height: this.body.height * 2, offsetX: 50, offsetY: -100 },
            downkick: { width: 200, height: 120, offsetX: 60, offsetY: -120 },
            downspecial: { width: this.body.width * 2, height: this.body.height * 2, offsetX: 50, offsetY: -160 }
            // Add more animations as needed
        }

        // initialize state machine managing player (initial state, possible states, state args[])
        scene.player1FSM = new StateMachine1('idle', {
            idle: new IdleState1(), 
            move: new MoveState1(),
            crouch:new CrouchState1(),
            block: new BlockState1(),
            punch: new PunchState1(),
            downPunch: new DownPunchState1(),
            kick: new KickState1(),
            downKick: new DownKickState1(),
            special: new SpecialState1(),
            downSpecial: new DownSpecialState1(),
            hurt: new HurtState1()
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM

        // Add health-related properties
        this.maxHealth = 100
        this.currentHealth = this.maxHealth

        // Create a graphics object for the health bar background
        this.healthBarBackground = scene.add.graphics()
        this.healthBarBackground.fillStyle(0x000000, 0.5)
        this.healthBarBackground.fillRect(0, 0, 100, 10)

        // Create a graphics object for the health bar
        this.healthBar = scene.add.graphics()
        this.healthBar.fillStyle(0x00ff00)
        this.healthBar.fillRect(0, 0, 100, 10)
    }

    decreaseHealth(amount) {
        this.currentHealth -= amount;

        // Check if the player is defeated (optional)
        if (this.currentHealth <= 0) {
            this.currentHealth = 0
            // Perform actions for player defeat if needed
        }

        // Update the health bar
        const healthPercentage = this.currentHealth / this.maxHealth
        const healthBarWidth = 100 * Phaser.Math.Clamp(healthPercentage, 0, 1)

        // Update the health bar width
        this.healthBar.clear()
        this.healthBar.fillStyle(0x00ff00)
        this.healthBar.fillRect(0, 0, healthBarWidth, 10)
    }

    createHitbox(hitboxConfig, scene) {
        const hitbox = scene.add.rectangle(
            this.x + hitboxConfig.offsetX,
            this.y + hitboxConfig.offsetY,
            hitboxConfig.width,
            hitboxConfig.height
        )
        scene.physics.world.enable(hitbox)
        scene.p1activeHitboxes.push(hitbox)
        return hitbox
    }

    enableHitbox(hitbox, scene) {
        hitbox.body.enable = true
        // Add any other hitbox configuration needed
    }

    disableHitbox(hitbox, scene) {
        // Remove hitbox from the activeHitboxes array
        const index = scene.p1activeHitboxes.indexOf(hitbox)
        if (index !== -1) {
            scene.p1activeHitboxes.splice(index, 1)
        }
        if(hitbox.body){
            hitbox.body.destroy()
        }
        
    }

    

    
}



// hero-specific state classes
class IdleState1 extends State1 {
    enter(scene, player) {
        console.log("p1 idle")
        //stop [player]
        player.setVelocity(0)
        player.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey
        //play idle animation
        player.anims.play('r_idle', true)

        //transition to move if movement keys pressed
        if(Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('move')
            return
        }

        //transition to crouch if down key pressed
        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('crouch')
            return
        }

        //transition to block if block key is pressed
        if(Phaser.Input.Keyboard.JustDown(block)) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(Phaser.Input.Keyboard.JustDown(punch)){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(Phaser.Input.Keyboard.JustDown(kick)){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            this.stateMachine.transition('special')
            return
        }

    }
}

class MoveState1 extends State1 {
    enter(scene, player) {
        console.log("p1 move")
        player.anims.stop()
        
        
    }
    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey


        //transition to crouch if down key pressed
        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('crouch')
            return
        }

        //transition to block if block key is pressed
        if(Phaser.Input.Keyboard.JustDown(block)) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(Phaser.Input.Keyboard.JustDown(punch)){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(Phaser.Input.Keyboard.JustDown(kick)){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            this.stateMachine.transition('special')
            return
        }

        // transition to idle if not pressing movement keys
        if(Phaser.Input.Keyboard.JustUp(left) || Phaser.Input.Keyboard.JustUp(right)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        if(left.isDown){
            //play walk animation backwards
            player.anims.playReverse('r_walk', true)
            //set velocity
            player.setVelocityX(-200)

            
        }else if(right.isDown) {
            //play walk animation forwards
            player.anims.play('r_walk', true)
            //set velocity
            player.setVelocityX(200)

        }

    }
}

class CrouchState1 extends State1 {
    enter(scene, player) {
        console.log("p1 crouch")
        player.setVelocity(0)
        player.anims.stop()

        //play crouch animation
        player.anims.play('r_crouch')


    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        // Pause the crouch animation on the last frame
        player.anims.pause(player.anims.currentAnim.frames[1])

        //transition to move if movement keys pressed
        if(Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('move')
            return
        }

        //transition to block if block key is pressed
        if(Phaser.Input.Keyboard.JustDown(block)) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(Phaser.Input.Keyboard.JustDown(punch)){
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to kick if kick key pressed
        if(Phaser.Input.Keyboard.JustDown(kick)){
            this.stateMachine.transition('downKick')
            return
        }

        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            this.stateMachine.transition('downSpecial')
            return
        }

        // transition to idle if release crouch key
        if(Phaser.Input.Keyboard.JustUp(down)) {
            this.stateMachine.transition('idle')
            return
        }
    }
}

class BlockState1 extends State1 {
    enter(scene, player) {
        console.log("p1 block")
        //freeze velocity
        player.setVelocity(0)
        player.anims.stop()

        //play crouch animation
        player.anims.play('r_block')

        //make immune to hits

        

    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        // Pause the crouch animation on the last frame
        player.anims.pause(player.anims.currentAnim.frames[2])

        // transition to idle if release crouch key
        if(Phaser.Input.Keyboard.JustUp(block)) {
            this.stateMachine.transition('idle')
            return
        }


        //transition to move if movement keys pressed
        if(Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('move')
            return
        }

        //transition to punch if punch key pressed
        if(Phaser.Input.Keyboard.JustDown(punch)){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(Phaser.Input.Keyboard.JustDown(kick)){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            this.stateMachine.transition('special')
            return
        }
    }

}

class PunchState1 extends State1 {
    enter(scene, player) {
        console.log("p1 punch")
        player.setVelocity(0)
        player.anims.stop()

        // Create and enable punch hitbox
        player.punchHitbox = player.createHitbox(player.customHitboxes.punch, scene)
        player.enableHitbox(player.punchHitbox, scene)

        player.anims.play('r_punch')

        //play punch animation transition to idle when finished
        player.once('animationcomplete', () => {    //callback after anim completes
            console.log("Punch animation complete")
            player.disableHitbox(player.punchHitbox, scene)
            this.stateMachine.transition('idle')
            return
        })

        //enable hitbox for punch

    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        
        


        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            player.disableHitbox(player.punchHitbox, scene)
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            player.disableHitbox(player.punchHitbox, scene)
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(Phaser.Input.Keyboard.JustDown(kick)) {
            player.disableHitbox(player.punchHitbox, scene)
            this.stateMachine.transition('downKick')
            return
        }

    }
}

class DownPunchState1 extends State1 {
    enter(scene, player) {
        console.log("p1 downpunch")
        player.setVelocity(0)
        player.anims.stop()

        // Create and enable down punch hitbox
        player.downPunchHitbox = player.createHitbox(player.customHitboxes.downpunch, scene)
        player.enableHitbox(player.downPunchHitbox, scene)

        player.anims.play('r_down_punch')
        

        //play  down punch animation transition to idle when finished
        player.once('animationcomplete', () => {    //callback after anim completes
            console.log("Down Punch animation complete")
            player.disableHitbox(player.downPunchHitbox, scene)
            this.stateMachine.transition('idle')
            return
        })


        //enable hitbox for down punch

    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        

        //transition to down special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            player.disableHitbox(player.downPunchHitbox, scene)
            this.stateMachine.transition('downSpecial')
            return
        }

    }
}

class KickState1 extends State1 {
    enter(scene, player) {
        console.log("p1 kick")
        player.setVelocity(0)
        player.anims.stop()

        // Create and enable kick hitbox
        player.kickHitbox = player.createHitbox(player.customHitboxes.kick, scene)
        player.enableHitbox(player.kickHitbox, scene)

        player.anims.play('r_kick')
        player.once('animationcomplete', () => {    //callback after anim completes
            player.disableHitbox(player.kickHitbox, scene)
            this.stateMachine.transition('idle')
            return
        })
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        //play kick animation transition to idle when finished

        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            player.disableHitbox(player.kickHitbox, scene)
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            player.disableHitbox(player.kickHitbox, scene)
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(Phaser.Input.Keyboard.JustDown(kick)) {
            player.disableHitbox(player.kickHitbox, scene)
            this.stateMachine.transition('downKick')
            return
        }

    }
}

class DownKickState1 extends State1 {
    enter(scene, player) {
        console.log("p1 down kick")
        player.setVelocity(0)
        player.anims.stop()

        // Create and enable down kick hitbox
        player.downKickHitbox = player.createHitbox(player.customHitboxes.downkick, scene)
        player.enableHitbox(player.downKickHitbox, scene)

        player.anims.play('r_down_kick')
        player.once('animationcomplete', () => {    //callback after anim completes
            player.disableHitbox(player.downKickHitbox, scene)
            this.stateMachine.transition('idle')
            return
        })

    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        //play down kick animation transition to idle when finished
        //transition to down special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            player.disableHitbox(player.downKickHitbox, scene)
            this.stateMachine.transition('downSpecial')
            return
        }

    }
}

class SpecialState1 extends State1 {
    enter(scene, player) {
        console.log("p1 special")
        player.setVelocity(0)
        player.anims.stop()

        player.anims.play('r_special')
        scene.fireball = scene.physics.add.sprite(player.x, player.height + 280, 'fireball', 0)
        
        player.once('animationcomplete', () => {    //callback after anim completes
            scene.fireball.destroy()
            this.stateMachine.transition('idle')
            return
        })


        //enable hitbox for special state
    }

    execute(scene, player) {

        scene.fireball.x += 6
        scene.fireball.anims.play('fireball_anim', true)

        

        //play special animation transition to idle when finished

    }

}

class DownSpecialState1 extends State1 {
    enter(scene, player) {
        console.log("p1 downspecial")
        player.setVelocity(0)
        player.anims.stop()

        player.anims.play('r_down_special')

        // Create and enable down kick hitbox
        player.downSpecialHitbox = player.createHitbox(player.customHitboxes.downspecial, scene)
        player.enableHitbox(player.downSpecialHitbox, scene)

        player.once('animationcomplete', () => {    //callback after anim completes
            player.disableHitbox(player.downSpecialHitbox, scene)
            this.stateMachine.transition('idle')
            return
        })

        //enable hitbox for down special state
    }

    execute(scene, player) {

        //play down special animation transition to idle when finished

    }
}



class HurtState1 extends State1 {
    enter(scene, player) {
        console.log("p1 hurt")
        player.anims.stop()
        //move slightly away from other player

        //play hurt animation
        player.anims.play('r_hurt')

        player.once('animationcomplete', () => {    //callback after anim completes
            this.stateMachine.transition('idle')
            return
        })

        //wait until hurt animation is complete before returning to idle
    }
}

