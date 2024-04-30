// class enemy {
//     constructor(jeu) {
//         this.jeu = jeu;
//         this.x = Math.random() * this.jeu.width;
//         this.y = Math.random() * this.jeu.height;
//         this.speedX = 0;
//         this.speedY = Math.random() * 4 + 1;
//         this.width = 40;
//         this.height = 40;
//         this.image = document.getElementById('enemyImg');
        
//     }
//     // this.enemy1 = new enemy(this)
//     update() {
//         this.x += this.speedX;
//         this.y += this.speedY;

//         if (this.y > this.jeu.height) {
//             this.x = Math.random() * this.jeu.width;
//             this.y = 0;
//             this.y = -this.height;
//         }
//     }
//     draw() {
//         this.jeu.context.fillRect(this.x, this.y, this.width, this.height);
//         this.jeu.context.fillStyle = 'red';
//         // context.beginPath();
//         // context.moveTo(this.x, this.y - 20);
//         // context.lineTo(this.x + 20, this.y + 20);
//         // context.lineTo(this.x - 20, this.y + 20);
//         // context.closePath();
//         // context.fillStyle = 'green';
//         // context.fill();
//         // context.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
//     }

// }