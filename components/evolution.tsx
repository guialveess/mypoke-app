import Image from 'next/image'

interface EvolutionProps {
    form_name: string;
    form_names: string[];
    form_order: number;
    id: number;
    is_battle_only: boolean;
    is_default: boolean
    is_mega: boolean
    name: string
    names: any[]
    order: number
    pokemon: any
    sprites: any
    types: any[]
    version_group: any[]
    index?: number
    onClick?: Function
}

export default function Evolution(props: EvolutionProps) {
    const { index = 0, onClick = () => { } } = props
    const getColor = () => {
        if (index % 4 === 0) {
            return "border-accent-red"
        } else if (index % 3 === 0) {
            return "border-accent-orange"
        } else if (index % 2 === 0) {
            return "border-primary"
        } else {
            return "border-accent-green"
        }
    }
    return (
        <div className="flex flex-col items-center justify-start gap-2 cursor-pointer" onClick={() => onClick(props.id)}>
            {props.sprites.front_default ?
                <Image src={props.sprites.front_default}
                    loader={() => props.sprites.front_default}
                    alt="Evolution picture"
                    width={192} height={192}
                    className={`hover:shadow-md hover:-translate-y-1 hover:-translate-x-1 hover:shadow-black/40 drop-shadow-md transition-all duration-300 ease-in-out rounded-full border border-[12px] ${getColor()} flex flex-col items-center justify-center p-4`} />
                :

                // if no picture
                <div className={`rounded-full border border-[12px] ${getColor()} flex flex-col items-center justify-center p-4`}></div>
            }
            <div className="text-center font-bold capitalize">{props.name}</div>
        </div>
    )
}