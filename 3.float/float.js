let floatContainer = document.getElementById('floatContainer');
let floatInterval;
let stopSymbol = '\u200C';

markLineBreaks();

function markLineBreaks(){
    let imgHtml;
    const containerHtml = floatContainer.innerHTML.replace(/<img[^>]+?>/, (str)=>{
        imgHtml = str;
        return ' img ';
    });

    const words = containerHtml.split(' '); 
    const wordsWraped = [];
    const spanClass = 'detect-wrap';
    const lineBreakSymbol = stopSymbol;

    floatContainer.classList.add('invisible');
    
    for(let i=0; i<words.length; i++){
        if(words[i] === 'img'){
            wordsWraped.push('<span class="' + spanClass + '">' + imgHtml + '</span>');
        } else {
            wordsWraped.push('<span class="' + spanClass + '">' + words[i] + '</span>');
        }
    }
    
    
    floatContainer.innerHTML = wordsWraped.join(' ');

    const spans = [...floatContainer.querySelectorAll('.'+spanClass)];

    let offsetBase = spans[0].offsetTop;

    for(let i=0; i<spans.length; i++){
        // console.log(spans[i].offsetTop);        
        if(spans[i].offsetTop > offsetBase){
            // console.log(spans[i].offsetTop - offsetBase);
            spans.splice(i, 0, lineBreakSymbol);
            i++;
            offsetBase = spans[i].offsetTop;
        }
    }

    floatContainer.innerHTML = '';

    const wordsArray = spans.map((span)=>{
        // debugger;
        if(span !== lineBreakSymbol){
            return span.innerHTML;
        } else {
            return span;
        }
    })
    
    
    let joinedElements = wordsArray.join(' ');

    

    // console.log(joinedElements);

    floatContainer.innerHTML = joinedElements;

    floatContainer.classList.remove('invisible'); 
}


function doFloat(moveDirection = 'left'){
    let elements = floatContainer.innerHTML.split(/[<>]/gm);
    let floatImg = document.getElementById('floatImg');
    let symbolToMove;

    if(!elements[0] || !elements[2] || (elements[0][elements[0].length-1] === stopSymbol || elements[2][0] === stopSymbol)){
        clearInterval(floatInterval);
        setTimeout(() => {
            floatImg.classList.add(moveDirection === 'left' ? 'float-left' : 'float-right');
        }, 500);
        console.log('floated');
    } else {

        floatImg.classList.remove('float-left', 'float-right');
    
        if(moveDirection === 'left'){
            symbolToMove = elements[0].slice(-1);
            elements[0] = elements[0].slice(0, elements[0].length-1);
            elements[2] = symbolToMove + elements[2];
        }
        
        if(moveDirection === 'right'){
            symbolToMove = elements[2].slice(0,1);
            elements[2] = elements[2].slice(1);
            
            elements[0] = elements[0] + symbolToMove;
        }
        
        floatContainer.innerHTML = elements[0] + '<' + elements[1] + '>' + elements[2];
    }
}

function doFloatLeft(){
    doFloat('left');
}

function doFloatRight(){
    doFloat('right');
}



document.addEventListener('keypress', (e)=>{
    // 122(z) - left
    // 120(x) - right
    console.log(e.keyCode);
    
    
    if(e.keyCode === 97){
        clearInterval(floatInterval);
        floatInterval = setInterval(doFloatLeft, 25);
        console.log('left');
    }
    
    if(e.keyCode === 100){
        clearInterval(floatInterval);
        floatInterval = setInterval(doFloatRight, 25);
        console.log('right');
    }
    
    if(e.keyCode === 115){
        clearInterval(floatInterval);
        console.log('stop');
    }
    
});


