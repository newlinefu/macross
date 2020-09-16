const robot = require('robotjs')

const countOfLikes = 1500


goToArtstation()
    .then(() => timeoutWithPromise(5000))
    .then(() => goToFirstPart())
    .then(() => scroll())

async function goToArtstation() {

    robot.setMouseDelay(300)

    robot.dragMouse(420, 840)

    robot.mouseClick()

    robot.typeString('artstation')

    robot.keyTap('enter')

    await timeoutWithPromise(1000)

    robot.moveMouse(324, 314)

    robot.mouseClick()
}

function goToFirstPart() {
    robot.setKeyboardDelay(100)

    for (let i = 0; i < 5; i++)
        robot.keyTap('down')

    robot.setKeyboardDelay(0)
}

async function scroll() {
    for (let i = 1; i < countOfLikes / 6; i++) {
        let scrollCount = 6
        await likes()
        if (i % 4 === 0)
            scrollCount++
        if (i % 10 === 0)
            scrollCount++

        scrollBy(scrollCount)
    }
}

function scrollBy(count) {

    robot.setKeyboardDelay(100)

    for (let i = 0; i < count; i++) {
        robot.keyTap('down')
    }

    robot.setKeyboardDelay(0)
}

async function likes() {
    for (let x = 115; x <= 1365; x += 250) {
        await like(x, 750)
    }
}

function like(x, y) {
    robot.moveMouse(x, y)
    robot.keyToggle('control', 'down')
    robot.mouseClick()
    robot.keyToggle('control', 'up')

    robot.keyToggle('control', 'down')
    robot.keyTap('pagedown')
    robot.keyToggle('control', 'up')

    return new Promise(resolve => {
        setTimeout(
            () => {
                robot.keyTap('l')
                robot.keyToggle('control', 'down')
                robot.keyTap('w')
                robot.keyToggle('control', 'up')
                resolve()
            }, 1000)
    })
}


function timeoutWithPromise(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms)
    })
}