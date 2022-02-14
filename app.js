// 클래스 문법으로 JS 재구성
// 객체지향프로그램(서로 간의 상호작용이 중요) 개발시 클래스 문법 중요
// 동작들을 메서드로 묶어 코드를 간결하고 깔끔하게
// 객체.메서드 안에서 this = 객체
// 기본적으로 this = window

const $startScreen = document.querySelector('#start-screen');
const $gameMenu = document.querySelector('#game-menu'); // 일반메뉴
const $battleMenu = document.querySelector('#battle-menu'); // 전투메뉴
const $battleInput = document.querySelector("#battle-input");
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
    this.start(name); // this = Game
    // 게임시작할 때 name 값 받아서 start(name){} 실행
  }
  // 바깥쪽 this와 안쪽 this 값 같게 할 때 - 화살표 함수 사용
  start(name){
    // onGameMenuInput, onBattleMenuInput = 화살표함수이어야 에러가 나지 않음
    $gameMenu.addEventListener("submit", this.onGameMenuInput);
    $battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen('game');
    this.hero = new Hero(this, name); // 새로운 hero 객체 생성
    this.updateHeroStat(); // hero 상태 설정
  }
  changeScreen(screen){
    if(screen === 'start') {
      $startScreen.style.display = 'block';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'none';
    } else if(screen === 'game'){
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'block';
      $battleMenu.style.display = 'none';
    } else if(screen === 'battle'){
      $startScreen.style.display = 'none';
      $gameMenu.style.display = 'none';
      $battleMenu.style.display = 'block';
    }
  }
  onGameMenuInput = (e) => {
    // 화살표 함수는 바깥쪽 this를 그대로 가지고 옴
    // 바깥쪽 this(Game)와 통일시키기 위해 화살표 함수 사용
    // 화살표 함수가 아닌 function(){} 사용시 this는 window
    e.preventDefault();
    const input = e.target['menu-input'].value;
    if(input === '1'){ // 모험
      // addEventListener에서 this를 사용하면 this = $gameMenu(form) - 암기
      // 바깥쪽 this = Game != addEventListener 안쪽 this = $gameMenu(form)
      // addEventListener를 기준으로 바깥쪽, 안쪽 this가 다르기 때문에 화살표 함수를 사용하여 this를 통일시켜줌
      this.changeScreen('battle');
      // 몬스터 랜덤 생성 
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this, // Game
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp,
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. [ ${this.monster.name} ] 인 것 같아!`);
    } else if(input === '2'){ // 휴식
      // 체력을 최대로 회복하는 기능
      this.hero.hp = this.hero.maxHp;
      this.updateHeroStat();
      this.showMessage('충분한 휴식을 취했다.');
    } else if(input === '3'){ // 종료
      this.showMessage('');
      this.quit();
    }
  }
  onBattleMenuInput = (e) => {
    e.preventDefault();
    const input = e.target['battle-input'].value;
    e.target['battle-input'].value = "";
    if(input === '1'){ // 공격
      const { hero, monster } = this;
      hero.attack(monster);
      monster.attack(hero);
      if(hero.hp <= 0){ // 영웅이 죽음(현재체력 <= 0)
        this.showMessage(`${hero.lev}레벨에서 전사, 새 주인공을 생성하세요!`);
        this.quit(); // 게임종료
      } else if(monster.hp <= 0){ // 몬스터가 죽음
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었습니다!`);
        hero.getXp(monster.xp);
        this.monster = null; // 몬스터가 죽었으니 삭제
        this.changeScreen('game'); // 다시 일반메뉴로 돌아가기
      } else { // 전투상황
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았습니다!`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if(input === '2'){ // 회복
      // 전투 중에 체력을 20 회복
      // 회복 후에 몬스터에게 한번 공격 당함
      // 최대 체력값을 넘길 수 없음
      const { hero, monster } = this;
      hero.hp += 20;
      if(hero.hp > hero.maxHp){
        hero.hp = hero.maxHp;
      }
      monster.attack(hero);
      this.showMessage('체력을 조금 회복했다!');
      this.updateHeroStat();
    } else if(input === '3'){ // 도망
      // 강력한 몬스터 만났을 때 도망
      this.changeScreen('game');
      this.showMessage('부리나케 도망쳤다!');
      this.monster = null;
      this.updateMonsterStat();
    }
  }
  updateHeroStat(){
    const { hero } = this; // this = Game
    if(hero === null){
      $heroName.innerText = '';
      $heroLevel.innerText = '';
      $heroHp.innerText = '';
      $heroXp.innerText = '';
      $heroAtt.innerText = '';
    } else {
      $heroName.innerText = `${hero.name} = `;
      $heroLevel.innerText = `${hero.lev}Lev`;
      $heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
      $heroXp.innerText = `XP: ${hero.xp}/${15 * hero.lev}`;
      $heroAtt.innerText = `ATT: ${hero.att}`;
    }
  }
  updateMonsterStat(){
    const { monster } = this;
    if(monster === null){
      $monsterName.innerText = '';
      $monsterHp.innerText = '';
      $monsterAtt.innerText = '';
    } else {
      $monsterName.innerText = `${monster.name} = `;
      $monsterHp.innerText = `HP: ${monster.hp}/${monster.maxHp}`;
      $monsterAtt.innerText = `ATT: ${monster.att}`;
    }
  }
  showMessage(text){
    $message.innerText = text;
  }
  quit(){ // 게임종료(초기화)
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    $gameMenu.removeEventListener("submit", this.onGameMenuInput);
    $battleMenu.removeEventListener("submit", this.onBattleMenuInput);
    this.changeScreen('start');
    game = null;
  }
}
// 새로운 게임을 새로 생성하는 방법(팩토리함수 - 공장처럼 찍어냄)
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
  getXp(xp){
    this.xp += xp;
    if(this.xp >= this.lev * 15){ // 경험치를 다 채우면
      this.xp -= this.lev * 15; // 
      this.lev += 1;
      this.maxHp += 5;
      this.att += 5;
      this.hp = this.maxHp;
      this.game.showMessage(`레벨업! 레벨 ${this.lev}`);
    }
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
  // input.value(name)를 받아서 새로운 게임을 생성
  // 새로운 게임이 생성되면 constructor(name){} 부분이 실행
});