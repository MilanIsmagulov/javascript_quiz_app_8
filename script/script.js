// dran&drop 2
const anwserArr2 = ['some1', 'some2', 'some3', 'some4']; //Ответы
const countCol = 3; //Колличесвто колонн
const correctAnwser1 = ['some1', 'some3'] //Правильные варианты. Кол-во масивов в соотвествиие с кол-ом колонн
const correctAnwser2 = ['some4'] //correctAnwser1 - 1 колонна и т.д.
const correctAnwser3 = ['some2']
const correctAnwsers = [
    correctAnwser1, 
    correctAnwser2,
    correctAnwser3
] //Сюда надо тоже добавить

const collumns = document.getElementById('columns')
const row = document.getElementById('row')

let areaIndex;
let startIndex;
let dragElem = null;
let rowArr = []

let data = {}

let numberOfQuestion = 2;
let questionNumberPlace = document.querySelector('#question_number_span');
let questionNumberPlaceDiscription = document.querySelector('#question_number_strong');

questionNumberPlace.innerHTML = numberOfQuestion + '. ';
questionNumberPlaceDiscription.innerHTML = '<strong>' + numberOfQuestion + '/10' + '</strong>'

init2()

function init2() {
    createColumns();
    localStorage.getItem('data2') ? loadList2() : createList2()
}

function createColumns() {
    for(let i = 0; i < countCol; i++)  {
        const col = document.createElement('div')

        col.classList.add('col')
        col.innerHTML = `
        <ul class='col-ul' index='${i}'></ul>
        `;

        data[i] = []
        collumns.appendChild(col)
    }
    areaIndex = document.querySelectorAll('.col-ul').length
    data[areaIndex] = []
    row.setAttribute('index', areaIndex)
}

function createList2() {
    anwserArr2.forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.classList.add('item2');
        listItem.draggable = 'true';
        listItem.innerText = item

        data[areaIndex].push(listItem.innerText)
        row.appendChild(listItem)
    })
    localStorage.setItem('data2', JSON.stringify(data))

    addEventListeners2();
}

function loadList2() {
    fromStore2();

    const tempArr = []

    anwserArr2.forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.classList.add('item2');
        listItem.draggable = 'true';
        listItem.innerText = item

        tempArr.push(listItem)
    })

    for (let key in data) {
        data[key].map(key2 => {
            tempArr.map(key3 => {
                document.querySelectorAll('.col-ul').forEach((item, index) => {
                    if (key == index && key2 === key3.innerText) {
                        item.appendChild(key3)
                    }
                })
            })
        })
    }

    let keyLast = Object.keys(data)
    let rowData = data[keyLast[keyLast.length - 1]]

    rowData.forEach((item, index) => {
        tempArr.map(item2 => {
            if (item == item2.innerText) {
                row.appendChild(item2)
            }
        })
    })

    addEventListeners2();   
}

function fromStore2() {
    data = JSON.parse(localStorage.getItem('data2'))
}


function startDragBlock() {
    dragElem = this;
    this.classList.add('hide');
    if (this.closest('div').getAttribute('index') === null) {
        startIndex = this.closest('ul').getAttribute('index')
    } else  {
        startIndex = this.closest('div').getAttribute('index')
    }
}
function endDragBlock() {
    dragElem = null;
    this.classList.remove('hide');
}
function dragColOver(e) {
    e.preventDefault();
    this.classList.add('hover');
}
function dragColEnter(e) {
    e.preventDefault();
    this.classList.add('hover');
}
function dragColLeave() {
    this.classList.remove('hover');
}
function dropColBox() {
    this.append(dragElem);
    this.classList.remove('hover');
    let endIndex = this.getAttribute('index');

    refreshData(startIndex, endIndex);
}

function refreshData(s, e) {
    data[e].push(dragElem.innerText)
    data[s] = data[s].filter((i) => i !== dragElem.innerText)

    localStorage.setItem('data2', JSON.stringify(data))
}

let answerButton = document.querySelector('#check_button_1')
let reloadButton = document.querySelector('#check_button_2')
let nextButton = document.querySelector('#check_button_3')
reloadButton.addEventListener('click', function(){
    window.location.reload();
});


function checkAnwser2() {
    fromStore2();

    const convertedArr = Object.entries(data)

    convertedArr.map((item, index) => {
        item.splice(0, 1)
        item.map((item2, index2) => {
            const tempArr = item2.sort()
            correctAnwsers.map((item3, index3) => {
                const tempArr2 = item3.sort()
                const resCol = document.querySelectorAll(`.col-ul[index="${index3}"]`)
                resCol.forEach((el) => {
                    if (index === index3 && JSON.stringify(tempArr) === JSON.stringify(tempArr2)) {
                        el.parentElement.classList.remove('incorrect')
                        el.parentElement.classList.add('correct')
                        reloadButton.classList.remove('disabled_button')
                        nextButton.classList.remove('disabled_button')
                        answerButton.classList.add('disabled_button')
                    } else if (index === index3 && JSON.stringify(tempArr) !== JSON.stringify(tempArr2)) {
                        el.parentElement.classList.add('incorrect')
                        reloadButton.classList.remove('disabled_button')
                        nextButton.classList.remove('disabled_button')
                        answerButton.classList.add('disabled_button')
                    }
                })
            })
        })
    })
}

function refreshAnwser2() {
    const columns = document.querySelectorAll('.col')
    let lastKey;

    Array.prototype.diff = function(a) {
        return this.filter(function(i){return a.indexOf(i) < 0;});
    };
    
    for (key in data) {
        if (!data.hasOwnProperty(Number(key) + 1)) {
            lastKey = key
        } else {
            data[key] = []
        }
    }

    anwserArr2.diff(data[`${lastKey}`]).map((item) => {
        data[`${lastKey}`].push(item)
    })

    columns.forEach((item, index) => {
        if (item.querySelector('.item2') !== null) {
            row.append(item.querySelector('.item2'))
        }
    })

    localStorage.setItem('data2', JSON.stringify(data))
}

function addEventListeners2() {
    const items2 = document.querySelectorAll('.item2');
    const colms = document.querySelectorAll('.col-ul');

    items2.forEach((item) => {
        item.draggable = true;
        item.addEventListener('dragstart', startDragBlock);
        item.addEventListener('dragend', endDragBlock);
    });
    colms.forEach((col) => {
        col.addEventListener('dragover', dragColOver);
        col.addEventListener('dragenter', dragColEnter);
        col.addEventListener('dragleave', dragColLeave);
        col.addEventListener('drop', dropColBox);
    });
}