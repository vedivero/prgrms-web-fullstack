// printEmp('홍길동', 20, '개발자');

class Employee {
   // 소스 코드가 중복
   //    private _empName: string;
   //    private _age: number;
   //    private _empJob: string;

   //    constructor(empName: string, age: number, empJob: string) {
   //       this._empName = empName;
   //       this._age = age;
   //       this._empJob = empJob;
   //    }
   constructor(private _empName: string, private _age: number, private _empJob: string) {}

   //get
   get empName() {
      return this._empName;
   }
   //set
   set empName(val: string) {
      this._empName = val;
   }

   printEmp = (): void => {
      console.log(this._empName + `의 나이는` + this._age + `이고, 직업은 ` + this._empJob + `입니다`);
   };
}

//public, private, protected
let employee1 = new Employee('홍길동', 29, '개발자');

employee1.empName = 'lee';
employee1.printEmp();
