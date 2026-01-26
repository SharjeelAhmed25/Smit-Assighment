var expression = "";

var exp = document.getElementById("exp");
var result = document.getElementById("result");

function calculator(value) {

    
    if (value === 'C') {
      
         expression = "";
        exp.innerText = "";
        result.innerText = "0";
      
        return;
    
    
}
    if (value === 'DEL') {
        expression = expression.slice(0, -1);
        exp.innerText = expression;
        return;
    }

    if (value === '=') {
        if(expression === "") {
            result.innerText = "0";
            return;
        }

        var finalExp = "";
        for (var i = 0; i < expression.length; i++) {
            if (expression[i] === 'x') {
                finalExp += '*';
            } else {
                finalExp += expression[i];
            }
        }

        var answer = eval(finalExp);
        result.innerText = answer;
        return;
    }

  
    expression += value;
    exp.innerText = expression;
    return;
}



