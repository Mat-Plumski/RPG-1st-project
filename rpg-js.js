// Main Menu

const gameWindow = document.getElementById("game-window")
const loadBtn = document.getElementById("start-btn")
const optionsBtn = document.getElementById("options-btn")

function renderMainMenu() {
    gameWindow.innerHTML = `
    <div class="title-screen">
        <div class="title-container">
            <h1>Adventures of a Hero</h1>
        </div>
        <div class="btns-container">
            <button class="btn" id="start-btn">START</button>
            <button class="btn" id="load-btn">LOAD</button>
            <button class="btn" id="options-btn">OPTIONS</button>
        </div>
        <div class="meta-info-container">
            <h3>ver 0.1</h3>
            <h3>made by: Mateusz Sliwinski</h3>
        </div>
    </div>`

    document.getElementById("start-btn").addEventListener("click", renderCharacterSelection)
}

renderMainMenu()


// Character-Selection 

function renderCharacterSelection() {
    gameWindow.innerHTML = `
    <div class="character-selection">
        <div class="title-container">
            <h1>Choose your Hero</h1>
        </div>
        <div class="character-carousel-container">
            <div class="arrow"><button class="btn" id="arrow-left"><</button></div>
            <div class="character-option" id="character-option_1">
                <div id="character-one" class="character-image">
                    <img src="./images/character models/knight.png">
                    <h2>Knight</h2>
                </div>
                <div id="character-two" class="character-image">
                    <img src="./images/character models/wizard.png">
                    <h2>Wizard</h2>
                </div>
                <div id="character-three" class="character-image">
                    <img src="./images/character models/template.png">
                    <h2>Unknown</h2>
                </div>
            </div>
            <div class="character-option" id="character-option_2">
                <div id="character-four" class="character-image">
                    <img src="./images/character models/template.png">
                    <h2>Unknown</h2>
                </div>
                <div id="character-five" class="character-image">
                    <img src="./images/character models/template.png">
                    <h2>Unknown</h2>
                </div>
                <div id="character-six" class="character-image">
                    <img src="./images/character models/template.png">
                    <h2>Unknown</h2>
                </div>
            </div>
            <div class="character-option" id="character-option_3">
                <div id="character-seven" class="character-image">
                    <img src="./images/character models/template.png">
                    <h2>Unknown</h2>
                </div>
                <div id="character-eight" class="character-image">
                    <img src="./images/character models/template.png">
                    <h2>Unknown</h2>
                </div>
                <div id="character-nine" class="character-image">
                    <img src="./images/character models/template.png">
                    <h2>Unknown</h2>
                </div>
            </div>
            <div class="arrow"><button class="btn" id="arrow-right">></button></div>
        </div>
    </div>`

    const characterOptionsArr = document.getElementsByClassName("character-option")
    let currentCharacterOptionPosition = 0

    document.getElementById("arrow-left").addEventListener("click", () => {
        characterOptionsArr[currentCharacterOptionPosition].style.display = "none"
        if(currentCharacterOptionPosition === 0){
            currentCharacterOptionPosition = characterOptionsArr.length - 1
        } else {
            currentCharacterOptionPosition --
        }
        characterOptionsArr[currentCharacterOptionPosition].style.display = "flex"
    })
    
    document.getElementById("arrow-right").addEventListener("click", () => {
        characterOptionsArr[currentCharacterOptionPosition].style.display = "none"
        if(currentCharacterOptionPosition === characterOptionsArr.length - 1){
            currentCharacterOptionPosition = 0
        } else {
            currentCharacterOptionPosition ++
        }
        characterOptionsArr[currentCharacterOptionPosition].style.display = "flex"
    })

    document.getElementById("character-one").addEventListener("click", () => {
        pickedHero = knight
        renderIntroCard()
    })

    document.getElementById("character-two").addEventListener("click", () => {
        pickedHero = wizard
        renderIntroCard()
    })
}

// Intro Card

function renderIntroCard() {
    gameWindow.innerHTML = `
        <div class="intro-card">
            <h2>Long Ago in a village somewhere</h2>
            <div class="intro-text">
                <p>Mat needed to create a project for his portfolio.</p>
                <p>He spent two weeks making this little demo so he could get feedback.</p>
            </div>
            <button class="btn" id="intro-skip-btn">SKIP</button>
        </div>`

    document.getElementById("intro-skip-btn").addEventListener("click", renderBoard)
}

// Board

function renderBoard() {
    gameWindow.innerHTML = `
        <div id="overlay">
            <img src="images/backgrounds/game_instructions.png">
            <button class="btn" id="instructions-off-btn">I get it :)</button>
        </div>
        <div id="game-board">
        </div>
        `
    boardSquares = document.getElementsByClassName("board-square")
    doorTile = document.getElementById("door-tile")

    renderLeve1()

    document.getElementById("instructions-off-btn").addEventListener("click", () => {
        document.getElementById("overlay").style.display = "none"
        enableCharacterControls()
    })
}

let currentBoardWidth
let currentMonsterArr
let pickedHero 

// Characters

class Character {
    constructor(id, name, type, hp, atk, def, className, alive, position){
        this.id = id
        this.name = name
        this.type = type
        this.hp = hp
        this.atk = atk
        this.def = def
        this.className = className
        this.alive = alive
        this.position = position
    }
}

class Hero extends Character {
    constructor(id, name, type, hp, atk, def, className, alive, position){
        super(id, name, type, hp, atk, def, className, alive, position)
    }
}

class Monster extends Character {
    constructor(id, name, type, hp, atk, def, className, alive, position){
        super(id, name, type, hp, atk, def, className, alive, position)
    }
}

const knight = new Hero(001, "Knight", "hero", 20, 4, 2, "knight", true, 0)
const wizard = new Hero(002, "Wizard", "hero", 10, 2, 0, "wizard", true, 0)

const rat_1 = new Monster(100, "Rat", "monster", 8, 1, 0, "rat", true, 4)
rat_1.path = () => {
    setTimeout(() => {
        rat_1.alive ? moveCharacter(rat_1, "down") : null}, 1000)
    setTimeout(()=>{
        rat_1.alive ? moveCharacter(rat_1, "down") : null}, 2000)
    setTimeout(()=>{
        rat_1.alive ? moveCharacter(rat_1, "up") : null}, 3000)
    setTimeout(()=>{
        rat_1.alive ? moveCharacter(rat_1, "up") : null}, 4000)
}
rat_1.monsterPatrol = () => {return setInterval(() => rat_1.path(), 4000)}

const rat_2 = new Monster(101, "Rat", "monster", 8, 1, 0, "rat", true, 43)
rat_2.path = () => {
    setTimeout(() => {
        rat_2.alive ? moveCharacter(rat_2, "left") : null}, 1000)
    setTimeout(() => {
        rat_2.alive ? moveCharacter(rat_2, "left") : null}, 2000)
    setTimeout(() => {
        rat_2.alive ? moveCharacter(rat_2, "left") : null}, 3000)
    setTimeout(() => {
        rat_2.alive ? moveCharacter(rat_2, "right") : null}, 4000)
    setTimeout(() => {
        rat_2.alive ? moveCharacter(rat_2, "right") : null}, 5000)
    setTimeout(() => {
        rat_2.alive ? moveCharacter(rat_2, "right") : null}, 6000)
}
rat_2.monsterPatrol = () => {return setInterval(() => rat_2.path(), 6000)}

const skeleton_1 = new Monster(102, "Skeleton", "monster", 12, 2, 1, "skeleton", true, 8)
skeleton_1.path = () => {
    setTimeout(() => {
        skeleton_1.alive ? moveCharacter(skeleton_1, "down") & moveCharacter(skeleton_1, "left") : null}, 1500)
    setTimeout(() => {
        skeleton_1.alive ? moveCharacter(skeleton_1, "down") & moveCharacter(skeleton_1, "left") : null}, 3000)
    setTimeout(() => {
        skeleton_1.alive ? moveCharacter(skeleton_1, "right") & moveCharacter(skeleton_1, "up") : null}, 4500)
    setTimeout(() => {
        skeleton_1.alive ? moveCharacter(skeleton_1, "right") & moveCharacter(skeleton_1, "up") : null}, 6000)
}
skeleton_1.monsterPatrol = () => {return setInterval(() => skeleton_1.path(), 6000)}

const board_1_monster_arr = [rat_1]
const board_2_monster_arr = [rat_2, skeleton_1]

// Render game assets

let currentBoardState

function renderBoard1HTML() {
    document.getElementById("game-board").innerHTML = `
        <div class="board-square lvl1 walking-tile top-square left-square"></div>
        <div class="board-square lvl1 walking-tile top-square"></div>
        <div class="board-square lvl1 walking-tile top-square right-square"></div>
        <div class="board-square lvl1 wall-tile"></div>
        <div class="board-square lvl1 walking-tile top-square left-square"></div>
        <div class="board-square lvl1 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl1 door" id="door-tile_1"></div>
        <div class="board-square lvl1 walking-tile left-square"></div>
        <div class="board-square lvl1 walking-tile bottom-square"></div>
        <div class="board-square lvl1 walking-tile right-square"></div>
        <div class="board-square lvl1 wall-tile"></div>
        <div class="board-square lvl1 walking-tile left-square right-square"></div>
        <div class="board-square lvl1 wall-tile"></div>
        <div class="board-square lvl1 wall-tile"></div>
        <div class="board-square lvl1 walking-tile left-square right-square"></div>
        <div class="board-square lvl1 wall-tile"></div>
        <div class="board-square lvl1 walking-tile left-square right-square"></div>
        <div class="board-square lvl1 wall-tile"></div>
        <div class="board-square lvl1 walking-tile left-square"></div>
        <div class="board-square lvl1 walking-tile top-square"></div>
        <div class="board-square lvl1 walking-tile top-square right-square"></div>
        <div class="board-square lvl1 walking-tile left-square right-square bottom-square"></div>
        <div class="board-square lvl1 wall-tile"></div>
        <div class="board-square lvl1 walking-tile bottom-square left-square"></div>
        <div class="board-square lvl1 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl1 walking-tile bottom-square"></div>
        <div class="board-square lvl1 walking-tile bottom-square"></div>
        <div class="board-square lvl1 walking-tile bottom-square right-square"></div>
    `
}

function renderBoard2HTML() {
    document.getElementById("game-board").innerHTML = `
        <div class="board-square lvl2 walking-tile top-square left-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square"></div>
        <div class="board-square lvl2 walking-tile top-square"></div>
        <div class="board-square lvl2 walking-tile top-square right-square"></div>

        <div class="board-square lvl2 walking-tile left-square right-square"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 walking-tile left-square right-square"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 walking-tile left-square"></div>
        <div class="board-square lvl2 walking-tile"></div>
        <div class="board-square lvl2 walking-tile right-square"></div>

        <div class="board-square lvl2 walking-tile left-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square right-square"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 walking-tile left-square right-square"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 walking-tile left-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile bottom-square"></div>
        <div class="board-square lvl2 walking-tile bottom-square right-square door" id="door-tile_2"></div>

        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 walking-tile left-square right-square"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 walking-tile left-square right-square"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 wall-tile"></div>

        <div class="board-square lvl2 walking-tile top-square left-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile bottom-square right-square"></div>
        <div class="board-square lvl2 wall-tile"></div>
        <div class="board-square lvl2 walking-tile left-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square"></div>
        <div class="board-square lvl2 walking-tile top-square bottom-square right-square" id="chest-tile"></div>
    `
}

function renderCharacter(character) {
    boardSquares[character.position].classList.add(`${character.type}`)
    boardSquares[character.position].innerHTML = `<div class="${character.className}"></div>`
}

function removeCharacter(character) {
    boardSquares[character.position].classList.remove(`${character.type}`)
    boardSquares[character.position].innerHTML = ``
}

// Controls and movement

const changeCharacterPosition = {
    up: (character) => character.position = character.position - currentBoardWidth,
    right: (character) => character.position = character.position + 1,
    down: (character) => character.position = character.position + currentBoardWidth,
    left: (character) => character.position = character.position - 1,
}

function moveCharacter(character, direction) {
    removeCharacter(character)
    if(direction === "up"){changeCharacterPosition.up(character)}
    else if (direction === "right"){changeCharacterPosition.right(character)}
    else if (direction === "down"){changeCharacterPosition.down(character)}
    else if (direction === "left"){changeCharacterPosition.left(character)}
    renderCharacter(character)
    checkForCombat()
}


function checkForCombat() {
    for (let i = 0; i < currentMonsterArr.length; i++) {
        if(pickedHero.position === currentMonsterArr[i].position && currentMonsterArr[i].alive) {
            console.log("battle")
            removeCharacter(currentMonsterArr[i])
            renderCombat(currentMonsterArr[i])
            currentMonsterArr[i].alive = false
            clearInterval(currentMonsterArr[i].monsterPatrol)
        } else if (boardSquares[pickedHero.position].id === "door-tile_1" ){
            console.log("DOOR")
            renderLevel2()
        } else if (boardSquares[pickedHero.position].id === "door-tile_2") {
            renderOutroCard()
        }
    }
}

function checkIfCanMove(direction) {
    if(boardSquares[pickedHero.position].classList.contains(direction)) {
        return false
    } else {return true}
}

function enableCharacterControls() {
    document.addEventListener("keydown", (event) => {
    event.preventDefault()
    if(event.key === "ArrowUp") {
        if(checkIfCanMove("top-square")){
            moveCharacter(pickedHero, "up")
        }
    } else if (event.key === "ArrowRight") {
        if(checkIfCanMove("right-square")){
            moveCharacter(pickedHero, "right")
        }
    } else if (event.key === "ArrowDown") {
        if(checkIfCanMove("bottom-square")){
            moveCharacter(pickedHero, "down")
        }
    } else if (event.key === "ArrowLeft") {
        if(checkIfCanMove("left-square")){
            moveCharacter(pickedHero, "left")
        }
    }
})}

function renderLeve1(){
    currentBoardWidth = 7
    currentMonsterArr = board_1_monster_arr
    pickedHero.position = 21
    renderBoard1HTML()
    renderCharacter(pickedHero)
    renderCharacter(rat_1)
    rat_1.path()
    rat_1.monsterPatrol()
}

function renderLevel2(){
    currentBoardWidth = 9
    currentMonsterArr = board_2_monster_arr
    pickedHero.position = 36
    renderBoard2HTML()
    renderCharacter(pickedHero)
    renderCharacter(rat_2)
    rat_2.path()
    rat_2.monsterPatrol()
    renderCharacter(skeleton_1)
    skeleton_1.path()
    skeleton_1.monsterPatrol()
}

//renderLeve1()
//renderLevel2()

// Combat

function renderCombat(currentMonster) {
    currentBoardState = gameWindow.innerHTML
    gameWindow.innerHTML = `
    <div class="combat-screen">
                <div id="hero-box">
                    <img src="images/character models/${pickedHero.className}.png">
                </div>
                <div id="monster-box">
                    <img src="images/character models/${currentMonster.className}.png">
                </div>
            </div>
            <div class="combat-user-interface">
                <div class="combat-user-interface-btns">
                    <div class="combat-user-interface-btns-left">
                        <button id="atk-btn">Attack</button>
                        <button id="ability-btn">Ability</button>
                    </div>
                    <div class="combat-user-interface-btns-right">
                        <button id="item-btn"><p class="vertical-writing">Item</p></button>
                    </div>
                </div>
                <div id="combat-user-interface-btns-options">
                    <p>Hey, unfortunately I had run out of time to implement combat and its features,
                    nevertheless I truly hope you can see how it would work.</p>
                    <button id="exit-btn">Please click here to Exit and continue</button>
                </div>
            </div>
    `
    document.getElementById("exit-btn").addEventListener("click", () => {
        gameWindow.innerHTML = currentBoardState
        renderCharacter(pickedHero)
    })
}

// Outro Card

function renderOutroCard() {
    gameWindow.innerHTML = `
        <div class="outro-card">
            <h2>Thank You so much for checking out my HTML, CSS and JS DEMO :)</h2>
            <div class="intro-text">
                <p>Here are some things I wish I could have added:</p>
                <ul>
                    <li>BOX SIZING MAT YOU 🤬</li>
                    <li>Implement Combat!</li>
                    <li>Fix the bug where mosters path will continue out of boundary after combat</li>
                    <li>Replace all solid colour blocks with drawn art</li>
                    <li>Implement ALL combat features such as abilitites and items</li>
                    <li>Add working chest tile</li>
                    <li>Create working UI outside of combat</li>
                    <li>Implement "save" and "load" features using local storage</li>
                </ul>
            </div>
        </div>`
}

