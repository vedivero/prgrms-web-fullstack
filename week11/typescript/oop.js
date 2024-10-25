// printEmp('홍길동', 20, '개발자');
var Employee = /** @class */ (function () {
    // 소스 코드가 중복
    //    private _empName: string;
    //    private _age: number;
    //    private _empJob: string;
    //    constructor(empName: string, age: number, empJob: string) {
    //       this._empName = empName;
    //       this._age = age;
    //       this._empJob = empJob;
    //    }
    function Employee(_empName, _age, _empJob) {
        var _this = this;
        this._empName = _empName;
        this._age = _age;
        this._empJob = _empJob;
        this.printEmp = function () {
            console.log(_this._empName + "\uC758 \uB098\uC774\uB294" + _this._age + "\uC774\uACE0, \uC9C1\uC5C5\uC740 " + _this._empJob + "\uC785\uB2C8\uB2E4");
        };
    }
    Object.defineProperty(Employee.prototype, "empName", {
        //get
        get: function () {
            return this._empName;
        },
        //set
        set: function (val) {
            this._empName = val;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
//public, private, protected
var employee1 = new Employee('홍길동', 29, '개발자');
employee1.empName = 'lee';
employee1.printEmp();
