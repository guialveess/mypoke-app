
import React from 'react'
import Pokemon1 from '/public/image/pokemon-1.png'
import Image from 'next/image'
import { Pokemon } from '../util/api'
import TypePills from './type-pills'
import Link from 'next/link'

interface ModalProps {
  id?: string,
  actionClicked?: Function,
  data: Pokemon
}

export default function Modal(props: ModalProps) {
  const { id = 'pokemon-modal', data } = props
  return (
    <React.Fragment>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-full max-w-5xl">
          <label htmlFor="pokemon-modal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-transparent border-none font-black">✕</label>
          <div className="w-full flex flex-row items-start justify-center gap-8 flex-wrap mt-12">
            <Image loader={() => data.sprites.front_default} src={data.sprites.front_default} alt='Pokemon Picture' width={400} height={400} className='shrink-0' />
            <div className='flex flex-col items-start justify-start gap-4 flex-auto max-w-xl'>

              {/* NAME */}
              <div className=' font-black text-4xl mt-2 capitalize'>{data.name}</div>

              {/* PHYSICAL */}
              <div className='flex flex-row items-start justify-between gap-8 text-md mt-8 text-lg'>
                <div className='font-bold'>Weight: <span className='font-thin ml-4'>{data.weight}</span></div>
                <div className='font-bold'>Height: <span className='font-thin ml-4'>{data.height}</span></div>
              </div>

              {/* ABILITIES */}
              <div className='flex flex-row items-start justify-between gap-8 text-md text-lg'>
                <div className='font-bold'>Abilities:</div>
                <ul className='flex flex-col items-start justify-start gap-2 list-disc'>
                  {data.abilities.map((item, index) => (
                    <li key={index}>{item.ability.name}</li>
                  ))}
                </ul>
              </div>

              {/* TYPE */}
              <div className='flex flex-row items-center justify-between gap-8 text-lg'>
                <div className='font-bold'>Type: </div>
                <div className="flex flex-row items-center justify-start gap-2 flex-wrap">
                  {data.types.map((item, index) => (
                    <TypePills type={item.type.name} index={index} size='medium' />
                  ))}
                </div>
              </div>

              {/* BUTTON */}
              <Link href={`/pokemon/${data.id}`}>
                <button className="btn btn-secondary text-white capitalize mt-4 w-full lg:w-fit rounded-xl px-7 text-xl">More Detail</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}