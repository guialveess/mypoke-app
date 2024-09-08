import { useEffect, useState } from "react"
import { PokemonType } from "../util/enums"
import { getTypeColor } from "../util/other"

interface TypeProps {
    type: string
    index: number,
    size?: string
    onClick?: Function
}

export default function TypePills(props: TypeProps) {
    const { type, index, size = 'small', onClick = () => { } } = props
    const pokeTypes = PokemonType

    // const [bgColor, setBgColor] = useState<string>('bg-red-500')
    // useEffect(() => {
    //     defineColor()
    // }, [])

    const defineColor = () => {
        const color = getTypeColor(type)
        if (color === 'blue') return 'bg-blue-500'
        else if (color === 'red') return 'bg-red-500'
        else if (color === 'yellow') return 'bg-yellow-500'
        else return 'bg-violet-500'
    }

    let bgColor = defineColor()

    return (
        <div onClick={() => onClick(type)} key={index} className={` cursor-pointer px-4 ${size === 'small' ? 'py-0.5 text-sm' : size === 'medium' ? 'text-base py-1' : 'text-xl py-1'} text-white rounded-full text-center font-bold capitalize 
      ${bgColor}`}>
            {type}
        </div>
    )
}