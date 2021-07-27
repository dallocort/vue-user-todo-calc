const form = Vue.createApp({
    data() {
        return {
            firstName: '',
            lastName: '',
            password: '',
            repeatPassword: '',
            showFormView: false,
            errorMessages: [],
            showErrorMessage: false,
            passwordStrength: '',
            formLocked: false
        };
    },
    methods: {
        showFormViewFunction() {
            if (this.validate()) {
                this.showFormView = true;
                this.showErrorMessage = false;
                this.formLocked = true;
            } else {
                this.showErrorMessage = true;
            }
        },
        clearForm() {
            this.firstName = '';
            this.lastName = '';
            this.password = '';
            this.repeatPassword = '';
            this.showFormView = false;
            this.errorMessages = [];
            this.passwordStrength = '';
            this.formLocked = false;
            this.showErrorMessage = false;
        },
        validate() {
            this.errorMessages = [];
            const validation1 = this.firstName !== '' && this.lastName !== '' && this.password !== '' && this.repeatPassword !== '';
            const validation2 = this.password === this.repeatPassword;
            if (validation1 && validation2) {
                return true;
            } else {
                if (validation1 === false) {
                    this.errorMessages.push('all fields must be filled!');
                }
                if (validation2 === false) {
                    this.errorMessages.push('passwords must match');
                }
                return false;
            }
        }
    },
    computed: {},
    watch: {
        password() {
            if (this.password.length >= 6) {
                this.passwordStrength = 'strong';
            } else {
                this.passwordStrength = 'weak';
            }
        }
    }
});
form.mount('#userForm');
// ------------------
// ------------------
// ------------------
// ------------------
// ------------------
// ------------------
// ------------------
const todo = Vue.createApp({
    data() {
        return {
            enteredTask: '',
            taskList: []
        };
    },
    methods: {
        addTask() {
            if (this.enteredTask !== '') {
                let nextIndex;
                let i = 1;
                const indexesArray = this.taskList.map((el) => el.index);
                while (true) {
                    if (indexesArray.find((el) => el === i) === undefined) {
                        nextIndex = i;
                        break;
                    }
                    i += 1;
                }
                this.taskList.push({
                    index: nextIndex,
                    value: this.enteredTask,
                    done: false
                });
                this.enteredTask = '';
            }
        },
        makeDone(task) {
            task.done = !task.done;
        },
        deleteTask(task) {
            this.taskList = this.taskList.filter((el) => el !== task);
        },
        sortedTaskList() {
            return this.taskList.sort((a, b) => a.index - b.index);
        }
    },
    computed: {},
    watch: {}
});
todo.mount('#todo');
// ------------------
// ------------------
// ------------------
// ------------------
// ------------------
// ------------------
// ------------------
const calculator = Vue.createApp({
    data() {
        return {
            enteredValue: '',
            operand1: '',
            operand2: '',
            operator: ''
        };
    },
    methods: {
        addNumber(num) {
            if (this.enteredValue === '0') {
                this.enteredValue = '';
            }
            if (this.operator !== '' && this.enteredValue.split(this.operator)[1] === '' && num === 0) {
                return this.enteredValue;
            }
            this.enteredValue += num;
        },
        clear() {
            this.enteredValue = '';
            this.operator = '';
            this.operand1 = '';
            this.operand2 = '';
        },
        addOperator(op) {
            if (this.operator === '') {
                this.operator = op;
                this.operand1 = this.enteredValue;
                this.enteredValue += op;
            } else {
                let splitArray = this.enteredValue.split(this.operator);
                this.operand2 = splitArray[splitArray.length - 1];
                if (this.operand2 !== '') {
                    this.operand1 = this.calculate(this.operand1, this.operator, this.operand2);
                    this.operator = op;
                    this.enteredValue = this.operand1 + '' + this.operator;
                }
            }
        },
        calculate(num1, op, num2) {
            num1 = Number(num1);
            num2 = Number(num2);
            let result;
            switch (op) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num1 / num2;
                    break;
            }
            return result;
        }
    }
});
calculator.mount('#calculator');
