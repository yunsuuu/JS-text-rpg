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

$startScreen.addEventListener("submit", (e) => {
  
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