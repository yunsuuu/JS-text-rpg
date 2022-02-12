// 클래스 속성 적용 전 JS

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

const hero = {
  name: '',
  lev: 1,
  maxHp: 100, // 최대체력
  hp: 100, // 현재체력
  xp: 0, // 경험치
  att: 10, // 공격력
  attack: function(monster){ 
    // this가 화살표 함수 내부에 있을 땐 this = window
    // this 사용할 때는 화살표 함수 사용 X
    // window = 브라우저 전체를 담당하는 객체
    monster.hp -= this.att; // 객체 내부 this는 객체 자신을 가리킴(this = hero)
    this.hp -= monster.att;
  },
  heal: function(monster){
    this.hp += 20;
    history.hp -= monster.att;
  }
};
let monster = null; // 아직 몬스터 생성 전
const monsterList = [ // list에서 랜덤으로 뽑아 let monster에 넣어줌
  { name: '슬라임', hp: 25, att: 10, xp: 10 },
  { name: '스켈레톤', hp: 50, att: 15, xp: 20 },
  { name: '마왕', hp: 150, att: 35, xp: 50 },
];

$startScreen.addEventListener("submit", (e) => {
  e.preventDefault();
  // const 변수 = 함수가 끝나면 사라짐
  // name 변수를 계속 사용하고 싶으면 함수 밖에 let name으로 빼줌
  const name = e.target['name-input'].value;  // input value
  // form 태그에서는 id가 선언된 input이나 button을 위와 같은 코드로 가지고 올 수 있음
  // e.target.name-input 은 불가능(이름에 특수문자가 포함되면 . 사용불가)
  // 반드시 대괄호로 태그 불러와야함
  // form 내부 id가 name-input인 태그의 value값
  $startScreen.style.display = "none";
  $gameMenu.style.display = "block";
  $heroName.innerText = name;
  $heroLevel.innerText = `${hero.lev}Lev`;
  $heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
  $heroXp.innerText = `XP: ${hero.xp}/${15 * hero.lev}`;
  $heroAtt.innerText = `ATT: ${hero.att}`;
  hero.name = name;
});

$gameMenu.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = e.target['menu-input'].value;
  if(input === '1'){ // 모험
    $gameMenu.style.display = "none";
    $battleMenu.style.display = "block";
    monster = JSON.parse( // 깊은복사를 해줌으로써 원본값 유지
      JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
    )
    monster.maxHp = monster.hp;
    $monsterName.innerText = monster.name;
    $monsterHp.innerText = `HP: ${monster.hp}/${monster.maxHp}`;
    $monsterAtt.innerText = `ATT: ${monster.att}`;

    // 객체를 대입하면 "참조"
    // -> 두 개의 값이 연결되어 있어서 하나를 바꾸면 나머지도 바뀜 
    // 참조하기 싫으면 "복사"
    // -> 깊은복사 - 원본과의 참조가 완전히 끊어진 객체(서로의 값에 영향을 주지 않음)
    // -> 얕은복사 - 겉껍데기만 참조 관계가 끊김
    // const monster1 = JSON.parse(JSON.stringify(monsterList[0])); 
    // // JSON.parse(JSON.stringify) 깊은복사 - 원본 객체의 값을 바꾸지 않고 유지하기 위해
    // const monster2 = monsterList[0]; // 참조
    // const monster3 = { ...monster[0] }; // 얕은복사
    // // 얕은복사 - 가장 바깥 객체(껍데기)만 복사, 내부 객체는 참조 관계를 유지하는 복사(복사본이 수정되면 원본도 수정)
    // // 객체를 얕은 복사할 때 -> 객체 안에서 ... { ... }
    // // 배열을 얕을 복사할 때 -> 배열 안에서 ... [ ... ]
    // monster1.name = "새 몬스터";
    // console.log(monsterList[0].name); // 슬라임(깊은복사-원본값 유지)
    // monster2.name = "새 몬스터";
    // console.log(monsterList[0].name); // 새 몬스터(얕은복사-원본값 변화)
    // monster3.name = "새 몬스터";
    // console.log(monsterList[0].name); // 새 몬스터(얕은복사-원본값 변화)
    // console.log(monsterList[0] === monster1); // false
    // console.log(monsterList[0] === monster2); // true
    // console.log(monsterList[0] === monster3); // false
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