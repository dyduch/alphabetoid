export function getBlockNumbersForLetter(letter) {
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    ctx.font = "12px Arial";
    ctx.fillStyle = "red";
    ctx.fillText(letter, 3, 10);

    let positions = [];

    for (let i = 0; i < 14; i++) {
        for (let j = 0; j < 10; j++) {
            const p = ctx.getImageData(i, j, 1, 1).data;
            if (p[0] > 0)
                positions.push([i, j]);
        }
    }

    return positions;
}