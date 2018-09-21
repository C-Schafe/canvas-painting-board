let canvas = document.getElementById('canvas');
let eraser = document.getElementById('eraser');
let clear = document.getElementById('clear');
let pen = document.getElementById('pen');
let ctx = canvas.getContext('2d');
let using = false
let lastPoint = {}
let eraserEnabled = false

setCanvasSize()
autoSetCanvasSize()
listenToActions()
//pen.classList.add('active')

//检测是否是移动设备
if('ontouchstart' in document.body){
    listenToTouch()
}else{
    listenToMouse()
}

/*功能函数*/
function drawCircle(x,y){
    ctx.beginPath()
    ctx.arc(x,y,5,0,Math.PI*2)
    ctx.fill()
}
function drawLine(x1,y1,x2,y2){
    ctx.beginPath()
    ctx.moveTo(x1,y1)
    ctx.lineWidth = 10
    ctx.lineTo(x2,y2)
    ctx.stroke()
    ctx.closePath()
}
function setCanvasSize(){
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
}
function autoSetCanvasSize(){
    window.onresize = ()=>{
        setCanvasSize()
    }
}
function listenToActions(){
    eraser.onclick = ()=>{eraserEnabled = !eraserEnabled}
    clear.onclick = ()=>{setCanvasSize()}
}
function listenToMouse(){
    canvas.onmousedown = (e)=>{
        let x = e.clientX
        let y = e.clientY
        using = true
        if(eraserEnabled){
            ctx.clearRect(x,y,10,10)
        }else{
            drawCircle(x,y)
            lastPoint = {x,y}
        }
    }
    canvas.onmousemove = (e)=>{
        let x = e.clientX
        let y = e.clientY
        if(!using){return}
        if(eraserEnabled){
            ctx.clearRect(x,y,10,10)
        }else{
            let newPoint = {x,y}
            drawCircle(x,y)
            drawLine(lastPoint.x,lastPoint.y,x,y)
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
            ctx.clearRect(x,y,10,10)
        }else{
            drawCircle(x,y)
            lastPoint = {x,y}
        }
    }
    canvas.ontouchmove = (e)=>{
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if(!using){return}
        if(eraserEnabled){
            ctx.clearRect(x,y,10,10)
        }else{
            let newPoint = {x,y}
            drawCircle(x,y)
            drawLine(lastPoint.x,lastPoint.y,x,y)
            lastPoint = newPoint
        }
    }
    canvas.ontouchend = (e)=>{
        using = false
    }
}

