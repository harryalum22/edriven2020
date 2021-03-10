function harry(){
    var quantity1, quantity2, quantity3, quantity4, quantity5;
    quantity1 = document.getElementById("quantity1").value;
    quantity2 = parseInt(quantity1) * 0.12;
    quantity3 = parseInt(quantity2) + parseInt(quantity1);
    quantity4 = quantity3;
    quantity5 = parseInt(quantity4) - parseInt(quantity3);

    if(quantity1 >= 100 && quantity1 <= 10000){
        document.getElementById("quantity2").value = quantity2.toFixed(2);
        document.getElementById("quantity3").value = quantity3.toFixed(2);
        document.getElementById("quantity4").value = quantity4.toFixed(2);
        document.getElementById("quantity4").disabled = false;
        document.getElementById("quantity4").min = quantity3.toFixed(2);
        document.getElementById("quantity5").value = quantity5.toFixed(2);
        btn2.style.backgroundColor = "#90EE90";
        btn2.disabled = false;
       }
    else{
        document.getElementById("quantity2").value = "";
        document.getElementById("quantity3").value = "";
        document.getElementById("quantity4").value = "";
        document.getElementById("quantity4").disabled = true;
        document.getElementById("quantity4").min = "";
        document.getElementById("quantity5").value = "";
        btn2.style.backgroundColor = "#800000";
        btn2.disabled = true;
    }
}

function payment(){
    var quantity3,quantity4,quantity5;
    quantity3 = document.getElementById("quantity3").value;
    quantity4 = document.getElementById("quantity4").value;
    quantity5 = parseInt(quantity4) - parseInt(quantity3);
    document.getElementById("quantity5").value = quantity5.toFixed(2);
    if(quantity5 >= 0){
        btn2.style.backgroundColor = "#90EE90";
        btn2.disabled = false;
    }else{
        btn2.style.backgroundColor = "#800000";
        btn2.disabled = true;
    }
}