class AudioScene extends Phaser.Scene {
    constructor() {
        super('audioScene')
    }

    preload() {
        
    }

    create() {
        console.log('audio scene launched')
        // Check if the scene has not started yet
        if (!this.hasStarted) {
            // Play the background song and loop it
            this.battleSong = this.sound.add('battle song', { loop: true })
            this.battleSong.play()

            // Set the flag to true to indicate that the scene has started
            this.hasStarted = true
        }
    }
}