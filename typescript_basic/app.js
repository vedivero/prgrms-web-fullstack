var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var GenderType;
(function (GenderType) {
    GenderType["Male"] = "male";
    GenderType["Femal"] = "female";
    GenderType["GengerNeutral"] = "nue";
})(GenderType || (GenderType = {}));
function getStudentInfo(id) {
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
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.studentId = 123949;
        this.studentName = 'park';
        this.age = 18;
        this.gender = 'male';
        this.course = 'typescript';
        this.complete = true;
    }
    MyStudent.prototype.setName = function (name) {
        this.studentName = name;
        console.log('이름 설정 : ' + this.studentName);
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
myInstance.setName('hong');
//heap
var obj_student = {
    studentId: 485223,
    studentName: 'choi',
    age: 19,
    gender: 'femail',
    course: 'typescript',
    complete: true,
};
//setStudentInfo(obj_student);
function setStudentInfo(student) {
    console.log('student :', student);
}
var user = {
    name: 'john',
    age: 25,
};
var anyVal = 100;
anyVal = true;
var item;
var numStr = 100;
function converToString(val) {
    if (typeof val === 'string') {
        item = 0;
    }
    else {
        item = val;
    }
    return String(val);
}
function converToNumber(val) {
    return Number(val);
}
console.log(converToString(numStr));
console.log(converToNumber(numStr));
var numbers = [1, 2, 3, 4, 5];
var fruits = ['apple', 'banana', 'orange'];
for (var i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
for (var i = 0; i < numbers.length; i++) {
    console.log(fruits[i]);
}
var mixedArray = [1, 'two', 3, 'four'];
for (var i = 0; i < mixedArray.length; i++) {
    console.log(mixedArray[i]);
}
var infer = [1, 2, 3];
for (var i = 0; i < infer.length; i++) {
    console.log(infer[i]);
}
var readOnlyArray = [1, 2, 3];
//튜플 : 타입의 순서가 정해져 있음
var greeting = [1, 'hello', true];
for (var i = 0; i < greeting.length; i++) {
    console.log(greeting[i]);
}
//Spread 연산자
var firstArray = [1, 2, 3];
var secondArray = [4, 5, 6];
var combineArray = __spreadArray(__spreadArray([], firstArray, true), secondArray, true);
console.log(combineArray);
for (var i = 0; i < combineArray.length; i++) {
    console.log(combineArray[i]);
}
