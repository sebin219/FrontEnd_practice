// 배열과 함께 사용되는 고차함수

// sort
let numbers = [50, 10, 30, 55, 60];
numbers.sort((a, b) => a - b);
console.log(numbers);
numbers.sort((a, b) => b - a);
console.log(numbers);

//forEach, find, findIndex, some, every, filter, map, flatmap, sort, reduce

const fruits = ['사과', '바나나', '키위', '딸기'];
fruits.forEach((item, i, arr) => {
  console.log(item);
});

const item1 = { name: '김밥', price: 1000 };
const item2 = { name: '오뎅', price: 1500 };
const item3 = { name: '순대', price: 3000 };
const item4 = { name: '김밥', price: 2300 };
const products = [item1, item2, item3, item4];

// find: 조건에 맞는 아이템을 찾을 때
// 조건에 해당하는 아이템이 두가지라면 첫번째를 출력
console.clear();
let find1 = products.find((item) => item.name === '김밥');
console.log('find--', find1);

// findIndex - 제일 먼저 조건에 맞는 아이템의 인덱스 반환
find1 = products.findIndex((item) => item.name === '김밥');
console.log('find--', find1);

// some- 배열의 아이템들이 부분적으로 조건에 맞는지 확인.
// 반환값은 (bool)
find1 = products.some((item) => item.name === '삼각김밥');
console.log('find--', find1);

// every - 전제 조건이 맞는지 확인
// 반환값 bool
find1 = products.every((item) => item.name === '김밥');
console.log('find--', find1);

// filter - 조건에 맞는 아이템을 새로운 배열로 반환
// 반환값 배열
find1 = products.filter((item) => item.name === '김밥');
console.log('find--', find1);

// map
let numbers2 = [50, 10, 30, 55, 60];
let results = numbers2.map((item) => {
  if (item % 2 === 0) {
    return item * 2;
  } else {
    return item;
  }
});
console.log('map --', results);

// flatmap - 중첩된 배열을 펼쳐서 새로운 배열로 생성
result = results.flatMap((item) => [1, 2]);
console.log(result);

result = ['test'].flatMap((text) => text.split(''));
console.log(result);

const num = [0, 5, 20, 5, 80];
let test = num.sort((a, b) => a - b);
console.log(test);

let test2 = num.sort((a, b) => b - a);
console.log(test);

//reduce
let test3 = num.reduce((sum, v) => (sum += v), 0);
console.log(test3);
