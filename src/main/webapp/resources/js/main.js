window.onload = function(){
    // XX();
    // YY();
    // RR();
    canv();
};

function check () {
    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
    let r = document.getElementById("r").value;

    return (y < 5 && y > -5)
        && (x < 5 && x > -5)
        && (r === 1 || r === 1.5 || r === 2 || r === 2.5 || r === 3);
}

// function RR () {
//     document.querySelectorAll("input[id=r]").forEach((but) => but.addEventListener("click", function () {
//         document.querySelector("input[id=r]").value = but.value
//     }));
// }
// function YY () {
//     document.querySelector("input[id=y]").addEventListener("input", function () {
//         document.querySelector("input[id=y]").value = document.querySelector("input[name=y_in]").value
//     });
// }
// function XX () {
//     document.querySelectorAll("input[id=x]").forEach((but) => but.addEventListener("click", function () {
//         document.querySelector("input[id=x]").value = but.value
//     }));
// }

function RR (r) {
    document.querySelector("div.r input").value = r;
}

function canv () {
    const can = document.querySelector("canvas");
    const r = (can.width+can.height)/25;
    can.addEventListener('click', function (event) {
        let xx = (event.pageX - can.offsetLeft - can.width/2)/r;
        let yy = -(event.pageY - can.offsetTop - can.height/2)/r;
        if(xx > 5 || xx < -5) {
            alert("x {" + xx + "} is out of range");
        }
        else {
            if (yy > 5 || yy < -5) {
                alert("y {" + yy + "} is out of range");
            }
            else {
                document.querySelector("div.x input").value = xx;
                document.querySelector("div.y input").value = yy;
                document.querySelector("div.r input").value = 1;
                document.querySelector("div.but input[type=submit]").click();
                // document.querySelector("div.r input").checked = true;
                // document.querySelector("div.but input[type=submit]").click();
                // document.querySelector("div.forma form").submit();
            }
        }
    });
}

function dott (arr) {
    document.querySelectorAll("tr[class=hover]").forEach(
        (row) => {
            let x = row.cells[0].innerHTML;
            let y = row.cells[1].innerHTML;
            let r = row.cells[2].innerHTML;
            let hit = row.cells[3].innerHTML;
            // alert(hit);
        row.addEventListener("mouseover", function () {
            darkDot(x, y, r, hit, arr);
        });
        row.addEventListener("mouseout", function () {
            lightDot(arr);
        });
    });
}
