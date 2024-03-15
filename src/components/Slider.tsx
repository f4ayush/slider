'use client'
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'

type SliderProps = {
    dataLength: number;
    autoSlide?: boolean
}
const SliderContext = createContext<Array<any>>([])
export default function Slider(props: PropsWithChildren<SliderProps>) {
    const { dataLength, autoSlide } = props
    const [activeIndex, setActiveIndex] = useState(0)

    const moveSlide = () => {
        setActiveIndex((prevIndex) => {
            return (prevIndex + 1) % dataLength
        })
    }
    useEffect(() => {
        if(autoSlide){
            const intervalId = setInterval(() => {
                moveSlide()
            }, 2000)
    
            return () => {
                clearInterval(intervalId)
            }
        }
    }, [])

    return (
        <SliderContext.Provider value={[activeIndex, setActiveIndex]}>
            {props.children}
        </SliderContext.Provider>
    )
}

type DetailsProps = {
    index: number
}
Slider.Details = function Details(props: PropsWithChildren<DetailsProps>) {
    const { index } = props
    const [activeIndex, setActiveIndex] = useContext(SliderContext)

    return (
        <div className={`${index == activeIndex ? "block" : "hidden"}`}>
            {props.children}
        </div>
    )
}

type ButtonProps = {
    index: number;
    value: string
}
Slider.Button = function Button(props: ButtonProps) {
    const { value, index } = props
    const [activeIndex, setActiveIndex] = useContext(SliderContext)
    return (
        <div onClick={() => setActiveIndex(index)}>{value}</div>
    )
}