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
        cell.setAttribute('class', 'cell invalid');
        cell.symbol = '';
        cell.innerHTML = '';
        
    }
    
    valid(){
        
        if(this.invalidCount == 0){
            let cell = this.element;
            cell.setAttribute('class', 'cell');
            cell.addEventListener('click', this.handler);
        }
        this.invalidCount = this.invalidCount - 1;
    }

    invalidLeft(){
        for(let i = 0; i < this.above.length ; i ++){
            this.above[i].valid();
        }
        for(let i = 0; i < this.left.length ; i ++){
            this.left[i].invalid();
        }
        
    }

    invalidTop(){
        for(let i = 0; i < this.left.length ; i ++){
            this.left[i].valid();
        }
        for(let i = 0; i < this.above.length ; i ++){
            this.above[i].invalid();
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
        cell.style.top = (this.y + 100 )+ 'px';
        cell.style.left = (this.x + 100 )+'px';


        let alpha = document.createElement('div');
        alpha.setAttribute('id','alpha');
        alpha.innerHTML = 'α';
        alpha.setAttribute('class','button');


        let beta = document.createElement('div');
        alpha.setAttribute('id','beta');
        beta.innerHTML = 'β';
        beta.setAttribute('class','button');


        let empty = document.createElement('div');
        empty.setAttribute('id','empty');
        empty.setAttribute('class','button');


        let options = document.createElement('div');
        options.setAttribute('id','options');
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
            

            alpha.addEventListener('click', function(){
                    options.style.display = 'none';
                    cell.innerHTML = '<div class="text"> α </div>';
                    cell.setAttribute('symbol','α');
                    obj.symbol = 'α';
                    obj.invalidTop();
            })

            beta.addEventListener('click', function(){
                    options.style.display = 'none';
                    cell.innerHTML = '<div class="text"> β </div>';
                    cell.setAttribute('symbol','β');
                    obj.symbol = 'β';
                    obj.invalidLeft();
            })

            empty.addEventListener('click', function(){
                    options.style.display = 'none';
                    cell.innerHTML = '<div class="text"> </div>';
                    cell.setAttribute('symbol','');
                    obj.symbol = '';
                    obj.allValid();
            })
        }
        this.handler = handler;
        cell.addEventListener('click', handler)
        
       
    }
  }

 

 let drawTable = function(n){
    let c = new Array(n+1);
    for(let i = 0 ; i <= n; i++ ){
        c[i] = new Array(i);
        for(let j = 0 ; j < i; j++){
            c[i][j]= new Cell((n * 50) - (i * 50), (j * 50));
            c[i][j].drawCell();
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
    console.log(c)
    return c;
 };

 function createTableau(){
    let size = document.getElementById('size');
    drawTable(size.value);
    document.getElementById('initial-prompt').style.display = 'none';
 }
