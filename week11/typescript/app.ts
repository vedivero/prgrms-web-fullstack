interface Student {
   studentId: number;
   studentName: string;
   age: number;
   gender: string;
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
   gender = 'male';
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
