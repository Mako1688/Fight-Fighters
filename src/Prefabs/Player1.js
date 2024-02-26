class Player1 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        // set custom Hero properties 
        this.WALK_SPEED = 100    // in pixels
        this.dashCooldown = 300    // in ms
        this.hurtTimer = 250       // in ms

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.player1FSM = new StateMachine('idle', {
            idle: new IdleState(), 
            move: new MoveState(),
            crouch:new CrouchState(),
            crouchBlock: new CrouchBlockState(),
            block: new BLockState(),
            punch: new PunchState(),
            downPunch: new DownPunchState(),
            kick: new KickState(),
            downKick: new DownKickState(),
            special: new SpecialState(),
            downSpecial: new DownSpecialState(),
            hurt: new HurtState()
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// hero-specific state classes
class IdleState extends State {
    enter(scene, player) {
        //stop [player]
        player.setVelocity(0)

        //play idle animation
        
    }

    execute(scene, player) {

        //transition to move if movement keys pressed
        if(scene.p1Left.isDown || scene.p1Right.isDown){
            this.stateMachine.transition('move')
            return
        }

        //transition to crouch if down key pressed
        if(scene.p1Down.isDown) {
            this.stateMachine.transition('crouch')
            return
        }

        //transition to block if block key is pressed
        if(scene.p1Block.isDown) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p1Punch.isDown){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p1Kick.isDown){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(scene.p1Special.isDown){
            this.stateMachine.transition('special')
            return
        }

    }
}

class MoveState extends State {
    enter(scene, player) {
        // handle movement
        if(scene.p1Left.isDown){
            //play walk animation backwards

            
        }else if(scene.p1Right.isDown) {
            //play walk animation forwards


        }
    }
    execute(scene, player) {


        //transition to crouch if down key pressed
        if(scene.p1Down.isDown) {
            this.stateMachine.transition('crouch')
            return
        }

        //transition to block if block key is pressed
        if(scene.p1Block.isDown) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p1Punch.isDown){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p1Kick.isDown){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(scene.p1Special.isDown){
            this.stateMachine.transition('special')
            return
        }

        // transition to idle if not pressing movement keys
        if(!(scene.p1Left.isDown || scene.p1Right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        if(scene.p1Left.isDown){
            //play walk animation backwards

            //set velocity
            player.setVelocityX(-this.WALK_SPEED)
            
        }else if(scene.p1Right.isDown) {
            //play walk animation forwards

            //set velocity
            player.setVelocityX(this.WALK_SPEED)
        }
    }
}

class CrouchState extends State {
    enter(scene, player) {
        player.setVelocity(0)

        //play crouch animation

    }

    execute(scene, player) {
        //transition to move if movement keys pressed
        if(scene.p1Left.isDown || scene.p1Right.isDown){
            this.stateMachine.transition('move')
            return
        }

        //transition to block if block key is pressed
        if(scene.p1Block.isDown) {
            this.stateMachine.transition('crouchBlock')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p1Punch.isDown){
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p1Kick.isDown){
            this.stateMachine.transition('downKick')
            return
        }

        //transition to special if special key pressed
        if(scene.p1Special.isDown){
            this.stateMachine.transition('downSpecial')
            return
        }

        // transition to idle if release crouch key
        if(!(scene.p1Down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }
    }
}

class CrouchBlockState extends State {
    enter(scene, player) {
        player.setVelocity(0)

        //play crouch block animation
    }

    execute(scene, player) {
        
    }
}

class SwingState extends State {
    enter(scene, hero) {
        hero.setVelocity(0)
        hero.anims.play(`swing-${hero.direction}`)
        hero.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}

class DashState extends State {
    enter(scene, hero) {
        hero.setVelocity(0)
        hero.anims.play(`swing-${hero.direction}`)
        hero.setTint(0x00AA00)     // turn green
        switch(hero.direction) {
            case 'up':
                hero.setVelocityY(-hero.heroVelocity * 3)
                break
            case 'down':
                hero.setVelocityY(hero.heroVelocity * 3)
                break
            case 'left':
                hero.setVelocityX(-hero.heroVelocity * 3)
                break
            case 'right':
                hero.setVelocityX(hero.heroVelocity * 3)
                break
        }

        // set a short cooldown delay before going back to idle
        scene.time.delayedCall(hero.dashCooldown, () => {
            hero.clearTint()
            this.stateMachine.transition('idle')
        })
    }
}

class HurtState extends State {
    enter(scene, hero) {
        hero.setVelocity(0)
        hero.anims.play(`walk-${hero.direction}`)
        hero.anims.stop()
        hero.setTint(0xFF0000)     // turn red
        // create knockback by sending body in direction opposite facing direction
        switch(hero.direction) {
            case 'up':
                hero.setVelocityY(hero.heroVelocity*2)
                break
            case 'down':
                hero.setVelocityY(-hero.heroVelocity*2)
                break
            case 'left':
                hero.setVelocityX(hero.heroVelocity*2)
                break
            case 'right':
                hero.setVelocityX(-hero.heroVelocity*2)
                break
        }

        // set recovery timer
        scene.time.delayedCall(hero.hurtTimer, () => {
            hero.clearTint()
            this.stateMachine.transition('idle')
        })
    }
}

class CircularState extends State {
    enter(scene, hero) {
        //hero.setTint(0x0000FF)
        hero.setVelocity(0)
        hero.anims.play('circular-attack').once('animationcomplete', () => {
            scene.cameras.main.shake(150, 0.005)
            this.stateMachine.transition('idle')
        })
        
    }
}