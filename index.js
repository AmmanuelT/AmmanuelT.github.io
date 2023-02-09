class Cell {

    constructor(x,y,symbol) {
        this.symbol = '';
        this.x = x;
        this.y = y;
        this.element = '';
        this.handler;
        this.above = [];
        this.left = [];
        this.invalidCount = 0;
    }

    getSymbol() {
        return this.symbol;
    }



    invalid(){
        this.invalidCount = this.invalidCount + 1;
        let cell = this.element;
        cell.removeEventListener('click', this.handler);
        cell.setAttribute('class', cell.getAttribute("class")+ " invalid");
        cell.symbol = '';
        cell.innerHTML = '';
        
    }
    
    valid(){
        this.invalidCount = this.invalidCount - 1;
        if(this.invalidCount <= 0){
            let cell = this.element;
            cell.setAttribute('class', 'cell ' + cell.getAttribute("class")[1]);
            cell.addEventListener('click', this.handler);
        }
        
    }

    invalidLeft(){
        for(let i = 0; i < this.left.length ; i ++){
            this.left[i].invalid();
        }
        
    }

    invalidTop(){
        for(let i = 0; i < this.above.length ; i ++){
            this.above[i].invalid();
        }
        
    }

    validLeft(){
        for(let i = 0; i < this.left.length ; i ++){
            this.left[i].valid();
            console.log(this.left[i]);
        }
        
    }

    validTop(){
        for(let i = 0; i < this.above.length ; i ++){
            this.above[i].valid();
        }
        
    }

    allValid(){
        for(let i = 0; i < this.above.length ; i ++){
            this.above[i].valid();
        }
        for(let i = 0; i < this.left.length ; i ++){
            this.left[i].valid();
        }
    }

    drawCell(){
        let obj = this;
        const tableau = document.getElementById('tableau');
        let cell = document.createElement('div');
        obj.element = cell;
        cell.setAttribute('class','cell');
        cell.setAttribute('symbol',this.symbol);
        cell.style.position = 'absolute'
        cell.style.top = (this.y+20)+ 'px';
        cell.style.left = (this.x+20)+'px';


        let alpha = document.createElement('div');
        alpha.setAttribute('id','alpha');
        alpha.innerHTML = 'α';
        alpha.setAttribute('class','button cell-option');
        

        let beta = document.createElement('div');
        alpha.setAttribute('id','beta');
        beta.innerHTML = 'β';
        beta.setAttribute('class','button cell-option');


        let empty = document.createElement('div');
        empty.setAttribute('id','empty');
        empty.setAttribute('class','button cell-option');


        let options = document.createElement('div');
        options.setAttribute('id','options');
        options.style.borderWidth = '0.1px'
        options.style.display = 'none';
    


        options.appendChild(alpha);
        options.appendChild(beta);
        options.appendChild(empty);


        tableau.appendChild(options)
        
        
        tableau.appendChild(cell);

        function handler(){

            options.style.display = 'block';
            options.style.position = 'absolute'
            options.style.top = cell.style.top;
            options.style.left = cell.style.left;
            options.style.zIndex = '2';
            options.style.width = '50px'
            options.style.alignItems = 'center'
            

            alpha.addEventListener('click', function(){
                    options.style.display = 'none';
                    if( obj.symbol == 'β'){
                        obj.validLeft();
                        console.log(obj.symbol);
                    }
                    if (obj.symbol != 'α'){
                    obj.invalidTop();
                    obj.symbol = 'α';
                    cell.innerHTML = '<div class="text"> α </div>';
                    cell.setAttribute('symbol','α');
                    }
            })

            beta.addEventListener('click', function(){
                    options.style.display = 'none';
                    if( obj.symbol == 'α'){
                        obj.validTop();
                        console.log(obj.symbol);
                    } 
                    if( obj.symboll != 'β'){
                    obj.invalidLeft();
                    obj.symbol = 'β';
                    cell.innerHTML = '<div class="text"> β </div>';
                    cell.setAttribute('symbol','β');
                    }
            })

            empty.addEventListener('click', function(){
                    options.style.display = 'none';
                    if( obj.symbol == 'α'){
                        obj.validTop();
                       
                    } else if (obj.symbol == 'β'){
                        obj.validLeft();
                    }
                    if(obj.symbol != ''){
                    cell.innerHTML = '<div class="text"> </div>';
                    cell.setAttribute('symbol','');
                    obj.symbol = '';
                    }
            })
        }
        this.handler = handler;
        cell.addEventListener('click', handler)
        
       
    }
  }

 

 let drawTable = function(n,d){
    const tableau = document.getElementById('tableau');
    tableau.style.width = `80vw`;
    tableau.style.height = `80vh`;
    const diagonal = new Array(n);
    let c = new Array(n+1);
    for(let i = 0 ; i <= n; i++ ){
        c[i] = new Array(i);
        for(let j = 0 ; j < i; j++){
            c[i][j]= new Cell((n * 50) - (i * 50), (j * 50));
            c[i][j].drawCell();
            c[i][j].element.setAttribute("class",c[i][j].element.getAttribute("class")+ ` diagonal${i-j}`)

            c[i][j].element.addEventListener('mouseover',function(e){
                document.getElementById('if').innerHTML = `<div class="info1">diagonal<br>${i-j}</div>`;
                document.getElementById('if2').innerHTML = `<div class="info1">position<br>[${n-i+1},${j+1}]</div>`;
                let di = document.querySelectorAll("."+e.target.getAttribute("class").split(" ")[1]);
                if(d){
                    di.forEach(element => {
                        element.style.backgroundColor = 'rgb(230,230,230)'
                    });
                }
                c[i][j].element.addEventListener('mouseout',function(e){
                    document.getElementById('if').innerHTML = '<div class="info1">diagonal</div><br>';
                    document.getElementById('if2').innerHTML = '<div class="info1">position</div><br>';
                    di.forEach(element => {
                        element.style.backgroundColor = '';
                    });
                    
                })
            })
        }
    }
    for(let i = 0 ; i <= n; i++ ){
        for(let j = 0 ; j < i; j++){
            for(let k = i + 1 ; k <= n ; k++){
                c[i][j].left.push(c[k][j]);
            }
            for(let k = j - 1 ; k >= 0 ; k--){
                c[i][j].above.push(c[i][k]);
            }
        }

    }
    return c;
 };

 function createTableau(){
    let size = document.getElementById('size');
    let diag = document.getElementById('diag');
    console.log('test')
    c = drawTable(size.value,diag.checked);
    document.getElementById('initial-prompt').style.display = 'none';
    document.getElementById('tool').style.display = 'block';
    document.getElementById('overal-container').style.display = 'block';
    document.getElementById('tableau').style.display = 'block';
    console.log(document.getElementById('latexBut'));
    document.getElementById('latexBut').addEventListener('click',function(){
        makeTable(size.value,c)
        
    })
    document.getElementById('clearTable').addEventListener('click',function(){
        clearTable(c,size.value);
    })
 }


 function makeTable(n,c) {
    size = n;
    let table = `\n \n \n \n \\setlength{\\unitlength}{.5cm} \n \\begin{center} \n \\begin{picture} (8,8)`;
    table += '\n \n %vertical lines'
    table += `\n\\put(0,0){\\line(0,1){${n}}} \n\\put(1,0){\\line(0,1){${n}}}`;

    for (let i = 1 ; i < n ; i++){
        table += `\n\\put(${i+1},${i}){\\line(0,1){${n - i}}}`
    }

    table += '\n \n %horizontal lines'
    table += `\n\\put(0,0){\\line(1,0){1}}`;

    for (let i = 2 ; i <= n ; i++){
        table += `\n\\put(0,${i-1}){\\line(1,0){${i}}}`
    }

    table += `\n\\put(0,${n}){\\line(1,0){${n}}}`

    let si= document.getElementById('size');
    let s = si.value;
    for(let i = 0 ; i <= n; i++ ){
        for(let j = 0 ; j < i; j++){
        console.log(c[i][j]);
        if(c[i][j].symbol){
            let si;
            switch(c[i][j].symbol) {
                case "α":
                    si = 'alpha';
                  break;
                case "β":
                    si = 'beta';
                  break;
                case "δ":
                    si = 'delta';
                  break;
                case "γ":
                    si = 'gamma';
                  break;
                  case "a":
                    si = 'alpha';
                  break;
                case "b":
                    si = 'beta';
                  break;
                case "d":
                    si = 'delta';
                  break;
                case "g":
                    si = 'gamma';
                  break;
                default:
                    c[i][j].symbol
              }
           table += `\n\\put(${s-i+.25}, ${s-j+.25-1}){$\\${si}$}`
        }
        }
    }
    

    table += `\n\n\n\\end{picture} \n\\end{center}`
    navigator.clipboard.writeText(table)
    alert("Copied latex to clipboard");
    return table;
}

function clearTable(c,n){
    for(let i = 0 ; i <= n; i++ ){
        for(let j = 0 ; j < i; j++){
            c[i][j].element.innerHTML = '<div class="text"> </div>';
            c[i][j].element.setAttribute('symbol','');
            c[i][j].symbol = '';
            c[i][j].valid();
        }
    
    }
}
