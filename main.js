const TaskNotification = document.querySelector("#TaskNotification")
const FinishNotification = document.querySelector("#FinishNotification")
const ListContainer = document.querySelector(".List-Container")
const DeleteButton = document.querySelector(".Delete-Button")
const InputList = document.querySelector(".Input-List")
const InputButton = document.querySelector(".Input-Button")

const KEY = "TODOLIST"


let StoreDate = [];

InputButton.addEventListener("click", () => {
    StoreDate.push({
        id: Date.now(),
        text: InputList.value,
        finish: false
    });
    InputList.value = '';
    SaveDate()
    Render()
    console.log("TEST 123")
})

function Render() {
    ListContainer.innerHTML = ''
    let Finish = 0;
    let Task = 0;

    StoreDate.forEach(data => {
    
        data.finish ? Finish ++ : Task ++ 

        const ListItem = document.createElement("div")
        const ListText = document.createElement("div")
        const Icon = document.createElement("img")

        Icon.onclick = () => DeleteList(data.id);

        ListItem.className = "List-Item"
        ListText.className = "List-Text"
        Icon.src = "./trash-solid.svg"
        Icon.className = "Icon"

        ListText.innerHTML = data.text

        ListItem.appendChild(ListText)
        ListItem.appendChild(Icon)
        ListContainer.appendChild(ListItem)

        if (data.finish) {
            ListItem.style.background = "var(--Primary-Color)"
            ListText.style.color = '#fff'
        }

        ListItem.onclick = () => {
            if (data.finish === false) {
                data.finish = true
                ListItem.style.background = "var(--Primary-Color)"
                ListText.style.color = '#fff'
            }
            else {
                data.finish = false
                ListItem.style.background = '#fff'
                ListText.style.color = "var(--Secondary-Color)"
            }
            SaveDate();
        }
    });

    FinishNotification.innerHTML = `Finish ${Finish}`; 
    TaskNotification.innerHTML = `Todos ${Task}`; 
}

function DeleteList(id) {
    StoreDate = StoreDate.filter(data => data.id !== id);
    SaveDate();
    Render();
}

function SaveDate() {
    localStorage.setItem(KEY, JSON.stringify(StoreDate))
    GetDate();
    Render();
}


function GetDate() {
    StoreDate = JSON.parse(localStorage.getItem(KEY));
}

GetDate();
Render();
