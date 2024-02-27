class Player2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene
        scene.physics.add.existing(this)   // add physics body to scene

        // set custom Hero properties 
        this.WALK_SPEED = 100    // in pixels
        this.dashCooldown = 300    // in ms
        this.hurtTimer = 250       // in ms

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.player2FSM = new StateMachine2('idle', {
            idle: new IdleState2(), 
            move: new MoveState2(),
            crouch:new CrouchState2(),
            crouchBlock: new CrouchBlockState2(),
            block: new BlockState2(),
            punch: new PunchState2(),
            downPunch: new DownPunchState2(),
            kick: new KickState2(),
            downKick: new DownKickState2(),
            special: new SpecialState2(),
            downSpecial: new DownSpecialState2(),
            hurt: new HurtState2()
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// hero-specific state classes
class IdleState2 extends State2 {
    enter(scene, player) {
        //stop [player]
        player.setVelocity(0)

        //play idle animation
        
    }

    execute(scene, player) {

        //transition to move if movement keys pressed
        if(scene.p2Left.isDown || scene.p2Right.isDown){
            this.stateMachine.transition('move')
            return
        }

        //transition to crouch if down key pressed
        if(scene.p2Down.isDown) {
            this.stateMachine.transition('crouch')
            return
        }

        //transition to block if block key is pressed
        if(scene.p2Block.isDown) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p2Punch.isDown){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p2Kick.isDown){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('special')
            return
        }

    }
}

class MoveState2 extends State2 {
    enter(scene, player) {
        // handle movement
        if(scene.p2Left.isDown){
            //play walk animation backwards

            
        }else if(scene.p2Right.isDown) {
            //play walk animation forwards


        }
    }
    execute(scene, player) {


        //transition to crouch if down key pressed
        if(scene.p2Down.isDown) {
            this.stateMachine.transition('crouch')
            return
        }

        //transition to block if block key is pressed
        if(scene.p2Block.isDown) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p2Punch.isDown){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p2Kick.isDown){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('special')
            return
        }

        // transition to idle if not pressing movement keys
        if(!(scene.p2Left.isDown || scene.p2Right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        if(scene.p2Left.isDown){
            //play walk animation backwards

            //set velocity
            player.setVelocityX(-this.WALK_SPEED)
            
        }else if(scene.p2Right.isDown) {
            //play walk animation forwards

            //set velocity
            player.setVelocityX(this.WALK_SPEED)
        }
    }
}

class CrouchState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play crouch animation

    }

    execute(scene, player) {
        //transition to move if movement keys pressed
        if(scene.p2Left.isDown || scene.p2Right.isDown){
            this.stateMachine.transition('move')
            return
        }

        //transition to block if block key is pressed
        if(scene.p2Block.isDown) {
            this.stateMachine.transition('crouchBlock')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p2Punch.isDown){
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p2Kick.isDown){
            this.stateMachine.transition('downKick')
            return
        }

        //transition to special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('downSpecial')
            return
        }

        // transition to idle if release crouch key
        if(!(scene.p2Down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }
    }
}

class CrouchBlockState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play crouch block animation
    }

    execute(scene, player) {
        //make player invulnerable to attacks

        //transition to block if crouch is released
        if(!(scene.p2Down.isDown)) {
            this.stateMachine.transition('block')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p2Punch.isDown){
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p2Kick.isDown){
            this.stateMachine.transition('downKick')
            return
        }

        //transition to special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('downSpecial')
            return
        }

        // transition to crouch if release block key
        if(!(scene.p2Block.isDown)) {
            this.stateMachine.transition('crouch')
            return
        }

    }
}

class BlockState2 extends State2 {
    enter(scene, player) {
        //freeze velocity
        player.setVelocity(0)

        //make immune to hits

        //play block animation

    }

    execute(scene, player) {
        //transition to move if movement keys pressed
        if(scene.p2Left.isDown || scene.p2Right.isDown){
            this.stateMachine.transition('move')
            return
        }

        //transition to crouch block if crouch is pressed
        if(scene.p2Down.isDown) {
            this.stateMachine.transition('crouchBlock')
            return
        }

        //transition to punch if punch key pressed
        if(scene.p2Punch.isDown){
            this.stateMachine.transition('punch')
            return
        }

        //transition to kick if kick key pressed
        if(scene.p2Kick.isDown){
            this.stateMachine.transition('kick')
            return
        }

        //transition to special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('special')
            return
        }

        // transition to idle if release block key
        if(!(scene.p2Block.isDown)) {
            this.stateMachine.transition('idle')
            return
        }
    }

}

class PunchState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play punch animation transition to idle when finished


        //enable hitbox for punch

    }

    execute(scene, player) {
        //transition to special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(scene.p2Punch.isDown) {
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(scene.p2Kick.isDown) {
            this.stateMachine.transition('downKick')
            return
        }

    }
}

class DownPunchState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play  down punch animation transition to idle when finished


        //enable hitbox for down punch

    }

    execute(scene, player) {
        //transition to down special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('downSpecial')
            return
        }

    }
}

class KickState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play kick animation transition to idle when finished


        //enable hitbox for kick
    }

    execute(scene, player) {
        //transition to special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('special')
            return
        }

        //transition to down punch if punch pressed again
        if(scene.p2Punch.isDown) {
            this.stateMachine.transition('downPunch')
            return
        }

        //transition to down kick if kick pressed
        if(scene.p2Kick.isDown) {
            this.stateMachine.transition('downKick')
            return
        }

    }
}

class DownKickState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play down kick animation transition to idle when finished


        //enable hitbox for down kick

    }

    execute(scene, player) {
        //transition to down special if special key pressed
        if(scene.p2Special.isDown){
            this.stateMachine.transition('downSpecial')
            return
        }

    }
}

class SpecialState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play special animation transition to idle when finished


        //enable hitbox for special state
    }

    execute(scene, player) {

    }

}

class DownSpecialState2 extends State2 {
    enter(scene, player) {
        player.setVelocity(0)

        //play down special animation transition to idle when finished


        //enable hitbox for down special state
    }

    execute(scene, player) {

    }
}



class HurtState2 extends State2 {
    enter(scene, hero) {
        //move slightly away from other player

        //play hurt animation

        //wait until hurt animation is complete before returning to idle
    }
}

