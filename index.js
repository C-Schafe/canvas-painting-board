let canvas = document.getElementById('canvas');
let eraser = document.getElementById('eraser');
let pencil = document.getElementById('pencil');
let pen = document.getElementById('pen');
let clear = document.getElementById('clear');
let brush = document.getElementById('brush');
let save = document.getElementById('save');
let palette = document.getElementById('palette');
let ctx = canvas.getContext('2d');
let using = false
let lastPoint = {}
let eraserEnabled = false
let lineColor = "black"
let lineWidth = 3
let xxx = 3
let yyy = 30
let eraserColor = '#fff'

setCanvasSize()
autoSetCanvasSize()
listenToActions()

//检测是否是移动设备
if('ontouchstart' in document.body){
    listenToTouch()
}else{
    listenToMouse()
}

/*设置色板背景色*/
palette.onclick = function(){
    let y = document.createElement('input')
    console.log(y);
    canvas.appendChild(y)
    y.setAttribute('type','color')
    y.addEventListener('change',function(){
        lineColor = y.value
        console.log(lineColor);
        let palette = document.getElementsByClassName("palette2")
        console.log(palette);
        palette[0].style.fill = lineColor
    })
    y.click()
}




/*功能函数*/
function drawCircle(x,y){
    ctx.beginPath()
    ctx.arc(x,y,lineWidth/2,0,Math.PI*2)
    ctx.fill()
}
function drawLine(x1,y1,x2,y2,lineColor){
    ctx.strokeStyle = lineColor
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2,y2)
    ctx.stroke()
    ctx.closePath()
}
function setCanvasSize(){
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
    ctx.fillStyle= eraserColor;
    ctx.fillRect(0,0,pageWidth,pageHeight);
}
function autoSetCanvasSize(){
    window.onresize = ()=>{
        setCanvasSize()
    }
}
function listenToActions(){
    pencil.onclick = ()=>{
        eraserEnabled = false
        lineWidth = 3
        canvas.className = 'pencil'
        pen.classList.remove('active')
        eraser.classList.remove('active')
        pencil.classList.add('active')
        brush.classList.remove('active')
    }
    pen.onclick = ()=>{
        eraserEnabled = false
        lineWidth = 5
        canvas.className = 'pen'
        pen.classList.add('active')
        eraser.classList.remove('active')
        pencil.classList.remove('active')
        brush.classList.remove('active')
    }
    brush.onclick = ()=>{
        eraserEnabled = false
        lineWidth = 15
        canvas.className = 'brush'
        brush.classList.add('active')
        pen.classList.remove('active')
        eraser.classList.remove('active')
        pencil.classList.remove('active')
    }
    eraser.onclick = function(e){
        eraserEnabled = true
        lineWidth = 20
        canvas.className = 'eraser'
        brush.classList.remove('active')
        pen.classList.remove('active')
        eraser.classList.add('active')
        pencil.classList.remove('active')

    }
    clear.onclick = ()=>{
        setCanvasSize()
        if('ontouchstart' in document.body){
            listenToTouch()
        }else{
            listenToMouse()
        }
    }
    save.onclick = ()=>{
        let url = canvas.toDataURL('image/png')
        let a = document.createElement('a')
        a.href = url
        a.download = "my picture"
        a.target = '_blank'
        a.click()
    }
}
function listenToMouse(){
    canvas.onmousedown = (e)=>{
        let x = e.clientX + xxx
        let y = e.clientY + yyy
        using = true
        if(eraserEnabled){
            ctx.fillStyle= eraserColor;
            drawCircle(x,y,20,Math.PI*2)
            lastPoint = {x,y}
        }else{
            ctx.fillStyle= lineColor;
            drawCircle(x,y)
            lastPoint = {x,y}
        }
    }
    canvas.onmousemove = (e)=>{
        let x = e.clientX + xxx
        let y = e.clientY + yyy
        if(!using){return}
        if(eraserEnabled){
            ctx.fillStyle= eraserColor;
            let newPoint = {x,y}
            drawCircle(x,y,20,Math.PI*2)
            drawLine(lastPoint.x,lastPoint.y,x,y, eraserColor)
            lastPoint = newPoint
        }else{
            let newPoint = {x,y}
            drawCircle(x,y)
            drawLine(lastPoint.x,lastPoint.y,x,y,lineColor)
            lastPoint = newPoint
        }
    }
    canvas.onmouseup = (e)=>{
        using = false
    }
}
function listenToTouch(){
    canvas.ontouchstart = (e)=>{
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        using = true
        if(eraserEnabled){
            ctx.fillStyle="#ffe8bd";
            drawCircle(x,y,20,Math.PI*2)
            lastPoint = {x,y}
        }else{
            ctx.fillStyle= lineColor;
            drawCircle(x,y)
            lastPoint = {x,y}
        }
    }
    canvas.ontouchmove = (e)=>{
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if(!using){return}
        if(eraserEnabled){
            ctx.fillStyle="#ffe8bd";
            let newPoint = {x,y}
            drawCircle(x,y,20,Math.PI*2)
            drawLine(lastPoint.x,lastPoint.y,x,y,"#ffe8bd")
            lastPoint = newPoint
        }else{
            let newPoint = {x,y}
            drawCircle(x,y)
            drawLine(lastPoint.x,lastPoint.y,x,y,lineColor)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend = (e)=>{
        using = false
    }
}
// function listenToTouch(){
//     canvas.ontouchstart = (e)=>{
//         let x = e.touches[0].clientX
//         let y = e.touches[0].clientY
//         using = true
//         if(eraserEnabled){
//             ctx.clearRect(x,y,10,10)
//         }else{
//             drawCircle(x,y)
//             lastPoint = {x,y}
//         }
//     }
//     canvas.ontouchmove = (e)=>{
//         let x = e.touches[0].clientX
//         let y = e.touches[0].clientY
//         if(!using){return}
//         if(eraserEnabled){
//             ctx.clearRect(x,y,10,10)
//         }else{
//             let newPoint = {x,y}
//             drawCircle(x,y)
//             drawLine(lastPoint.x,lastPoint.y,x,y)
//             lastPoint = newPoint
//         }
//     }
//     canvas.ontouchend = (e)=>{
//         using = false
//     }
// }

