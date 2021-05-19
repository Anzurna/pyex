var task_1_fiz_address;
var task_1_stack_address;
var typeOfSession;
const ORIG_STRING_LEN = 40;
const PYTHON_SESSION_NAME = "python";
function GetId(id) {
    return document.getElementById(id);
}
var byte_str = "0000000000000000";
function GetNumValue(id) {
    return Number(document.getElementById(id).innerHTML);
}
function toggleBetweenClasses(items, firstClass, secondClass) {
    for (var i = 0; i < items.length; i++) {
        items.item(i).classList.toggle(firstClass, true);
        items.item(i).classList.toggle(secondClass, false);
    }
}
function toggleElementBetweenClasses(element, firstClass, secondClass) {
    element.classList.toggle(firstClass, true);
    element.classList.toggle(secondClass, false);
}
window.onload = function () {
    addMenuListeners();
    if (document.title == "Python exerciser") {
        //Slicer
        formOriginalString();
        addSliceTrainerListeners();
    }
    if (document.title == "Nested") {
        let elements = document.getElementsByClassName("nested_label");
        for (let element = 0; element < elements.length; element++) {
            elements[element].addEventListener("mouseenter", function (event) {
                GetId("nested_result").innerHTML = elements[element].getAttribute("name");
            }, false);
            elements[element].addEventListener("mouseleave", function (event) {
                GetId("nested_result").innerHTML = "&nbsp";
            }, false);
        }
    }
};
function addSliceTrainerListeners() {
    let slice_field = GetId("slice_values");
    let result_field = GetId("slice_result");
    result_field.innerHTML = (`Slice result: be or n`);
    let result_string;
    let string_elements = [];
    slice_field.addEventListener("input", function (event) {
        result_string = "";
        let slice_args = slice_field.value.split(":");
        let num_of_colons = slice_args.length - 1;
        for (let element_id of string_elements) {
            toggleElementBetweenClasses(GetId(element_id), "label_2", "label_2_highlighted");
        }
        string_elements = getSlice("orig_string_", slice_args, num_of_colons);
        if (string_elements != undefined) {
            result_string = getStringFromElements(string_elements);
            for (let element_id of string_elements) {
                toggleElementBetweenClasses(GetId(element_id), "label_2_highlighted", "label_2");
            }
        }
        result_field.innerHTML = (`Slice result: ${result_string}`);
    }, false);
}
function getSlice(id, args, num_of_colons) {
    let result_arr = [];
    let left_border;
    let right_border;
    let step;
    let is_left_border_negative;
    let is_right_border_negative;
    if (num_of_colons == 0 && args[0].replace(/ /g, '') == "") {
        return [];
    }
    if (num_of_colons >= 0) {
        if (args[0].replace(/ /g, '') == "") {
            left_border = 0;
        }
        else if (isNaN(parseInt(args[0]))) {
            left_border = 0;
        }
        else {
            left_border = parseInt(args[0]);
            if (left_border < 0) {
                left_border = ORIG_STRING_LEN + left_border;
                is_left_border_negative = true;
            }
            else {
                is_left_border_negative = false;
            }
            if (left_border > ORIG_STRING_LEN) {
                return [];
            }
        }
    }
    if (num_of_colons >= 1) {
        if (+args[1] > ORIG_STRING_LEN) {
            right_border = ORIG_STRING_LEN;
        }
        else if (args[1].replace(/ /g, '') == "") {
            right_border = ORIG_STRING_LEN;
        }
        else if (isNaN(parseInt(args[1]))) {
            right_border = ORIG_STRING_LEN;
        }
        else {
            right_border = parseInt(args[1]);
            if (right_border < 0) {
                right_border = ORIG_STRING_LEN + right_border;
                is_right_border_negative = true;
            }
            else {
                is_right_border_negative = false;
            }
        }
    }
    if (num_of_colons == 2) {
        if (args[2].replace(/ /g, '') == "") {
            step = 1;
        }
        else if (isNaN(parseInt(args[2])) || parseInt(args[2]) == 0) {
            step = 1;
        }
        else {
            step = parseInt(args[2]);
        }
    }
    console.log(step);
    //Picking letters
    if (num_of_colons == 0) {
        result_arr.push(`${id}${left_border}`);
    }
    else if (num_of_colons == 1) {
        if (left_border < right_border) {
            for (let letter_number = left_border; letter_number < right_border; letter_number++) {
                result_arr.push(`${id}${letter_number}`);
            }
        }
        // } else {
        //     for (let letter_number = right_border; letter_number < left_border; letter_number++) {
        //         result_arr.push(`${id}${letter_number}`)  
        //     } 
        // }      
    }
    else if (num_of_colons == 2) {
        if (step > 0) {
            if (left_border < right_border) {
                for (let letter_number = left_border; letter_number < right_border; letter_number += step) {
                    result_arr.push(`${id}${letter_number}`);
                }
            }
        }
        else if (step < 0) {
            let temp;
            // temp = right_border;
            // right_border = left_border;
            // left_border = temp;
            if (!(((!is_left_border_negative && !is_right_border_negative) && (left_border < right_border)) ||
                (!is_left_border_negative && is_right_border_negative))) {
                if (left_border < right_border) {
                    for (let letter_number = right_border; letter_number > left_border; letter_number += step) {
                        result_arr.push(`${id}${letter_number}`);
                    }
                }
                else {
                    for (let letter_number = left_border; letter_number > right_border; letter_number += step) {
                        result_arr.push(`${id}${letter_number}`);
                    }
                }
            }
        }
        else {
            result_arr = [];
        }
    }
    return result_arr;
}
function getStringFromElements(string_elements) {
    let result = "";
    for (let element = 0; element < string_elements.length; element++) {
        result += GetId(`${string_elements[element]}`).innerHTML;
    }
    if (result == undefined)
        return "";
    else
        return result;
}
function toggleHighlight(items) {
}
function FlipBit(button) {
    var byte_arr = [];
    byte_arr = byte_str.split("");
    if (button.innerHTML == "0") {
        button.innerHTML = "1";
        byte_arr[15 - button.dataset.val] = "1";
    }
    else {
        button.innerHTML = "0";
        byte_arr[15 - button.dataset.val] = "0";
    }
    byte_str = byte_arr.join("");
    var dec_number = parseInt(byte_str, 2);
    GetId("result").value = dec_number.toString();
    GetId("hl_0").value = dec_number.toString(16); //.toUpperCase();
    GetId("ol_0").value = dec_number.toString(8);
    // CalcHex(dec_number, "hl", 16, 4);
    // CalcHex(dec_number, "ol", 8, 6);
}
function addMenuListeners() {
    var calc_panel = document.getElementById("calc_panel");
    var python_excercises_button = GetId("python_tasks_start");
    python_excercises_button.onclick = function () {
        fade(calc_panel, removeElement("calc_panel"));
        // startSession("binary");
        var task_panel = document.createElement("div");
        task_panel.id = "task_panel";
        GetId("main").append(task_panel);
        fadeIn(task_panel);
        loadPythonTasksMenu();
    };
    // let nested_interactive_button = GetId("python_nested_interactive");
    // nested_interactive_button.onclick = function() {
    //     fade(calc_panel, removeElement("calc_panel"));
    //     calc_panel = document.createElement("div");
    //     calc_panel.id = "calc_panel";
    //     createNestedInteractive("calc_panel")
    // } 
}
function formOriginalString() {
    let original = GetId("original_string");
    let str = 'To be or not to be, that is the question';
    let start = `<p class="label_2">original =&nbsp</p>`;
    let quotation = `<p class="label_2">"</p>`;
    original.insertAdjacentHTML("beforeend", start);
    original.insertAdjacentHTML("beforeend", quotation);
    for (let i = 0; i < str.length; i++) {
        if (str[i] == " ") {
            let element = `<p class="label_2" id="orig_string_${i}">&nbsp</p>`;
            original.insertAdjacentHTML("beforeend", element);
        }
        else {
            let element = `<p class="label_2" id="orig_string_${i}">${str[i]}</p>`;
            original.insertAdjacentHTML("beforeend", element);
        }
    }
    original.insertAdjacentHTML("beforeend", quotation);
}
const BLOCKED_TASKS = new Set();
const NUMBER_OF_PYTHON_TASKS = 2;
function loadPythonTasksMenu() {
    createTextRow(`Выберите типы задач.`);
    addCheckboxRow("1", "Типы данных");
    addCheckboxRow("2", "Результат выполнения кода");
    let elements = document.getElementsByClassName("menu_checkbox");
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = i;
        elements[i].addEventListener('change', function () {
            if (BLOCKED_TASKS.has(this.value)) {
                BLOCKED_TASKS.delete(this.value);
            }
            else {
                BLOCKED_TASKS.add(this.value);
            }
        });
    }
    addRowWithButton("start_python_tasks_session", "Начать");
    GetId("start_python_tasks_session").onclick = function () {
        if (BLOCKED_TASKS.size < NUMBER_OF_PYTHON_TASKS) {
            var task_panel = GetId("task_panel");
            setTimeout(() => fade1(task_panel), 500);
            setTimeout(() => removeElement("task_panel"), 1000);
            setTimeout(() => startSession("python"), 1000);
        }
    };
}
function startSession(_typeOfSession) {
    //let random_number = Math.floor(Math.random() * 2);
    typeOfSession = _typeOfSession;
    loadNextTask();
}
function createTaskPanel() {
    var task_panel = document.createElement("div");
    task_panel.id = "task_panel";
    GetId("main").append(task_panel);
    fadeIn(task_panel);
}
function loadNextTask() {
    createTaskPanel();
    if (typeOfSession == "python") {
        selectPythonTask();
    }
}
function selectPythonTask() {
    while (true) {
        let task_selector = (Math.floor(Math.random() * NUMBER_OF_PYTHON_TASKS)).toString();
        if (BLOCKED_TASKS.has(task_selector)) {
            continue;
        }
        else {
            switch (task_selector) {
                case "0":
                    loadPythonDataTypeTask();
                    break;
                case "1":
                    loadPythonDataTypeTask();
                    break;
            }
            break;
        }
    }
}
//var task_number : number = 1;
function finishTask() {
    var task_panel = GetId("task_panel");
    setTimeout(() => fade1(task_panel), 500);
    setTimeout(() => removeElement("task_panel"), 1000);
    setTimeout(loadNextTask, 1000);
    // loadNextTask();
}
function removeElement(el) {
    console.log("Function!");
    GetId(el).remove();
}
function getRandomNumber(range) {
    return (Math.floor(Math.random() * range));
}
function loadPythonDataTypeTask() {
    const NUMBER_OF_SIGNS = 2; // Addition and multiplication
    let rand_int = (Math.floor(Math.random() * 200));
    let rand_float = Math.random() * 200;
    let types = [{ "type_name": "integer", "value": rand_int },
        { "type_name": "string", "value": '"In vino veritas"' },
        { "type_name": "list", "value": "[10, 34, 17]" },
        { "type_name": "dict", "value": '{"destination": "Paris", "speed":250}' },
        { "type_name": "float", "value": rand_float },
        { "type_name": "tuple", "value": "(45, 92, 129)" }];
    let compatible_types_addition = { "integer": ["float", "integer"],
        "string": ["string"],
        "list": ["list"],
        "dict": ["none"],
        "tuple": ["tuple"],
        "float": ["integer", "float"]
    };
    let compatible_types_mul = { "integer": ["float", "integer", "string"],
        "string": ["integer"],
        "list": ["integer"],
        "dict": ["none"],
        "tuple": ["integer"],
        "float": ["integer", "float"]
    };
    let sign_selector = (Math.floor(Math.random() * 2));
    let first_op_num = (Math.floor(Math.random() * types.length));
    let second_op_num = (Math.floor(Math.random() * types.length));
    let first_op_value = types[first_op_num]["value"];
    let second_op_value = types[second_op_num]["value"];
    let result;
    let sign;
    if (sign_selector == 0) {
        result = isOperationCorrect(first_op_num, second_op_num, types, compatible_types_addition);
        sign = "+";
    }
    else if (sign_selector == 1) {
        result = isOperationCorrect(first_op_num, second_op_num, types, compatible_types_mul);
        sign = "*";
    }
    createTextRow(`Допустима ли операция: `);
    createTextRow(`${first_op_value} ${sign} ${second_op_value}`);
    addRowWithRadioButtons("rb_1", "Да", "rb_2", "Нет", "python_type_task_button");
    GetId("rb_1").addEventListener("change", function () {
        if (GetId("rb_2").checked) {
            GetId("rb_2").checked = false;
        }
    });
    GetId("rb_2").addEventListener("change", function () {
        if (GetId("rb_1").checked) {
            GetId("rb_1").checked = false;
        }
    });
    GetId("python_type_task_button").onclick = function () {
        if (GetId("rb_1").checked && (GetId("rb_1").name == result)) {
            GetId("python_type_task_button").className = "menu_button_correct";
            finishTask();
        }
        else if (GetId("rb_2").checked && (GetId("rb_2").name == result)) {
            GetId("python_type_task_button").className = "menu_button_correct";
            finishTask();
        }
        else {
            GetId("python_type_task_button").className = "menu_button_incorrect";
        }
    };
}
function isOperationCorrect(first_op, second_op, types_array, compat_types) {
    let first_op_type = types_array[first_op]["type_name"];
    let second_op_type = types_array[second_op]["type_name"];
    if (compat_types[first_op_type].includes(second_op_type)) {
        return "correct";
    }
    else {
        return "incorrect";
    }
}
function loadShiftTask_1() {
    let direction_select = getRandomNumber(2);
    let shift_amount = getRandomNumber(3) + 1;
    let direction_str = "";
    let byte_str = "";
    let result;
    let number = getRandomNumber(2048);
    let number_transformed = transform(number, 2);
    if (direction_select == 0) {
        direction_str = "влево";
        result = number << shift_amount;
    }
    else {
        direction_str = "вправо";
        result = number >>> shift_amount;
    }
    if (shift_amount > 1) {
        byte_str = "бита";
    }
    else {
        byte_str = "бит";
    }
    createTextRow(`Выполните логический сдвиг беззнакового 
        двухбайтового целого ${direction_str} на ${shift_amount} ${byte_str}.`);
    addHintedRow("2", number_transformed);
    console.log(transform(result, 16));
    addHintedRowWithInputAndButton("16", "bin_task_button", "bin_task_input");
    GetId("bin_task_button").onclick = function () {
        if (GetId("bin_task_input").value == transform(result, 16)) {
            GetId("bin_task_input").className = "input_element_correct";
            finishTask();
        }
        else {
            GetId("bin_task_input").className = "input_element_incorrect";
        }
    };
}
function loadBinaryTask_1() {
    let scale_from = 0;
    let scale_to = 0;
    while (scale_from == scale_to) {
        scale_from = Math.floor(Math.random() * 4);
        scale_to = Math.floor(Math.random() * 4);
    }
    scale_from = scale_of_notation_types[scale_from];
    scale_to = scale_of_notation_types[scale_to];
    let scale_from_name = bin_information_from[scale_from];
    let scale_to_name = bin_information_to[scale_to];
    createTextRow(`Переведите число из ${scale_from_name} системы счисления в ${scale_to_name}.`);
    var conditions = genTranslateTaskConditions(scale_from, scale_to);
    addHintedRow(scale_from.toString(), conditions["question"]);
    console.log(conditions["answer"]);
    addHintedRowWithInputAndButton(scale_to, "bin_task_button", "bin_task_input");
    GetId("bin_task_button").onclick = function () {
        if (GetId("bin_task_input").value == conditions["answer"]) {
            GetId("bin_task_input").className = "input_element_correct";
            finishTask();
        }
        else {
            GetId("bin_task_input").className = "input_element_incorrect";
        }
    };
}
function loadNetTask_1() {
    let net_task_1_type = Math.floor(Math.random() * 2);
    let net_ip = [0, 0, 0, 0];
    let host_ip = [0, 0, 0, 0];
    let netmask = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
        net_ip[i] = Math.floor(Math.random() * 256);
        netmask[i] = Math.floor(Math.random() * 256);
        host_ip[i] = net_ip[i] & netmask[i];
    }
    let convergeIP = function (array) {
        let ip = "";
        for (let byte = 0; byte < 4; byte++) {
            ip += array[byte].toString() + ".";
        }
        return ip.substring(0, ip.length - 1);
    };
    let host_ip_str = convergeIP(host_ip);
    let answer;
    if (net_task_1_type == 0) {
        createTextRow(`Вычислите адрес хоста.`);
        addHintedRow("IP сети&nbsp", convergeIP(net_ip));
        addHintedRow("Маска&nbsp&nbsp&nbsp", convergeIP(netmask));
        addHintedRowWithInputAndButton("IP хоста", "bin_task_button", "bin_task_input");
        answer = host_ip_str;
    }
    else if (net_task_1_type == 1) {
        createTextRow(`Вычислите адрес cети.`);
        addHintedRow("IP хоста", host_ip_str);
        addHintedRow("Маска&nbsp&nbsp&nbsp", convergeIP(netmask));
        addHintedRowWithInputAndButton("IP сети&nbsp", "bin_task_button", "bin_task_input");
        answer = convergeIP(net_ip);
    }
    console.log(host_ip_str);
    GetId("bin_task_button").onclick = function () {
        if (GetId("bin_task_input").value == answer) {
            GetId("bin_task_input").className = "input_element_correct";
            finishTask();
        }
        else {
            GetId("bin_task_input").className = "input_element_incorrect";
        }
    };
}
function addHintedRow(hint, value) {
    var element = `<div class="row">
                        <div class="hex_numbers">
                            <p class="hint">${hint}</p>
                            <div class="hex_label">${value} </div>
                        </div>
                    </div>`;
    GetId("task_panel").insertAdjacentHTML("beforeend", element);
}
function addCheckboxRow(hint, value) {
    var element = `<div class="row">
                        <div class="hex_numbers">
                            <input class="menu_checkbox" type="checkbox" name="scales" checked>
                            <div class="task_string">${value} </div>                        
                        </div>
                    </div>`;
    GetId("task_panel").insertAdjacentHTML("beforeend", element);
}
function addHintedRowWithInputAndButton(hint, button_id, input_id) {
    var element = `<div class="row">
                        <div class="hex_numbers">
                            <p class="hint">${hint}</p>
                            <input class="input_element" id="${input_id}" type="text" placeholder="0">
                            <button class="menu_button" id="${button_id}" type="button">Проверить</button>
                        </div>
                    </div>`;
    GetId("task_panel").insertAdjacentHTML("beforeend", element);
}
function addRowWithRadioButtons(rb_1_id, rb_1_text, rb_2_id, rb_2_text, button_id) {
    var element = `<div class="row">
                        <div class="hex_numbers">
                            <input type="radio" id="${rb_1_id}"
                            name="correct" value="correct">
                            <label class="label_2" for="${rb_1_id}">${rb_1_text}</label>
                            <input type="radio" id="${rb_2_id}"
                            name="incorrect" value="incorrect">
                            <label class="label_2" for="${rb_2_id}">${rb_2_text}</label>
                            <button class="menu_button" id="${button_id}" type="button">Проверить</button>
                        </div>
                    </div>`;
    GetId("task_panel").insertAdjacentHTML("beforeend", element);
}
function addRowWithButton(button_id, button_text) {
    var element = `<div class="row">
                        <div class="hex_numbers">
                            <button class="menu_button" id="${button_id}" type="button">${button_text}</button>
                        </div>
                    </div>`;
    GetId("task_panel").insertAdjacentHTML("beforeend", element);
}
function genTranslateTaskConditions(scale_from, scale_to) {
    let random = 0;
    while (random < 50) {
        random = Math.floor(Math.random() * 4096);
    }
    var question = transform(random, scale_from);
    var answer = transform(random, scale_to);
    return { "question": question, "answer": answer };
}
function transform(num, scale_target) {
    switch (scale_target) {
        case 2: return num.toString(2);
        case 8: return num.toString(8);
        case 16: return num.toString(16).toUpperCase();
        default: return num.toString();
    }
}
function loadTask1() {
    let cs = Math.floor(Math.random() * 65535);
    let ss = Math.floor(Math.random() * 65535);
    let ip = Math.floor(Math.random() * 65535);
    let sp = Math.floor(Math.random() * 65535);
    task_1_fiz_address = (cs * 16 + ip).toString(16).toUpperCase();
    task_1_stack_address = (ss * 16 + sp).toString(16).toUpperCase();
    createFirstBitRow("CS", cs);
    createBitRow("SS", ss);
    createBitRow("SP", sp);
    createBitRow("IP", ip);
    createTextRow(`Вычислите физический адрес следующей исполняемой команды.`);
    var row = document.createElement("div");
    CreateRow(row);
    var input_element = document.createElement("input");
    row.append(input_element);
    input_element.className = "input_element";
    input_element.type = "text";
    input_element.id = "first_answ";
    input_element.placeholder = "FFFFF";
    input_element.addEventListener('input', checkResult);
    createTextRow(`Вычислите адрес вершины стека.`);
    var row = document.createElement("div");
    CreateRow(row);
    var input_element = document.createElement("input");
    row.append(input_element);
    input_element.className = "input_element";
    input_element.type = "text";
    input_element.id = "second_answ";
    input_element.placeholder = "FFFFF";
    input_element.addEventListener('input', checkResult);
    // input_element.pattern = "[0-1]*"
    var task_num = document.createElement("p");
    task_num.className = "task_number";
    //task_num.innerHTML = task_number.toString();
    GetId("first_row").append(task_num);
}
function checkResult(e) {
    console.log("Results:", task_1_fiz_address, task_1_stack_address);
    var first_answer = GetId("first_answ").value.toUpperCase();
    var second_answer = GetId("second_answ").value.toUpperCase();
    console.log("Current:", first_answer, second_answer);
    e.target.value = e.target.value.toUpperCase();
    if (first_answer == task_1_fiz_address) {
        GetId("first_answ").className = "input_element_correct";
    }
    else {
        GetId("first_answ").className = "input_element_incorrect";
    }
    if (second_answer == task_1_stack_address) {
        GetId("second_answ").className = "input_element_correct";
    }
    else {
        GetId("second_answ").className = "input_element_incorrect";
    }
    if ((first_answer == task_1_fiz_address) && (second_answer == task_1_stack_address)) {
        finishTask();
    }
}
function createTextRow(text) {
    let row = document.createElement("div");
    CreateRow(row);
    let task_string = document.createElement("div");
    task_string.className = "task_string";
    row.append(task_string);
    task_string.innerHTML = text;
}
function CalcHex(dec_number, id_base, dig_capasity, amount) {
    var hex_string = dec_number.toString(dig_capasity);
    hex_string = hex_string.split("").reverse().join("");
    for (let i = 0; i < amount; i++) {
        if (hex_string.length > i) {
            GetId(id_base + "_" + (i)).innerHTML = hex_string.charAt(i).toUpperCase();
        }
        else {
            GetId(id_base + "_" + (i)).innerHTML = "0";
        }
    }
}
// function onExerciseButtonClick() {
//     calc_panel.remove();
//     CreateBitRow(); 
// }
function createBitRow(suffix, random_number) {
    let row = document.createElement("div");
    CreateRow(row);
    let bit_row = document.createElement("div");
    createBitRowDiv(bit_row);
    row.append(bit_row);
    createBits(bit_row, suffix, random_number);
}
function createFirstBitRow(suffix, random_number) {
    let row = document.createElement("div");
    CreateRow(row);
    row.id = "first_row";
    let bit_row = document.createElement("div");
    createBitRowDiv(bit_row);
    row.append(bit_row);
    createBits(bit_row, suffix, random_number);
}
function CreateRow(row) {
    row.className = "row";
    GetId("task_panel").append(row);
}
function createBitRowDiv(bit_row) {
    bit_row.className = "hex_numbers";
}
function createBits(bit_row, suffix, random_number) {
    let label = document.createElement("p");
    label.className = "hint";
    label.innerHTML = suffix;
    bit_row.append(label);
    let bit_string = random_number.toString(2);
    //console.log(bit_string);
    let reversed_string = bit_string.split("").reverse().join("");
    console.log(bit_string);
    for (let bit_number = 15; bit_number >= 0; bit_number--) {
        let bit = document.createElement("button");
        bit.className = "bit_button_2";
        bit.type = "button";
        bit.dataset.value = bit_number + suffix;
        if (reversed_string[bit_number] == undefined) {
            bit.innerHTML = "0";
        }
        else {
            bit.innerHTML = reversed_string[bit_number];
        }
        bit_row.append(bit);
        if ((bit_number) % 4 == 0 && bit_number != 0) {
            let dot = document.createElement("p");
            dot.className = "bit_button_2";
            dot.innerHTML = ".";
            bit_row.append(dot);
        }
    }
}
function fade(element, callback) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            console.log(op);
            clearInterval(timer);
            element.style.display = 'none';
            callback && callback();
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}
function fade1(element) {
    var op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 20);
}
function fadeIn(element) {
    var op = 0.01; // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 20);
}
