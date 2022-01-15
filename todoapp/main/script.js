//getting all required elements
const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todolist = document.querySelector(".todolist")
const deleteAllbtn = document.querySelector(".footer button")

// click the input section function run
inputBox.onkeyup = ()=>{
    let userData = inputBox.value;
    if(userData.trim() !=0){//if user values are not only space
        addBtn.classList.add("active");// add active class to button
    }else{
        addBtn.classList.remove("active");
    }
}

//if user to click on the add button
addBtn.onclick = ()=>{
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem('new todo'); // getting localstorage
    if(getLocalStorage == null){
        listArr = []
    }
    else{
        listArr=JSON.parse(getLocalStorage) // transforming  json string  into js object
    }

    listArr.push(userData) // push user data
    localStorage.setItem('new todo',JSON.stringify(listArr)); //transforming js object into json string
    showtasks() //call the function
}


function showtasks(){
    let getLocalStorage = localStorage.getItem('new todo'); // getting localstorage
    if(getLocalStorage == null){//if localstorge is null
        listArr = [];
    }
    else{
        listArr=JSON.parse(getLocalStorage) // transforming  json string  into js object
    }
    const pendingnumb=document.querySelector('.pandingnumber')
    pendingnumb.textContent=listArr.length;//passing length 
    if(listArr.length > 0){
        deleteAllbtn.classList.add("active");
    }else{
        deleteAllbtn.classList.remove("active");
    }

    tagli = '';
    listArr.forEach((element,index) => {
        tagli+=`<li>${element}<span onclick="deletetask(${index})"><i class="fas fa-trash"></i></span></li>`
        // add new li tag inside ul 
    });
    todolist.innerHTML=tagli
    inputBox.value="";
   
}

//delete task function
function deletetask(index){
    let getLocalStorage = localStorage.getItem('new todo');
    listArr=JSON.parse(getLocalStorage)
    listArr.splice(index,1);//delete or remove particular index
    //after remove the li again update the local storage
    localStorage.setItem('new todo',JSON.stringify(listArr))
    showtasks()
}

deleteAllbtn.onclick=()=>{
    listArr=[] //empty array
    //after delete all task the li again update the local storage
    localStorage.setItem('new todo',JSON.stringify(listArr))
    showtasks()
}