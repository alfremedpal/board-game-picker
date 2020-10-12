import React from 'react'

import classes from './Shapes.module.css'

const Shapes = React.memo((props) => {

    const getRandomVal = (max, min) => {
        return Math.floor(Math.random() * (max - min) + min)
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    const style = {
        transform: `rotate(${getRandomVal(15, 360)}deg)`,
    }

    let shapeClass
    if (props.type === 'circle') {
        shapeClass = classes.circle
        style.top = `${getRandomVal(400, 600)}px`
        style.left = `${getRandomVal(0, 250)}px`
        style.backgroundColor = getRandomColor()
    } else if (props.type === 'square') {
        shapeClass = classes.square
        style.top = `${getRandomVal(0, 300)}px`
        style.left = `${getRandomVal(0, 250)}px`
        style.backgroundColor = getRandomColor()
    } else if (props.type === 'triangle') {
        shapeClass = classes.triangle
        style.top = `${getRandomVal(0, 300)}px`
        style.right = `${getRandomVal(50, 250)}px`
        style.borderBottom = `150px solid ${getRandomColor()}`
    } else {
        shapeClass = classes.trap
    }
    
    return (
        <div 
            className={shapeClass} 
            style={style}
        />
    )
})

export default Shapes