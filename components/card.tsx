// interface 


import { Pokemon } from '../util/api'
import { PokemonType } from '../util/enums'
import TypePills from './type-pills'
import Image from 'next/image'
interface CardProps {
  modalId?: string,
  key?: number,
  onClick?: any,
  id?: any,
  data: Pokemon,
}

export default function Card(props: CardProps) {
  const {
    modalId = '',
    onClick = () => { },
    id = '',
    data = null
  } = props

  const pokeTypes = PokemonType

  return (
    <label className="p-2" htmlFor={modalId} onClick={() => onClick(props.data)} id={id}>
      <div className="card h-full bg-base-100 hover:shadow-md cursor-pointer w-full transition-all duration-500 ease-in-out hover:-translate-y-1 lg:max-w-[200px] max-w-none">
        <figure className="px-3 pt-10">
          {data?.sprites.front_default && <Image unoptimized src={data?.sprites.front_default} loader={() => data?.sprites.front_default} alt='Pokemon 2' width={180} height={180} className='h-44 object-cover' />}
        </figure>
        <div className="text-gray-400 px-3 font-bold mt-2">#002</div>
        <div className="card-body items-start p-4 pt-2">
          <h2 className="card-title text-2xl font-black capitalize">{props.data.name}</h2>
          <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
            {props.data.types.map((item, index) => <TypePills index={index} type={item.type.name} size='small' />)}
          </div>
        </div>
      </div>
    </label>
  )
}