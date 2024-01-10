const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: 50,
    width: 50,
    height: 50,
    speed: 5,
    score: 0
};

const npc = {
    x: 200,
    y: 200,
    width: 50,
    height: 50
};

const enemies = [
    { x: 400, y: 100, width: 30, height: 30, speed: 3 },
    { x: 600, y: 300, width: 30, height: 30, speed: 4 },
    // Afegeix més enemics aquí si ho desitges
];

function drawBackground() {
    // Dibuixa el fons del bosc
    ctx.fillStyle = "#8B4513"; // Marró verdós per al fons del bosc
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            player.y -= player.speed;
            break;
        case "ArrowDown":
            player.y += player.speed;
            break;
        case "ArrowLeft":
            player.x -= player.speed;
            break;
        case "ArrowRight":
            player.x += player.speed;
            break;
    }

    checkCollisions();
    drawGame();
});

function moveEnemies() {
    // Mou els enemics
    for (const enemy of enemies) {
        enemy.x += enemy.speed;
        if (enemy.x > canvas.width) {
            // Reinicia la posició quan arriben al final del canvas
            enemy.x = -enemy.width;
            enemy.y = Math.random() * canvas.height;
        }
    }
}

function checkCollisions() {
    // Comprova la col·lisió amb el personatge amb qui parlar
    if (
        player.x < npc.x + npc.width &&
        player.x + player.width > npc.x &&
        player.y < npc.y + npc.height &&
        player.y + player.height > npc.y
    ) {
        alert("Benvingut! Gràcies per parlar.");
        player.score += 10; // Guanya punts quan parles amb el personatge
        npc.x = -100; // Mou el personatge amb qui parlar fora de la pantalla
    }

    // Comprova la col·lisió amb els enemics
    for (const enemy of enemies) {
        if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ) {
            alert("Has estat atacat per un enemic!");
            // Aquí pots afegir més lògica quan el jugador és atacat
        }
    }
}

function drawGame() {
    // Dibuixa el fons del bosc
    drawBackground();

    // Dibuixa el jugador
    ctx.fillStyle = "#00F"; // Color blau per al jugador
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Dibuixa el personatge amb qui parlar
    ctx.fillStyle = "#0F0"; // Color verd per al personatge amb qui parlar
    ctx.fillRect(npc.x, npc.y, npc.width, npc.height);

    // Dibuixa els enemics
    ctx.fillStyle = "#F00"; // Color vermell per als enemics
    for (const enemy of enemies) {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }

    // Dibuixa la puntuació del jugador
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Puntuació: " + player.score, 10, 30);
}

function startGame() {
    setInterval(function() {
        moveEnemies();
        checkCollisions();
        drawGame();
    }, 1000 / 60); // Actualitza el joc aproximadament cada 60 milisegons
}

window.onload = startGame;
