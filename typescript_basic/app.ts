enum GenderType {
   Male = 'male',
   Femal = 'female',
   GengerNeutral = 'nue',
}

interface Student {
   studentId: number;
   studentName: string;
   age: number;
   gender: 'male' | 'female';
   course: string;
   complete: boolean;
}

function getStudentInfo(id: number): Student {
   return {
      studentId: id,
      studentName: 'lee',
      age: 20,
      gender: 'male',
      course: 'typescript',
      complete: true,
   };
}

//console.log(getStudentInfo(1234));

class MyStudent implements Student {
   studentId = 123949;
   studentName = 'park';
   age = 18;
   gender: 'male' | 'female' = 'male';
   course = 'typescript';
   complete = true;

   setName(name: string): void {
      this.studentName = name;
      console.log('이름 설정 : ' + this.studentName);
   }
}

const myInstance = new MyStudent();

myInstance.setName('hong');

//heap
let obj_student = {
   studentId: 485223,
   studentName: 'choi',
   age: 19,
   gender: 'femail',
   course: 'typescript',
   complete: true,
};

//setStudentInfo(obj_student);

function setStudentInfo(student: Student): void {
   console.log('student :', student);
}

const user: { name: string; age: number } = {
   name: 'john',
   age: 25,
};

let anyVal: any = 100;
anyVal = true;

type strOrNum = number | string;
let item: number;

let numStr: strOrNum = 100;

function converToString(val: strOrNum): string {
   if (typeof val === 'string') {
      item = 0;
   } else {
      item = val;
   }
   return String(val);
}

function converToNumber(val: strOrNum): number {
   return Number(val);
}

console.log(converToString(numStr));
console.log(converToNumber(numStr));

let numbers: number[] = [1, 2, 3, 4, 5];

let fruits: string[] = ['apple', 'banana', 'orange'];

for (let i = 0; i < numbers.length; i++) {
   console.log(numbers[i]);
}
for (let i = 0; i < numbers.length; i++) {
   console.log(fruits[i]);
}

let mixedArray: (number | string)[] = [1, 'two', 3, 'four'];

for (let i = 0; i < mixedArray.length; i++) {
   console.log(mixedArray[i]);
}

let infer = [1, 2, 3];

for (let i = 0; i < infer.length; i++) {
   console.log(infer[i]);
}

let readOnlyArray: ReadonlyArray<number> = [1, 2, 3];

//튜플 : 타입의 순서가 정해져 있음
let greeting: [number, string, boolean] = [1, 'hello', true];

for (let i = 0; i < greeting.length; i++) {
   console.log(greeting[i]);
}

//Spread 연산자
let firstArray = [1, 2, 3];
let secondArray = [4, 5, 6];

let combineArray = [...firstArray, ...secondArray];
console.log(combineArray);

for (let i = 0; i < combineArray.length; i++) {
   console.log(combineArray[i]);
}
