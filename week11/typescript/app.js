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
    // setName(name:string):void
};
//setStudentInfo(obj_student);
function setStudentInfo(student) {
    console.log('student :', student);
}
