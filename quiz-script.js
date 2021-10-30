
// QUIZ SCREEN

const question = document.querySelector("#question")
const tracker = document.querySelector("#tracker")
const timer = document.querySelector("#timer")
const nextBtn = document.querySelector("#next-btn")

const masterContainer = document.querySelector("#container")
const container = document.querySelector("#quiz-container")
const title = document.querySelector("#title")

const optionsOutput = Array.from(document.querySelectorAll(".option"))

const arrayOfQuestions = ["When did Germany Invade Poland?", "Which were the three Axis forces?", "Codename for german invasion of USSR was: ", "What was Operation Typhoon?", "What is the name of most famous USSR tank?", "When did Japan attack Pearl Harbor?", "From which battle is the background image of this website?", "How many beaches were stormed by the allies on D-Day?", "When did Germany surrender?", "Which cities were nuked in August 1945?"]

const arrayOfAnswers = [["Oct 2, 1939", "Dec 7, 1941", "Sep 1, 1939", "Nov 17, 1942"], ["Japan, Nazi Germany, Fascist Italy", "Nazi Germany, Japan, USSR", "Nazi Germany, USSR, USA", "United Kingdom, Nazi Germany, Hungary"], ["D-Day", "Operation Weserübung", "Operation Barbarossa", "Operation Typhoon"], ["German assault on Smolensk", "German assault on Moscow", "German assault on Stalingrad", "German assault on Leningrad"], ["Tiger I", "T-80", "Tiger II", "T-34"], ["Dec 7, 1941", "Oct 28, 1940", "Jan 3, 1944", "Aug 23, 1944"], ["Battle of Wake Island", "Battle of Okinawa", "Battle of Iwo Jima", "Battle of Guam"], ["4", "12", "7", "5"], ["May 8, 1945",  "May 5, 1945", "Aug 15, 1945", "Sep 2, 1945"], ["Berlin and Hiroshima", "Hiroshima and Nagasaki", "Tokyo and Osaka", "Hiroshima and Frankfurt"]]

const rightAnswers = ["Sep 1, 1939", "Japan, Nazi Germany, Fascist Italy", "Operation Barbarossa", "German assault on Moscow", "T-34", "Dec 7, 1941", "Battle of Iwo Jima", "5", "May 8, 1945", "Hiroshima and Nagasaki"]

let userAnswers = []; // Odgovori uporabnika
let numberOfAnswer = [] // Zap. št. odgovorov

let counter = 0;
function loadQuestion(){ // Naloži novo vprašanje
    // Ne moreš klikniti na "next"
    //nextBtn.removeEventListener("click", evaluate)

    if(counter == 9){
        nextBtn.innerHTML = "End"
    }
    tracker.innerHTML = counter + 1 + "/10" 
    question.innerHTML = arrayOfQuestions[counter];
    for(let i = 0; i < optionsOutput.length; i++){
        optionsOutput[i].innerHTML = arrayOfAnswers[counter][i];
        optionsOutput[i].style.backgroundColor = "#001a05"
    }
}
loadQuestion() // Prvič kliče funkcijo

// Omogoči klikanje gumbov
for(let i = 0; i < optionsOutput.length; i++){
    optionsOutput[i].addEventListener("click", evaluate)
} 

let answer;
function evaluate(e){
    answer = e.target.innerHTML;
    e.target.style.backgroundColor = "#22933B";
    for(let i = 0; i < optionsOutput.length; i++){
        // Modro se obarva le e.target, ostali nazaj na osnovno barvo
        if(optionsOutput[i] != e.target){
            optionsOutput[i].style.backgroundColor = "#001a05"
        }
        // Vpiši zaporedno številko odgovora v array
        if(optionsOutput[i] == e.target){
            numberOfAnswer.push(i + 1)
        }
    }
    nextBtn.addEventListener("click", submitAnswer)
    //nextBtn.addEventListener("click", loadQuestion)
}

function submitAnswer(){
    counter++;
    userAnswers.push(answer)
    console.log(userAnswers)
    nextBtn.removeEventListener("click", submitAnswer)
    if(counter < 10){
        loadQuestion();
    } else {
        updateScreen();
    }
}

// RESULTS SCREEN

const endWindow = document.querySelector("#endWindow")
const yesBtn = document.querySelector("#yes")
const noBtn = document.querySelector("#no")

function updateScreen(){
    container.remove()
    tracker.remove()
    title.remove()
    endWindow.style.display = "block" // 
    endWindow.classList.add("animate")
}

let show_results_yes = false;
yesBtn.addEventListener("click", showResults)
noBtn.addEventListener("click", resetQuiz);

let numOfRightAnswers = 0; numOfWrongAnswers = 0;
function showResults(){
    show_results_yes = true;
    //endWindow.remove()
    endWindow.style.display = "none";
    for(let i = 0; i < rightAnswers.length; i++){
        if(userAnswers[i] == rightAnswers[i]){
            numOfRightAnswers++;
        } else {
            numOfWrongAnswers++;
        }
        makeResult()
    }
    displayResults()
}

let arrayOfItems = []
let wrong_right_answer_container;

let itemCounter = 0;
function makeResult(){

    // MAKE ITEM
    let item = document.createElement("div")
    item.classList.add("item")
    
    let para1 = document.createElement("p")
    let para1TextNode = document.createTextNode((itemCounter + 1) + ". " + arrayOfQuestions[itemCounter])
    para1.appendChild(para1TextNode)
    para1.classList.add("itemQuestion")

    let rightAns = document.createElement("p");
    let userAns = document.createElement("p");

    let rightAnsNode;
    let userAnsNode;
    let rightAnswer = "", userAnswer = "";
    for(let i = 0; i < optionsOutput.length; i++){
        if(arrayOfAnswers[itemCounter][i] == rightAnswers[itemCounter]){
            rightAnswer = arrayOfAnswers[itemCounter][i]
            rightAnsNode = document.createTextNode("Right answer: " + (i + 1).toString() + ". " + rightAnswer);
        }
    }
    for(let i = 0; i < rightAnswers.length; i++){
        userAnswer = userAnswers[itemCounter]
        userAnsNode = document.createTextNode("Your answer: " + (numberOfAnswer[itemCounter + 1]) + ". " + userAnswer);
    }

    rightAns.appendChild(rightAnsNode)
    rightAns.classList.add("itemPart")

    userAns.appendChild(userAnsNode)
    userAns.classList.add("itemYourAnswer")

    if(rightAnswer == userAnswer){
        item.classList.add("green")
    } else {
        item.classList.add("red")
    }
   
    item.appendChild(para1)
    item.appendChild(rightAns)
    item.appendChild(userAns)

    arrayOfItems.push(item)

    itemCounter++;
    
}

let resultsPara, resetBtn;
function displayResults(){
    // MAKE CONTAINER 
    wrong_right_answer_container = document.createElement("div");

    resultsPara = document.createElement("p")
    let resultsNode = document.createTextNode("Results")
    resultsPara.appendChild(resultsNode)
    resultsPara.classList.add("results")

    let right_answer_para = document.createElement("p")
    let wrong_answer_para = document.createElement("p")
    right_answer_para.classList.add("right-wrong")
    wrong_answer_para.classList.add("right-wrong")

    let right_answer_para_node = document.createTextNode("Correct: " + numOfRightAnswers.toString())
    let wrong_answer_para_node = document.createTextNode("Wrong: " + numOfWrongAnswers.toString())

    right_answer_para.appendChild(right_answer_para_node)
    wrong_answer_para.appendChild(wrong_answer_para_node)

    wrong_right_answer_container.appendChild(right_answer_para)
    wrong_right_answer_container.appendChild(wrong_answer_para)

    wrong_right_answer_container.classList.add("counter-container")

    console.log(arrayOfItems)
    masterContainer.appendChild(resultsPara)
    masterContainer.appendChild(wrong_right_answer_container)

    // WRITE RECORDS ON DISPLAY
    for(let i = 0; i < arrayOfItems.length; i++){
        masterContainer.appendChild(arrayOfItems[i])
    }
    // MAKE RESET BUTTON
    resetBtn = document.createElement("button");
    let resetBtnNode = document.createTextNode("Try Again")
    resetBtn.appendChild(resetBtnNode);
    resetBtn.classList.add("button")
    resetBtn.classList.add("black")

    masterContainer.appendChild(resetBtn);
    resetBtn.addEventListener("click", resetQuiz)
}

function resetQuiz(){
    if(show_results_yes){
        resultsPara.remove()
        wrong_right_answer_container.remove();
        for(let i = 0; i < arrayOfItems.length; i++){
            arrayOfItems[i].remove()
        }
        show_results_yes = false;
        resetBtn.remove();
    }

    masterContainer.appendChild(title)
    masterContainer.appendChild(tracker)
    masterContainer.appendChild(container)

    endWindow.style.display = "none";
    userAnswers.length = 0;
    numberOfAnswer.length = 0;
    arrayOfItems.length = 0;
    itemCounter = 0;
    counter = 0;
    numOfRightAnswers = 0;
    numOfWrongAnswers = 0;
    wrong_right_answer_container = undefined;
    nextBtn.innerHTML = "Next"

    loadQuestion()
}

