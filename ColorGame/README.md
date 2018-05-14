# Color Game Project

## What Color Game is?

A color pick game by guessing the specified color given by the title.

## A snippet of the project

![](./ColorGame/snippet.png?s=10)

## How to play?

The link: [Color Game](https://walkccc.github.io/ColorGame/)

There are three different difficulties in the project:

- Easy: a 1 by 3 childish board
- Medium: a 2 by 3 intermidiate level
- Hard: a 3 by 3 much more challenging board

## How to build this project?

I build this project with vanilla [JavaScript](https://www.javascript.com) language and style it with CSS.

The main function `init()`:

```javascript
function init() {
    setModeButtons();
    setSquares();
    reset();
}
```

- `changeColors()`: changes the colors of the squares.

- `pickColor()`: randomly chooses the goad color.

- `generateRandomColors(n)` and `randomColor()`: randomly generate the colors of the squares.

- `setSquares()`: sets up the settings of the squares.

- `startGame()`: starts the [Color Game](https://walkccc.github.io/ColorGame/)!

The algorithm behinds this project is easy to learn. You can download the source code and change the mechanism of generating random colors or try to add some new squares or add some buttons.

## Others

Thank you and look forward to having your opinion on this project. Feel free to give your comments. It would be nice if you could provide a bit more information on the user's behavior. You can also fork this project for any use.
