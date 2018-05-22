
//global variables
const formElement = document.getElementsByTagName("form")[0];
const formInputElement = formElement.getElementsByTagName("input")[0];
const mainContainer = document.getElementsByClassName("container")[0];
let secondTimes = 0 ,  tempCount =0 , tempCount2 = 0;


// all the stuff related to app
class TodoApp{
    

    callForParent(reqClass){
        if(reqClass === "first"){
            return document.getElementsByClassName("task--parent--container")[0];
        }
        else if(reqClass === "second"){
            return document.getElementsByClassName("task--completed--container")[0];
        }
        
    }

    createULElement(element){
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        let p = document.createElement("p");

        if(element === "first"){
            p.innerText = "Tasks you've to do..";
            ul.setAttribute("class","task--parent--container");
        }
        else if(element === "second"){
            p.innerText = "Tasks you've completed...";
            ul.setAttribute("class","task--completed--container");
        }
        li.appendChild(p);
        ul.appendChild(li);
        mainContainer.appendChild(ul);
    }

    addItem(item){
        
        //li element
        let li =  document.createElement("li");
        li.setAttribute("class","task--li");
        li.setAttribute("onclick","tasks.doStuff(event,this)");
        
        //creating an input panel to store the task
        let in_panel = document.createElement("input");
        in_panel.setAttribute("type","text");
        in_panel.setAttribute("value",item);
        in_panel.setAttribute("oninput","tasks.editText(this)");

        //appending the text to li
        li.appendChild(in_panel);

        //task complete icon
        let completeSpan = document.createElement("span");
        completeSpan.setAttribute("class","complete--span");
        let i1 = document.createElement("i");
        i1.setAttribute("class","fa fa-check");
        completeSpan.appendChild(i1);

        //task delete span
        let deleteSpan = document.createElement("span");
        deleteSpan.setAttribute("class","delete--span");
        let i2 = document.createElement("i");
        i2.setAttribute("class","fa fa-trash");
        deleteSpan.appendChild(i2);

        //edit icon
        let editSpan = document.createElement("span");
        editSpan.setAttribute("class","edit--span");
        let i3 = document.createElement("i");
        i3.setAttribute("class","fa fa-pencil");
        editSpan.appendChild(i3);

        //appending all icons in the the list item

        li.appendChild(deleteSpan);
        li.appendChild(completeSpan);
        li.appendChild(editSpan);

        //appending task li to the parent container
        
        let parent = this.callForParent("first");
        parent.appendChild(li);
        
        //all the default message stuff
        this.defaultMessage();

    }

    doStuff(event,that){

        let completedCon = document.createElement("div");
        completedCon.setAttribute("class","completed");
        let clickedElement;

        if(event.target.nodeName === "SPAN" || event.target.nodeName === "I"){
            
            // the span and icon story 
            if(event.target.nodeName === "I"){
                clickedElement = event.target.parentNode;
            }
            else{
                clickedElement = event.target;
            }

            //checking that which button user clicks i.e (completed or delete or edit)
            let onGoingTaskParent, completedTaskParent,i;
            onGoingTaskParent = this.callForParent("first");
            completedTaskParent = this.callForParent("second");
            
            //stuff for the completed task button
            if(clickedElement.classList.contains("complete--span")){
                
                if(that.lastChild.nodeName !== "DIV"){

                    for(i=0 ; i<onGoingTaskParent.childElementCount ; i++){
                        if(onGoingTaskParent.childNodes[i] === that){
                            onGoingTaskParent.removeChild(onGoingTaskParent.childNodes[i]);
                            completedTaskParent.appendChild(that);
                            that.getElementsByTagName("input")[0].setAttribute("disabled","disabled");
                            that.appendChild(completedCon);
                            break;
                        }
                    }

                }
                
                else if(that.lastChild.nodeName === "DIV"){
                    
                    for(i=0 ; i<completedTaskParent.childElementCount ; i++){
                        if(completedTaskParent.childNodes[i] === that){
                            completedTaskParent.removeChild(completedTaskParent.childNodes[i]);
                            that.getElementsByTagName("input")[0].removeAttribute("disabled");
                            onGoingTaskParent.appendChild(that);
                            that.removeChild(that.lastChild);
                            break;
                        }
                    }
                }

            }

            //stuff for deleting the element

            else if(clickedElement.classList.contains("delete--span")){
                
                let liParent = that.parentNode;
                
                for(let i=0  ; i<liParent.childElementCount ; i++ ){
                    
                    if(event.currentTarget == liParent.childNodes[i]){
                        liParent.removeChild(liParent.childNodes[i]);
                        break;
                    }
                }                

            }

            //stuff for editing the text

            else if(clickedElement.classList.contains("edit--span")){
                let in_elem = that.getElementsByTagName("input")[0];
                in_elem.select();
                if(that.parentNode.classList.contains("task--completed--container")){
                    alert("You can't edit a completed task...");
                }
            }

        }

        //all the stuff related to the default message

        this.defaultMessage();

        
    }

    editText(that){
        that.setAttribute("value",that.value);
    }

    defaultMessage(){
        let li, firstContainer , secondContainer;

        firstContainer = this.callForParent("first");
        secondContainer = this.callForParent("second");
        
        //showing message when the container is empty

        if(firstContainer.childElementCount <= 1){
            li = document.createElement("li");
            li.innerText = "Please add some tasks...";
            firstContainer.appendChild(li);
            tempCount = 0 ;
        }

        if(secondContainer.childElementCount <= 1){
            li = document.createElement("li");
            li.innerText = "No completed tasks to show...";
            secondContainer.appendChild(li);
            tempCount2 = 0;
        }

        //removing the message when there are tasks in the container

        if(firstContainer.childElementCount > 2 && tempCount == 0 ){
            firstContainer.removeChild(firstContainer.childNodes[1]);
            tempCount++;
        }
        
        if(secondContainer.childElementCount > 2 && tempCount2 ==0){
            secondContainer.removeChild(secondContainer.childNodes[1]);
            tempCount2++;
        }

    } 
   
}


//creating instance of class
let tasks = new TodoApp();


window.addEventListener("load",function(){
    tasks.createULElement("first");
    tasks.createULElement("second");
    tasks.defaultMessage();
});


formElement.addEventListener("submit",function(e){
    
    e.preventDefault();

    if(formInputElement.value.length > 0){
        let inputtedTask = formInputElement.value;
        formInputElement.value = "";
        tasks.addItem(inputtedTask);
    }
    else{
        alert("make sure that you've added a task!");
    }

});