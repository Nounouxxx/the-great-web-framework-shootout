class Vaisseau {
  constructor(x, y, image, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed + 9;
      this.width = 50;
      this.height = 50;
      this.image = image;
  }

  draw(context) {
      // Dessiner l'image du vaisseau au lieu du triangle vert
      context.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}
class vaisseauJoueur extends Vaisseau {
  constructor(x, y, image, speed) {
      super(x, y, image, speed);
  }

  draw(context) {
    // Dessiner l'image du vaisseau joueur
    context.drawImage(this.image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  update(deltaTime) {
    // Mettre à jour le vaisseau joueur
    // Mettre à jour la position en fonction des touches enfoncées
    let dx = 0;
    let dy = 0;

    if ('ArrowLeft' in this.keysPressed) {
      dx -= this.speed * deltaTime;
    }
    if ('ArrowRight' in this.keysPressed) {
      dx += this.speed * deltaTime;
    }
    if ('ArrowUp' in this.keysPressed) {
      dy -= this.speed * deltaTime;
    }
    if ('ArrowDown' in this.keysPressed) {
      dy += this.speed * deltaTime;
    }

    this.x += dx;
    this.y += dy;
  }
}


class VaisseauEnnemi extends Vaisseau {
  constructor(x, y, type) {
    super(x, y, 40, 40, 50); // Largeur, hauteur et points de vie du vaisseau ennemi
    this.type = type; // Type de vaisseau ennemi (peut être utilisé pour différents comportements)
  }

  draw(context) {
    // Dessiner le vaisseau ennemi
  }

  update(deltaTime) {
    // Mettre à jour le vaisseau ennemi
  }
}

// Charger l'image du vaisseau
const vaisseauImage = new Image();
vaisseauImage.src = 'images/vaisseauRedim2.jpg';

// Définition de la classe Missile
class Missile {
  constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.speed = speed +3;
      this.width = 2;
      this.height = 10;
  }

  draw(context) {
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x, this.y - this.height);
      context.strokeStyle = 'yellow';
      context.lineWidth = 2;
      context.stroke();
  }

  update() {
      this.y -= this.speed;
  }
}

class Jeu {
  constructor() {
    this.canvas = document.getElementById('Canvas');
    this.context = this.canvas.getContext('2d');
    this.resizeCanvas(); // Appel initial pour redimensionner le canvas
    this.ship = new Vaisseau(this.canvas.width / 2, this.canvas.height / 2, vaisseauImage);
    this.missiles = [];
    this.missileSpeed = 0.3; // Vitesse du missile par milliseconde
    this.shipSpeed = 0.6; // Vitesse du vaisseau par milliseconde
    this.keysPressed = {};
    this.lastTimestamp = 0;
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
    window.addEventListener('resize', this.resizeCanvas.bind(this)); // Écouter l'événement de redimensionnement
    requestAnimationFrame(this.loop.bind(this));
  }
 // Fonction pour redimensionner le canvas
 resizeCanvas() {
  this.canvas.width = window.innerWidth;
  this.canvas.height = window.innerHeight;
}
  handleKeyDown(event) {
    this.keysPressed[event.key] = true;
    if (event.key === ' ') { // Touche "espace" pour lancer un missile
      this.fireMissile();
    }
  }

  handleKeyUp(event) {
    delete this.keysPressed[event.key];
  }

  updateShipPosition(deltaTime) {
    let dx = 0;
    let dy = 0;

    if ('ArrowLeft' in this.keysPressed) {
      dx -= this.shipSpeed * deltaTime;
    }
    if ('ArrowRight' in this.keysPressed) {
      dx += this.shipSpeed * deltaTime;
    }
    if ('ArrowUp' in this.keysPressed) {
      dy -= this.shipSpeed * deltaTime;
    }
    if ('ArrowDown' in this.keysPressed) {
      dy += this.shipSpeed * deltaTime;
    }

    this.ship.x += dx;
    this.ship.y += dy;
  }

  loop(timestamp) {
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;

    this.updateShipPosition(deltaTime); // Mettre à jour la position du vaisseau
    this.update(); // Mettre à jour d'autres éléments du jeu (comme le missile)
    this.draw(); // Dessiner les éléments du jeu

    requestAnimationFrame(this.loop.bind(this));
  }

  fireMissile() {
    // Lancer un nouveau missile à partir du vaisseau
    let newMissile = new Missile(this.ship.x, this.ship.y - 20, this.missileSpeed);
    this.missiles.push(newMissile); // Ajouter le nouveau missile à la liste
  }

  update() {
    // Mettre à jour les éléments du jeu...
    // Mettre à jour chaque missile
    this.missiles.forEach(missile => {
      missile.update();
      if (missile.y < -10) {
        // Supprimer le missile s'il sort de l'écran
        this.missiles.splice(this.missiles.indexOf(missile), 1);
      }
    });
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ship.draw(this.context);
    this.missiles.forEach(missile => {
      missile.draw(this.context);
    });
  }
}

let jeu = new Jeu();
jeu.loop();