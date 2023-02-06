let size;
function makeTable(n) {
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

    for(let i = 0;i < s; i ++){
        for(let j = 0; j < s - i; j++){
        let val = document.getElementById(`${i}${j}`)
        console.log(val.value)
        if(val.value){
            let si;
            switch(val.value) {
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
                  si = val.value
              }
           table += `\n\\put(${j+.25}, ${s-i+.25-1}){$\\${si}$}`
        }
        }
    }
    

    table += `\n\n\n\\end{picture} \n\\end{center}`

    return table;
}
/**
let arrow = {'x': -0.25, 'y': 0.25};

function moveUp(){
    if ((arrow['y'] + 0.5) < size){
        arrow['y'] = arrow['y']+ 0.5;
    }
}

function moveLeft(){
    if ((arrow['x'] - 0.5) > -0.30){
        arrow['x'] = arrow['x'] - 0.5;
    }
}

function moveDown(){
    if ((arrow['y']-0.5) > Math.trunc(arrow['x'])){
        arrow['y'] = arrow['y'] - 0.5;
    }
}

function moveRight(){
    if ((arrow['x']+0.5) < Math.trunc(arrow['y'])){
        arrow['x'] = arrow['x']+0.5;
    }
}

function drawArrow(n) {
    let t = makeTable(n);
    t += `\\put(${arrow['x']}, ${arrow['y']}){$\\Rightarrow$}`
    t+= `\n\n\n\\end{picture} \n\\end{center}`
    console.log(t);
    return t;


}

let move
 */
async function drawLatex(n){
    if(document.getElementById('latex')){
        document.getElementById('latex').remove();
    }
    let table = makeTable(n);
    let l = document.createTextNode(table);
    let r = document.createElement('latex-js');
    r.setAttribute('id','latex');
    r.setAttribute('baseUrl',"https://cdn.jsdelivr.net/npm/latex.js/dist/");
    r.appendChild(l);
    console.log(r);
    document.getElementById('1').appendChild(r);


    let inp = document.createElement('input');
    inp.setAttribute('id','myInput');
    inp.setAttribute('type','text');
    inp.setAttribute('value',table);
    inp.style.width = "60vw";
    inp.style.overflow = "scroll";

    inp.style.overflow = 'break-word';
    inp.style.wordBreak = 'break-all';
    document.getElementById('1').appendChild(inp);
    document.getElementById('1').appendChild(document.createElement('br'))
    let res = document.createElement('span')
    res.innerHTML += 'Here is your latex table! Press on the button bellow to Copy the latex text!'
    res.style.marginBottom = '5px'
    document.getElementById('1').appendChild(res)
    
    let b = document.createElement('button');
    b.setAttribute('type','button');
    b.setAttribute('onclick','copyLatex()');
    document.getElementById('1').appendChild(document.createElement('br'))
    b.innerHTML += 'Copy Latex to Clipboard';
    document.getElementById('1').appendChild(b);
}

function makeTab(n){
    if(document.getElementById('table')){
    document.getElementById('table').remove();
    }
    let tab = document.createElement('form');
    tab.setAttribute('id','table')
    for( let i = 0 ; i < n ; i ++){
        let row = document.createElement('tr');
        row.style.padding = '0px'
        row.style.marginLeft = '30vw'
        row.style.lineHeight = '1px';
        
        

        for( let j = 0; j < n - i ; j ++){
            let cell = document.createElement('input');
            cell.setAttribute('type','text');
            cell.setAttribute('id',`${i}${j}`);
            cell.setAttribute('list','let')
            cell.setAttribute('border','solid 1px');
    


            let datalist = document.createElement('datalist');
            datalist.setAttribute('id','let');

            cell.appendChild(datalist);
            //alpha
            let alpha = document.createElement('option');
            alpha.innerHTML = '&alpha;';
            datalist.appendChild(alpha)
            //beta
            let beta = document.createElement('option');
            beta.innerHTML = '&beta;';
            datalist.appendChild(beta)
            //delta
            let delta = document.createElement('option');
            delta.innerHTML = '&delta;';
            datalist.appendChild(delta)
            //gamma
            let gamma = document.createElement('option');
            gamma.innerHTML = '&gamma;';
            datalist.appendChild(gamma)
            cell.style.borderWidth = '3px';
            cell.style.width = '3vw'
            row.appendChild(cell);
        }
        tab.appendChild(row);
        tab.appendChild(document.createElement('br'));
    }

    document.getElementById('2').style.marginTop = '4vh';
    document.getElementById('2').appendChild(tab);

    let submit = document.createElement('button');
    submit.style.marginLeft = '-50vw'
    submit.innerHTML += 'Get Latex';
    tab.appendChild(submit)
    tab.appendChild(document.createElement('br'));
    submit.setAttribute('type','button');
    submit.setAttribute('onclick',"lat()");
    let desc = document.createElement('span');
    desc.style.marginLeft = '-50vw';
    desc.innerHTML = 'Enter values using Dropdown or use a for Alpha, b for Beta, d for delta or g for Gamma'
    tab.appendChild(desc)
    
}

function c(){
    let size = document.getElementById('size');
    makeTab(size.value)
}

function lat(){
    let size = document.getElementById('size');
    drawLatex(size.value);
}

function copyLatex(){
        // Get the text field
        var copyText = document.getElementById("myInput");
      
        // Select the text field
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices
      
         // Copy the text inside the text field
        navigator.clipboard.writeText(copyText.value);
      
        // Alert the copied text
        alert("Copied the text: " + copyText.value);
}

