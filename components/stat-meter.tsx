import { useEffect } from "react"

interface StatsProps {
    number: number
    name: string
}

interface Styles {
    text: string
    border: string
}

export default function StatMeter(props: StatsProps) {
    const { number, name } = props

    useEffect(() => {
        setStyles()
    }, [])

    const setStyles = (): Styles => {
        switch (name) {
            case 'hp':
                return {
                    border: 'border-accent-green',
                    text: 'text-accent-green'
                }
            case 'attack':
                return {
                    border: 'border-accent-red',
                    text: 'text-accent-red'
                }
            case 'defense':
                return {
                    border: 'border-accent-blue',
                    text: 'text-accent-blue'
                }
            case 'special-attack':
                return {
                    border: 'border-accent-orange',
                    text: 'text-accent-orange'
                }
            case 'special-defense':
                return {
                    border: 'border-accent-cream',
                    text: 'text-accent-cream'
                }
                break;
            case 'speed':
                return {
                    border: 'border-yellow-500',
                    text: 'text-yellow-500'
                }
            default:
                return {
                    border: 'border-accent-green',
                    text: 'text-accent-green'
                }
        }
    }

    let style: Styles = setStyles()

    return (
        <div className={`w-36 h-36 rounded-full border  border-[20px] ${style.border} flex flex-col items-center justify-center`}>
            <div className={`font-black text-4xl ${style.text}`}>{number}</div>
            <div className="font-thin whitespace-nowrap capitalize text-xs">{name}</div>
        </div>
    )
}