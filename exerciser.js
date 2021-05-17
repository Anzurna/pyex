var task_1_fiz_address;
var task_1_stack_address;
var typeOfSession;
const orig_string_len = 40;
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
    formOriginalString();
    addSliceTrainerListeners();
    var elements = document.getElementsByClassName("bit_button");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function () {
            FlipBit(this); //Here you will need to use the param.
        });
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
                left_border = orig_string_len + left_border;
                is_left_border_negative = true;
            }
            else {
                is_left_border_negative = false;
            }
            if (left_border > orig_string_len) {
                return [];
            }
        }
    }
    if (num_of_colons >= 1) {
        if (+args[1] > orig_string_len) {
            right_border = orig_string_len;
        }
        else if (args[1].replace(/ /g, '') == "") {
            right_border = orig_string_len;
        }
        else if (isNaN(parseInt(args[1]))) {
            right_border = orig_string_len;
        }
        else {
            right_border = parseInt(args[1]);
            if (right_border < 0) {
                right_border = orig_string_len + right_border;
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
        loadBinaryMenu();
    };
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
const blocked_tasks = new Set();
function loadBinaryMenu() {
    let number_of_tasks = 4;
    createTextRow(`Выберите типы задач.`);
    addCheckboxRow("12", "Перевод из одной системы счисления в другую");
    addCheckboxRow("12", "Недесятичная арифметика");
    addCheckboxRow("12", "Задачи с IP адресами");
    addCheckboxRow("12", "Логический сдвиг");
    let elements = document.getElementsByClassName("menu_checkbox");
    for (let i = 0; i < elements.length; i++) {
        elements[i].value = i;
        elements[i].addEventListener('change', function () {
            if (blocked_tasks.has(this.value)) {
                blocked_tasks.delete(this.value);
            }
            else {
                blocked_tasks.add(this.value);
            }
        });
    }
    addRowWithButton("start_binary_session", "Начать");
    GetId("start_binary_session").onclick = function () {
        if (blocked_tasks.size < number_of_tasks) {
            var task_panel = GetId("task_panel");
            setTimeout(() => fade1(task_panel), 500);
            setTimeout(() => removeElement("task_panel"), 1000);
            setTimeout(() => startSession("binary"), 1000);
        }
    };
}
function startSession(_typeOfSession) {
    //let random_number = Math.floor(Math.random() * 2);
    typeOfSession = _typeOfSession;
    loadNextTask();
}
function loadNextTask() {
    var task_panel = document.createElement("div");
    task_panel.id = "task_panel";
    GetId("main").append(task_panel);
    fadeIn(task_panel);
    if (typeOfSession == "x86") {
        loadTask1();
    }
    if (typeOfSession == "binary") {
        while (true) {
            let task_selector = (Math.floor(Math.random() * 4)).toString();
            if (blocked_tasks.has(task_selector)) {
                continue;
            }
            else {
                console.log(task_selector);
                switch (task_selector) {
                    case "0":
                        loadBinaryTask_1();
                        break;
                    case "1":
                        loadBinaryTask_2();
                        break;
                    case "2":
                        loadNetTask_1();
                        break;
                    case "3":
                        loadShiftTask_1();
                        break;
                }
                break;
            }
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
// function loadBinaryTask_2() {
//     let task_2_type = Math.floor(Math.random() * 2);
//     let operand_1_scale : number = 10;
//     let operand_2_scale : number = 10;
//     while (operand_1_scale == 10 && operand_1_scale == 10) {
//         operand_1_scale = scale_of_notation_types[Math.floor(Math.random() * 4)];
//         operand_2_scale= scale_of_notation_types[Math.floor(Math.random() * 4)];
//     }
//     let result_scale = scale_of_notation_types[Math.floor(Math.random() * 4)];
//     let operand_1 = Math.floor(Math.random() * 4096);
//     let operand_2 = Math.floor(Math.random() * 4096);
//     let operand_1_str = transform(operand_1, operand_1_scale);
//     let operand_2_str = transform(operand_2, operand_2_scale);
//     let result : number;
//     if (task_2_type == 0) {
//         createTextRow(`Сложите числа.`);
//         result = operand_1 + operand_2;
//     } else if (task_2_type == 1) {
//         createTextRow(`Вычтите второе число из первого. Результат может быть отрицательным.`);
//         result = operand_1 - operand_2;
//     }
//     let result_str = transform(result, result_scale);
//     addHintedRow(operand_1_scale.toString(), operand_1_str);
//     addHintedRow(operand_2_scale.toString(), operand_2_str);
//     addHintedRowWithInputAndButton(result_scale.toString(), "bin_task_button", "bin_task_input");
//     console.log(result_str);
//     GetId("bin_task_button").onclick = function() { 
//         if (GetId("bin_task_input").value == result_str) {            
//             GetId("bin_task_input").className = "input_element_correct";
//             finishTask()
//         } else {
//             GetId("bin_task_input").className = "input_element_incorrect";
//         }
//     }
// }
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