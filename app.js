// 클래스 문법으로 JS 재구성
// 객체지향프로그램(서로 간의 상호작용이 중요) 개발시 클래스 문법 중요

const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu'); // 일반메뉴
const $battleMenu = document.querySelector('#battle-menu'); // 전투메뉴
const $heroName = document.querySelector('#hero-name');
const $heroLevel = document.querySelector('#hero-level');
const $heroHp = document.querySelector('#hero-hp');
const $heroXp = document.querySelector('#hero-xp');
const $heroAtt = document.querySelector('#hero-att');
const $monsterName = document.querySelector('#monster-name');
const $monsterHp = document.querySelector('#monster-hp');
const $monsterAtt = document.querySelector('#monster-att');
const $message = document.querySelector('#message');

class Game { // Game 관련 설정들을 모두 묶어둠
  constructor(name){
    // this = Game
    this.monster = null; // game을 통해 monster에 접근할 수 있게(상호작용)
    this.hero = null; // game을 통해 hero에 접근할 수 있게(상호작용)
    this.monsterList = [
      { name: '슬라임', hp: 25, att: 10, xp: 10 },
      { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
      { name: '마왕', hp: 150, att: 35, xp: 50 },
    ];
    this.start(); // this = Game
  }
  start(){
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    // this.changeScreen('game');
  }
}

// 새로운 게임을 새로 생성하는 방법(공장처럼 찍어냄) - 팩토리 함수
// new Game();
// new Game();

class Hero { // Hero 관련 설정들을 모두 묶어둠
  constructor(game, name){
    this.game = game;  // hero를 통해 game에 접근할 수 있게
    this.name = name;
    // hero 초기값
    this.lev = 1;
    this.maxHp = 100;
    this.hp = 100;
    this.xp = 0;
    this.att = 10;
  }
  attack(target){ // 공격모드
    target.hp -= this.att; // hero의 공격에 따라 target(monster)의 hp 감소
  }
  heal(monster){ // 회복모드
    this.hp += 20;
    this.hp -= monster.att; // monster의 공격에 따라 this(hero)의 hp 감소
  }
}

class Monster { // Monster 관련 설정들을 모두 묶어둠
  constructor(game, name, hp, att, xp){
    this.game = game;
    this.name = name;
    this.maxHp = hp;
    this.hp = hp;
    this.xp = xp;
    this.att = att;
  }
  attack(target){
    target.hp -= this.att; // target.hp = target.hp - this.att
  }
}

let game = null; // new Game을 저장하는 변수
$startScreen.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = e.target['name-input'].value;
  game = new Game(name); 
  // input.value를 받아서 새로운 게임을 생성
  // 새로운 게임이 생성되면 constructor(name){} 부분이 실행
});

$gameMenu.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target['menu-input'].value;
  if(input === '1'){ // 모험
  } else if(input === '2'){ // 휴식
  } else if(input === '3'){ // 종료

  }
});

$battleMenu.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target['battle-input'].value;
  if(input === '1'){ // 공격
  } else if(input === '2'){ // 회복
  } else if(input === '3'){ // 도망
  }
});