const mainColor = "rgb(224,224,224)";
const d_mainColor = "rgb(107,107,107)";
const hitColor = "rgb(119,255,40)"
const d_hitColor = "rgb(42,107,0)"
const missColor = "rgb(253,72,72)"
const d_missColor = "rgb(126,0,0)"
const graphColor = "rgba(255,255,255,0.5)";
const d_graphColor = "rgba(80,80,80,0.5)";

function draw(arr, r) {
    const canvas = document.getElementById("canvas");
    const scale = ~~(Math.sqrt((canvas.width**2 + canvas.height**2)/2)/r)-1;
    const center = new Point(canvas.width/2, canvas.height/2);
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        axis(ctx, center, scale, r, mainColor);
        area (ctx, center, r, graphColor);
        dots(ctx, center, r, arr, hitColor, missColor, mainColor);
    }
}

function darkDot (dx, dy, dr, hit, arr) {
    const canvas = document.getElementById("canvas");
    const r = (canvas.width+canvas.height)/25;
    const scale = ~~(Math.sqrt((canvas.width**2 + canvas.height**2)/2)/r)-1;
    const center = new Point(canvas.width/2, canvas.height/2);

    let dotColor = missColor;
    if (hit === "true") {
        dotColor = hitColor;
    }
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        axis(ctx, center, scale, r, d_mainColor);
        area (ctx, center, r, d_graphColor);
        dots(ctx, center, r, arr, d_hitColor, d_missColor, d_mainColor);
        dot(ctx, convert( dx, dy, dr, hit, center, r), mainColor, dotColor);
    }
}
function lightDot (arr) {
    const canvas = document.getElementById("canvas");
    const r = (canvas.width+canvas.height)/25;
    draw(arr, r);
}
function dots (ctx, center, r, arr, hitColor, missColor, borderColor) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].hit === true) {
            dot(ctx, convert( arr[i].x, arr[i].y, arr[i].r, arr[i].hit, center, r), borderColor, hitColor);
        }
        else {
            dot(ctx, convert( arr[i].x, arr[i].y, arr[i].r, arr[i].hit, center, r), borderColor, missColor);
        }
    }
}
function area (ctx, center, r, color) {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.lineTo(center.x, center.y + r);
    ctx.lineTo(center.x - r/2, center.y + r);
    ctx.lineTo(center.x - r/2, center.y);
    ctx.arc(center.x, center.y, r, -Math.PI, -Math.PI/2, false);
    ctx.lineTo(center.x, center.y - r);
    ctx.lineTo(center.x + r, center.y);
    ctx.lineTo(center.x, center.y);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

class Point {
    x;
    y;
    hit;
    constructor(x, y, hit) {
        this.x = x;
        this.y = y;
        this.hit = hit;
    }
}

function axis (ctx, center, scale, r, color) {
    ctx.fillStyle = color;
    ctx.fillRect(center.x - (scale/2)*r, center.y, scale*r, 1);
    ctx.fillRect(center.x, center.y - (scale/2)*r, 1, scale*r);

    ctx.beginPath();
    // ctx.lineWidth = 1.5;
    ctx.moveTo(center.x+(scale/2)*r*0.95, center.y-center.y/45);
    ctx.lineTo(center.x+(scale/2)*r, center.y+0.5);
    ctx.lineTo(center.x+(scale/2)*r*0.95, center.y+center.y/40);

    ctx.moveTo(center.x-center.x/45, center.y - (scale/2)*r*0.95);
    ctx.lineTo(center.x+0.5, center.y - (scale/2)*r);
    ctx.lineTo(center.x+center.x/45, center.y - (scale/2)*r*0.95);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.font = "15px serif";
    ctx.fillText("x", center.x+(scale/2)*r, center.y+center.y/15);
    ctx.fillText("y", center.x-center.x/15, center.y - (scale/2)*r);
    ctx.stroke();
    ctx.closePath();

    for (let i = 1; i <= scale-1; i++) {
        mark_v(ctx, new Point(center.x+i*r/2, center.y), i/2+"R", color);
        mark_v(ctx, new Point(center.x-i*r/2, center.y), "-"+i/2+"R", color);
        mark_h(ctx, new Point(center.x, center.y-i*r/2), i/2+"R", color);
        mark_h(ctx, new Point(center.x, center.y+i*r/2), "-"+i/2+"R", color);
    }

}

function mark_v (ctx, p, t, color) {
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x, p.y+p.y/50);
    ctx.lineTo(p.x, p.y-p.y/50);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.font = "12px serif";
    ctx.fillText(t, p.x, p.y - p.y/40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function mark_h (ctx, p, t, color) {
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(p.x+p.x/50, p.y);
    ctx.lineTo(p.x-p.x/50, p.y);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.font = "12px serif";
    ctx.fillText(t, p.x + p.x/40, p.y - p.y/40);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function dot (ctx, p, borderColor, color) {
    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.arc(p.x, p.y, 4, 0, 2*Math.PI, true);
    ctx.strokeStyle = borderColor;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function convert (u_x, u_y, u_r, hit, center, r) {
    console.log(((u_x/u_r)*r + center.x) + "   " + ((-u_y/u_r)*r + center.y));
    return new Point((u_x/u_r)*r + center.x, (-u_y/u_r)*r + center.y, hit);
}