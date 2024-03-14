class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene
        scene.physics.world.enable(this)

        this.body.setCollideWorldBounds(true)
        // Set the initial size of the physics body
        this.body.setSize(60, 120)
        this.setOrigin(0.5, 1)
        // this.body.immovable = true

        if(texture === 'rumble_idle'){
            this.char = 'r'
        }else if(texture === 'karate_idle'){
            this.char = 'k'
        }

        // Define custom hitbox properties for Rumble animations
        this.customHitboxes = {
            punch: { width: 200, height: 30, offsetX: 45, offsetY: -140},
            downpunch: { width: 180, height: 120, offsetX: 40, offsetY: -120 },
            kick: { width: this.body.width * 2, height: this.body.height * 2, offsetX: 50, offsetY: -100 },
            downkick: { width: 200, height: 120, offsetX: 60, offsetY: -120 },
            downspecial: { width: this.body.width * 2, height: this.body.height * 2, offsetX: 50, offsetY: -160 }
            // Add more animations as needed
        }

        //define custome hitboxes for Dr Karate
        this.customHitboxes2 = {
            punch: { width: 200, height: 30, offsetX: 45, offsetY: -140},
            kick: { width: this.body.width * 2, height: this.body.height * 2, offsetX: 70, offsetY: -100 },
            downspecial: { width: this.body.width * 3, height: this.body.height * 2, offsetX: 80, offsetY: -160 }
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
        this.healthBarScale = 4 // Scale factor

        // Create a graphics object for the health bar background
        this.healthBarBackground = scene.add.graphics()
        this.healthBarBackground.fillStyle(0x000000, 0.5)
        this.healthBarBackground.fillRect(0, 0, 100 * this.healthBarScale, 10 * this.healthBarScale)

        // Create a graphics object for the health bar
        this.healthBar = scene.add.graphics()
        this.healthBar.fillStyle(0x00FF00)
        this.healthBar.fillRect(0, 0, 100 * this.healthBarScale, 10 * this.healthBarScale)

        //collision with other player
        scene.physics.add.collider(this, scene.player2)

    }

    decreaseHealth(amount) {
        // Calculate the new health bar width
        this.currentHealth -= amount
        if (this.currentHealth <= 0) {
            this.currentHealth = 0
            // Perform actions for player defeat if needed
        }

        const healthPercentage = Phaser.Math.Clamp(this.currentHealth / this.maxHealth, 0, 1)
        const healthBarWidth = 100 * this.healthBarScale * healthPercentage

        // Clear and update the health bar width
        this.healthBar.clear()
        if(healthPercentage > 0.5){
            this.healthBar.fillStyle(0x00FF00)
        }else if(healthPercentage > 0.25){
            this.healthBar.fillStyle(0xFFFF00)
        }else {
            this.healthBar.fillStyle(0xFF0000)
        }
        
        this.healthBar.fillRect(100 * this.healthBarScale - healthBarWidth, 0, healthBarWidth, 10 * this.healthBarScale)
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
        // Ensure hitbox is not null or undefined
    if (hitbox) {
        // Remove hitbox from the activeHitboxes array
        const index = scene.p1activeHitboxes.indexOf(hitbox)
        if (index !== -1) {
            scene.p1activeHitboxes.splice(index, 1)
        }

        // Ensure hitbox has a 'body' property before attempting to access it
        if (hitbox.body) {
            hitbox.body.destroy()
        }
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

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        //play idle animation
        player.anims.play(`${player.char}_idle`, true)

        scene.p1Hittable = true

        //delete hitboxes
        if(player.punchHitbox){
            player.disableHitbox(player.punchHitbox, scene)
        } 
        if (player.downPunchHitbox) {
            player.disableHitbox(player.downPunchHitbox, scene)
        } 
        if (player.kickHitbox) {
            player.disableHitbox(player.kickHitbox, scene)
        } 
        if(player.downKickHitbox) {
            player.disableHitbox(player.downKickHitbox, scene)
        } 
        if (player.downSpecialHitbox){
            player.disableHitbox(player.downSpecialHitbox, scene)
        }
    }

    execute(scene, player) {
        player.setVelocity(0)
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey
        

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

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)
        
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey
        
        // handle movement
        if(left.isDown){
            //play walk animation backwards
            player.anims.playReverse(`${player.char}_walk`, true)
            //set velocity
            player.setVelocityX(-275)

            
        }else if(right.isDown) {
            //play walk animation forwards
            player.anims.play(`${player.char}_walk`, true)
            //set velocity
            player.setVelocityX(275)

        }
        
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
            player.anims.playReverse(`${player.char}_walk`, true)
            //set velocity
            player.setVelocityX(-275)

            
        }else if(right.isDown) {
            //play walk animation forwards
            player.anims.play(`${player.char}_walk`, true)
            //set velocity
            player.setVelocityX(275)

        }

    }
}

class CrouchState1 extends State1 {
    enter(scene, player) {
        console.log("p1 crouch")
        player.setVelocity(0)
        player.anims.stop()

        //play crouch animation
        player.anims.play(`${player.char}_crouch`)

        player.body.setSize(60, 60).setOffset(0, 60)
        



    }

    execute(scene, player) {
        player.setVelocity(0)
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
            player.body.setSize(60, 120).setOffset(0)
            this.stateMachine.transition('move')
            return
        }

        //transition to block if block key is pressed
        if(Phaser.Input.Keyboard.JustDown(block)) {
            player.body.setSize(60, 120).setOffset(0)
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(Phaser.Input.Keyboard.JustDown(punch)){
            player.body.setSize(60, 120).setOffset(0)
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to kick if kick key pressed
        if(Phaser.Input.Keyboard.JustDown(kick)){
            player.body.setSize(60, 120).setOffset(0)
            this.stateMachine.transition('downKick')
            return
        }

        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            player.body.setSize(60, 120).setOffset(0)
            this.stateMachine.transition('downSpecial')
            return
        }

        // transition to idle if release crouch key
        if(Phaser.Input.Keyboard.JustUp(down)) {
            player.body.setSize(60, 120).setOffset(0)
            this.stateMachine.transition('idle')
            return
        }
    }
}

class BlockState1 extends State1 {
    enter(scene, player) {
        console.log("p1 block")
        // Freeze velocity
        player.setVelocity(0)
        player.anims.stop()

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        // Play block animation
        player.anims.play(`${player.char}_block`)

        // Disable player's body collisions
        scene.p1Hittable = false

        //record the start time when entering the scene
        this.blockStartTime = scene.time.now
    }

    execute(scene, player) {
        player.setVelocity(0)
        // Use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        if(player.char === 'r'){
            // Pause the block animation on the last frame
            player.anims.pause(player.anims.currentAnim.frames[2])
        }

        if(player.char === 'k'){
            // Pause the block animation on the last frame
            player.anims.pause(player.anims.currentAnim.frames[3])
        }
        

        // Transition to idle if release block key
        if (Phaser.Input.Keyboard.JustUp(block)) {
            scene.p1Hittable = true
            this.stateMachine.transition('idle')
            return
        }

        // Transition to move if movement keys pressed
        if (Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)) {
            scene.p1Hittable = true
            this.stateMachine.transition('move')
            return
        }

        // Transition to punch if punch key pressed
        if (Phaser.Input.Keyboard.JustDown(punch)) {
            scene.p1Hittable = true
            this.stateMachine.transition('punch')
            return
        }

        // Transition to kick if kick key pressed
        if (Phaser.Input.Keyboard.JustDown(kick)) {
            scene.p1Hittable = true
            this.stateMachine.transition('kick')
            return
        }

        // Transition to special if special key pressed
        if (Phaser.Input.Keyboard.JustDown(special)) {
            scene.p1Hittable = true
            this.stateMachine.transition('special')
            return
        }

        //block timer to not allow blocking forever
        if((scene.time.now - this.blockStartTime) >= 4000) {
            scene.p1Hittable = true
            player.decreaseHealth(5)
            this.stateMachine.transition('hurt')
            return
        }
    }
}


class PunchState1 extends State1 {
    enter(scene, player) {
        console.log("p1 punch")
        player.setVelocity(0)
        player.anims.stop()

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        // Clear existing animation update event listeners
        player.off('animationupdate')

        //play animation
        player.anims.play(`${player.char}_punch`)

        //makes hitbox
        console.log('punch hitbox created')
        player.punchHitbox = player.createHitbox(player.customHitboxes.punch, scene)
        player.enableHitbox(player.punchHitbox, scene)
        console.log(player.punchHitbox)

        if(player.char === 'r'){
            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'r_punch') {
                    if (frame.index === 2) {
                        console.log('punch hitbox destroyed')
                        player.disableHitbox(player.punchHitbox, scene)
                    }
                }
            })

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'r_punch') {
                    if (frame.index === 4) {
                        console.log('punch hitbox 2 created')
                        player.punchHitbox = player.createHitbox(player.customHitboxes.punch, scene)
                        player.enableHitbox(player.punchHitbox, scene)
                    } else if(frame.index === 6){
                        console.log('punch hitbox 2 destroyed')
                        player.disableHitbox(player.punchHitbox, scene)
                    }
                }
            })
        } else if(player.char === 'k'){
            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_punch') {
                    if (frame.index === 2) {
                        console.log('punch hitbox destroyed')
                        player.disableHitbox(player.punchHitbox, scene)
                    }
                }
            })

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_punch') {
                    if (frame.index === 3) {
                        console.log('punch hitbox 2 created')
                        player.punchHitbox = player.createHitbox(player.customHitboxes2.punch, scene)
                        player.enableHitbox(player.punchHitbox, scene)
                    } else if(frame.index === 5){
                        console.log('punch hitbox 2 destroyed')
                        player.disableHitbox(player.punchHitbox, scene)
                    }
                }
            })
        }
        

        //play punch animation transition to idle when finished
        player.once('animationcomplete', () => {    //callback after anim completes
            console.log("Punch animation complete")
            
            scene.p1Cancel = false
            this.stateMachine.transition('idle')
            return
        })

        //enable hitbox for punch

    }

    execute(scene, player) {
        player.setVelocity(0)
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        
        


        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special) && scene.p1Cancel == true){
            player.disableHitbox(player.punchHitbox, scene)
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(Phaser.Input.Keyboard.JustDown(punch) && scene.p1Cancel == true) {
            player.disableHitbox(player.punchHitbox, scene)
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(Phaser.Input.Keyboard.JustDown(kick) && scene.p1Cancel == true) {
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

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        // Clear existing animation update event listeners
        player.off('animationupdate')

        if(player.char === 'r'){
            //play animation
            player.anims.play('r_down_punch')

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'r_down_punch') {
                    //create on 3rd frame
                    if (frame.index === 2) {
                        console.log('down punch hitbox created')
                        player.downPunchHitbox = player.createHitbox(player.customHitboxes.downpunch, scene)
                        player.enableHitbox(player.downPunchHitbox, scene)
                    //destroy on 6th frame
                    } else if (frame.index === 4) {
                        console.log('down punch hitbox destroyed')
                        player.disableHitbox(player.downPunchHitbox, scene)
                    }
                }
            })
        } else if(player.char === 'k'){
            player.anims.play('k_punch')
            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_punch') {
                    if (frame.index === 2) {
                        console.log('punch hitbox destroyed')
                        player.disableHitbox(player.punchHitbox, scene)
                    }
                }
            })

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_punch') {
                    if (frame.index === 3) {
                        console.log('punch hitbox 2 created')
                        player.punchHitbox = player.createHitbox(player.customHitboxes2.punch, scene)
                        player.enableHitbox(player.punchHitbox, scene)
                    } else if(frame.index === 5){
                        console.log('punch hitbox 2 destroyed')
                        player.disableHitbox(player.punchHitbox, scene)
                    }
                }
            })
        }
        

        //play  down punch animation transition to idle when finished
        player.once('animationcomplete', () => {    //callback after anim completes
            console.log("Down Punch animation complete")
            scene.p1Cancel = false
            this.stateMachine.transition('idle')
            return
        })


        //enable hitbox for down punch

    }

    execute(scene, player) {
        player.setVelocity(0)
        // use destructuring to make a local copy of the keyboard object
        const left = scene.keys.AKey
        const right = scene.keys.DKey
        const down = scene.keys.SKey
        const punch = scene.keys.RKey
        const kick = scene.keys.FKey
        const special = scene.keys.TKey
        const block = scene.keys.GKey

        

        //transition to down special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special) && scene.p1Cancel == true){
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

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        // Clear existing animation update event listeners
        player.off('animationupdate')

        //play kick
        player.anims.play(`${player.char}_kick`)

        if(player.char === 'r'){
            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'r_kick') {
                    //create on 3rd frame
                    if (frame.index === 2) {
                        console.log('kick hitbox created')
                        player.kickHitbox = player.createHitbox(player.customHitboxes.kick, scene)
                        player.enableHitbox(player.kickHitbox, scene)
                    //destroy on 6th frame
                    } else if (frame.index === 5) {
                        console.log('kick hitbox destroyed')
                        player.disableHitbox(player.kickHitbox, scene)
                    }
                }
            })
        } else if(player.char === 'k'){
            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_kick') {
                    //create on 3rd frame
                    if (frame.index === 3) {
                        console.log('kick hitbox created')
                        player.kickHitbox = player.createHitbox(player.customHitboxes2.kick, scene)
                        player.enableHitbox(player.kickHitbox, scene)
                    //destroy on 6th frame
                    } else if (frame.index === 6) {
                        console.log('kick hitbox destroyed')
                        player.disableHitbox(player.kickHitbox, scene)
                    }
                }
            })
        }
        

        
        player.once('animationcomplete', () => {    //callback after anim completes
            scene.p1Cancel = false
            this.stateMachine.transition('idle')
            return
        })
    }

    execute(scene, player) {
        player.setVelocity(0)
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
        if(Phaser.Input.Keyboard.JustDown(special) && scene.p1Cancel == true){
            player.disableHitbox(player.kickHitbox, scene)
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(Phaser.Input.Keyboard.JustDown(punch) && scene.p1Cancel == true) {
            player.disableHitbox(player.kickHitbox, scene)
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(Phaser.Input.Keyboard.JustDown(kick) && scene.p1Cancel == true) {
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

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        // Clear existing animation update event listeners
        player.off('animationupdate')

        if(player.char === 'r'){
            //play animation
            player.anims.play('r_down_kick')

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'r_down_kick') {
                    //create on 3rd frame
                    if (frame.index === 5) {
                        console.log('downkick hitbox created')
                        player.downKickHitbox = player.createHitbox(player.customHitboxes.downkick, scene)
                        player.enableHitbox(player.downKickHitbox, scene)
                    //destroy on 6th frame
                    } else if (frame.index === 7) {
                        console.log('downkick hitbox destroyed')
                        player.disableHitbox(player.downKickHitbox, scene)
                    } else if (frame.index === 10) {
                        console.log('downkick hitbox created')
                        player.downKickHitbox = player.createHitbox(player.customHitboxes.downkick, scene)
                        player.enableHitbox(player.downKickHitbox, scene)
                    } else if (frame.index === 12) {
                        console.log('downkick hitbox destroyed')
                        player.disableHitbox(player.downKickHitbox, scene)
                    }
                }
            })
        }else if(player.char === 'k'){
            player.anims.play('k_kick')
            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_kick') {
                    //create on 3rd frame
                    if (frame.index === 3) {
                        console.log('kick hitbox created')
                        player.kickHitbox = player.createHitbox(player.customHitboxes2.kick, scene)
                        player.enableHitbox(player.kickHitbox, scene)
                    //destroy on 6th frame
                    } else if (frame.index === 6) {
                        console.log('kick hitbox destroyed')
                        player.disableHitbox(player.kickHitbox, scene)
                    }
                }
            })
        }
        
        
        player.once('animationcomplete', () => {    //callback after anim completes
            scene.p1Cancel = false
            this.stateMachine.transition('idle')
            return
        })

    }

    execute(scene, player) {
        player.setVelocity(0)
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
        if(Phaser.Input.Keyboard.JustDown(special) && scene.p1Cancel == true){
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

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        // Clear existing animation update event listeners
        player.off('animationupdate')

        if(player.char === 'r'){
            player.anims.play('r_special')

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'r_special') {
                    //create on 3rd frame
                    if (frame.index === 4) {
                        scene.fireball = scene.physics.add.sprite(player.x, player.height + 280, 'fireball', 0)
                        scene.fireball.body.setSize(70, 10)
                        scene.fireball.anims.play('fireball_anim', true)
                        scene.fireball.setVelocityX(500)
                    }
                }
            })

            player.once('animationcomplete', () => {    //callback after anim completes
                if(scene.fireball && scene.fireball.x > game.config.width){
                    scene.fireball.destroy()
                }
                scene.p1Cancel = false
                this.stateMachine.transition('idle')
                return
            })
        }else if(player.char === 'k'){
            player.anims.play('k_special')

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_special') {
                    //create on 3rd frame
                    if (frame.index === 8) {
                        scene.fireball = scene.physics.add.sprite(player.x, player.y -220, 'laser', 0)
                        scene.fireball.body.setSize(50, 10)
                        scene.fireball.anims.play('laser_anim', true)
                        scene.fireball.setVelocityX(1000)
                    }
                }
            })

            player.once('animationcomplete', () => {    //callback after anim completes
                if(scene.fireball && scene.fireball.x > game.config.width){
                    scene.fireball.destroy()
                }
                scene.p1Cancel = false
                this.stateMachine.transition('idle')
                return
            })
        }

        


        //enable hitbox for special state
    }

    execute(scene, player) {
        player.setVelocity(0)

        

        //play special animation transition to idle when finished

    }

}

class DownSpecialState1 extends State1 {
    enter(scene, player) {
        console.log("p1 downspecial")
        player.setVelocity(0)
        
        player.anims.stop()

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        // Clear existing animation update event listeners
        player.off('animationupdate')

        if(player.char === 'r'){
            player.setVelocityX(100)
            //play animation
            player.anims.play('r_down_special')

            // Disable player's body collisions
            scene.p1Hittable = false

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'r_down_special') {
                    //create on 3rd frame
                    if (frame.index === 2) {

                        console.log('downspecial hitbox created')
                        player.downSpecialHitbox = player.createHitbox(player.customHitboxes.downspecial, scene)
                        player.enableHitbox(player.downSpecialHitbox, scene)
                    //destroy on 6th frame
                    } else if (frame.index === 4) {
                        
                        console.log('downspecial hitbox destroyed')
                        player.disableHitbox(player.downSpecialHitbox, scene)
                    }
                }
            })

            player.once('animationcomplete', () => {    //callback after anim completes
                player.setVelocityX(0)
                player.p1Hittable = true
                this.stateMachine.transition('idle')
                return
            })
        } else if(player.char === 'k'){
            //play animation
            player.anims.play('k_down_special')

            //create hitbox on frame 2 of animation
            player.on('animationupdate', (anim, frame) => {
                if(anim.key === 'k_down_special') {
                    //create on 3rd frame
                    if (frame.index === 3) {

                        console.log('downspecial hitbox created')
                        player.downSpecialHitbox = player.createHitbox(player.customHitboxes2.downspecial, scene)
                        player.enableHitbox(player.downSpecialHitbox, scene)
                        player.setVelocityX(700)
                    //destroy on 6th frame
                    } else if (frame.index === 10) {
                        player.setVelocityX(0)
                        console.log('downspecial hitbox destroyed')
                        player.disableHitbox(player.downSpecialHitbox, scene)
                    }
                }
            })

            player.once('animationcomplete', () => {    //callback after anim completes
                player.setVelocityX(0)
                player.p1Hittable = true
                this.stateMachine.transition('idle')
                return
            })
        }

        

        //enable hitbox for down special state
    }

    execute(scene, player) {
        if(player.downSpecialHitbox && player.char === 'r'){
            player.downSpecialHitbox.x +=1
        }

        if(player.downSpecialHitbox && player.char === 'k'){
            player.downSpecialHitbox.x +=5
        }

    }
}



class HurtState1 extends State1 {
    enter(scene, player) {
        console.log("p1 hurt")
        player.setVelocity(0)
        player.anims.stop()

        player.body.setSize(60, 120)
        player.setOrigin(0.5, 1)

        //play hurt animation
        player.anims.play(`${player.char}_hurt`)

        if(player.punchHitbox){
            player.disableHitbox(player.punchHitbox, scene)
        } 
        if (player.downPunchHitbox) {
            player.disableHitbox(player.downPunchHitbox, scene)
        } 
        if (player.kickHitbox) {
            player.disableHitbox(player.kickHitbox, scene)
        } 
        if(player.downKickHitbox) {
            player.disableHitbox(player.downKickHitbox, scene)
        } 
        if (player.downSpecialHitbox){
            player.disableHitbox(player.downSpecialHitbox, scene)
        }

        

        player.once('animationcomplete', () => {    //callback after anim completes
            this.stateMachine.transition('idle')
            return
        })

        //wait until hurt animation is complete before returning to idle
    }

    execute(scene, player){
        player.setVelocity(0)
    }
}

