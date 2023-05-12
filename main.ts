input.onButtonPressed(Button.A, function () {
    direction += 1
    if (direction > 3) {
        direction = 0
    }
    setMv();
})
input.onButtonPressed(Button.B, function () {
    direction += -1
    if (direction < 0) {
        direction = 3
    }
    setMv();
})
let mv=[1,0]
let lims: number[] = []
let lstPts: number[][] = []
let direction = 0
direction = 1
let ytete = 20
let xtete = 20
let nbPts = 15
LCD1IN8.LCD_Init()
LCD1IN8.LCD_ClearBuf()
LCD1IN8.LCD_Clear()
LCD1IN8.LCD_SetBL(536)
for (let i = 0; i <= nbPts - 1; i++) {
    lstPts.push([xtete-1, ytete])
}
function setMv()
{
    if (direction == 0) {
        mv = [0,1]
    } else if (direction == 1) {
        mv = [1, 0]
    } else if (direction == 2) {
        mv = [0, -1]
    } else if (direction == 3) {
        mv = [-1, 0]
    }
}
basic.forever(function () {
    LCD1IN8.LCD_ClearBuf()
    LCD1IN8.DrawPoint(
        lstPts[nbPts-1][0],
        lstPts[nbPts-1][1],
        0xffff,
        DOT_PIXEL.DOT_PIXEL_2
    )
    lstPts.pop()
    xtete+=mv[0]
    ytete+=mv[1]
    lstPts.unshift([xtete, ytete])
    lims = [
    160,
    128,
    0,
    0
    ]

    for (let i = 0; i <= nbPts - 1; i++) {
        lims[0] = Math.min(lims[0], lstPts[i][0])
        lims[1] = Math.min(lims[1], lstPts[i][1])
        lims[2] = Math.max(lims[2], lstPts[i][0])
        lims[3] = Math.max(lims[3], lstPts[i][1])
        LCD1IN8.DrawPoint(
        lstPts[i][0],
        lstPts[i][1],
        0,
        DOT_PIXEL.DOT_PIXEL_2
        )
    }
    LCD1IN8.LCD_DisplayWindows(
    lims[0],
    lims[1],
    lims[2] + 2,
    lims[3] + 2
    )
    console.log(lstPts.length)
})
