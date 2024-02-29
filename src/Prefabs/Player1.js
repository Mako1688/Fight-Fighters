class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        // set custom Hero properties 
        this.dashCooldown = 300    // in ms
        this.hurtTimer = 250       // in ms

        this.body.setCollideWorldBounds(true)
        this.body.setSize(104, 120)

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.player1FSM = new StateMachine1('idle', {
            idle: new IdleState1(), 
            move: new MoveState1(),
            crouch:new CrouchState1(),
            crouchBlock: new CrouchBlockState1(),
            block: new BlockState1(),
            punch: new PunchState1(),
            downPunch: new DownPunchState1(),
            kick: new KickState1(),
            downKick: new DownKickState1(),
            special: new SpecialState1(),
            downSpecial: new DownSpecialState1(),
            hurt: new HurtState1()
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
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
            player.setVelocityX(-150)

            
        }else if(right.isDown) {
            //play walk animation forwards
            player.anims.play('r_walk', true)
            //set velocity
            player.setVelocityX(150)

        }

    }
}

class CrouchState1 extends State1 {
    enter(scene, player) {
        console.log("p1 crouch")
        player.setVelocity(0)
        player.anims.stop()

        //play crouch animation

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
        //transition to move if movement keys pressed
        if(Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('move')
            return
        }

        //transition to block if block key is pressed
        if(Phaser.Input.Keyboard.JustDown(block)) {
            this.stateMachine.transition('crouchBlock')
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
        if(!(Phaser.Input.Keyboard.JustDown(down))) {
            this.stateMachine.transition('idle')
            return
        }
    }
}

class CrouchBlockState1 extends State1 {
    enter(scene, player) {
        console.log("p1 crouchblock")
        player.setVelocity(0)
        player.anims.stop()

        //play crouch block animation
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
        //make player invulnerable to attacks

        //transition to block if crouch is released
        if(!(Phaser.Input.Keyboard.JustDown(down))) {
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

        // transition to crouch if release block key
        if(!(Phaser.Input.Keyboard.JustDown(block))) {
            this.stateMachine.transition('crouch')
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

        //play block animation


        //transition to move if movement keys pressed
        if(Phaser.Input.Keyboard.JustDown(left) || Phaser.Input.Keyboard.JustDown(right)){
            this.stateMachine.transition('move')
            return
        }

        //transition to crouch block if crouch is pressed
        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('crouchBlock')
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

        // transition to idle if release block key
        if(!(Phaser.Input.Keyboard.JustDown(block))) {
            this.stateMachine.transition('idle')
            return
        }
    }

}

class PunchState1 extends State1 {
    enter(scene, player) {
        console.log("p1 punch")
        player.setVelocity(0)
        player.anims.stop()

        player.anims.play('r_punch')
        player.on('animationcomplete', () => {    //callback after anim completes
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

        //play punch animation transition to idle when finished
        


        //transition to special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(Phaser.Input.Keyboard.JustDown(kick)) {
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

        player.anims.play('r_down_punch')
        player.on('animationcomplete', () => {    //callback after anim completes
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

        //play  down punch animation transition to idle when finished

        //transition to down special if special key pressed
        if(Phaser.Input.Keyboard.JustDown(special)){
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

        player.anims.play('r_kick')
        player.on('animationcomplete', () => {    //callback after anim completes
            this.stateMachine.transition('idle')
            return
        })

        //enable hitbox for kick
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
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(Phaser.Input.Keyboard.JustDown(punch)) {
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(Phaser.Input.Keyboard.JustDown(kick)) {
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

        player.anims.play('r_down_kick')
        player.on('animationcomplete', () => {    //callback after anim completes
            this.stateMachine.transition('idle')
            return
        })


        //enable hitbox for down kick

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
        scene.fireball = scene.add.sprite(player.x + 104, player.height + 275, 'fireball', 0)
        
        player.on('animationcomplete', () => {    //callback after anim completes
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

        


        //enable hitbox for down special state
    }

    execute(scene, player) {

        //play down special animation transition to idle when finished

    }
}



class HurtState1 extends State1 {
    enter(scene, hero) {
        console.log("p1 hurt")
        player.anims.stop()
        //move slightly away from other player

        //play hurt animation

        //wait until hurt animation is complete before returning to idle
    }
}

