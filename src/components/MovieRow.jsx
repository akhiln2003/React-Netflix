import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import MovieTitle from './MovieTitle';
import { ChevronsLeft , ChevronsRight} from 'lucide-react';


function MovieRow( { title , url  } ) {
    const [ movies , setMovies ] = useState([]);
    let scrollRef = useRef(null)
    useEffect(()=>{
        axios.get(url).then((response) => setMovies( response.data.results))
    },[url])

    const handleScroll  = (direction)=>{
        const { current } = scrollRef;
        if (current) {
            const scrollamont = direction === 'left' ? -900 : 900;
            current.scrollBy({ left:scrollamont, behaviour: "smooth"  }) 
        }
    }
  return (
    <>
        <h2 className=' font-nsans-bold md:text-xl p-4 capitalize ' >{title}</h2>
        <div className='  flex items-center group ' > 
        <ChevronsLeft 
         className='h-8 w-8 bg-transparent hidden group-hover:block cursor-pointer ' 
         onClick={()=>handleScroll('left')}
         />

            <div
                id={`slider`} 
                ref={scrollRef}
                className='  w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
                    { movies.map((movie) => < MovieTitle key={movie.id} movie ={ movie} /> )}
                </div>
                < ChevronsRight 
                className=' h-8 w-8 bg-transparent  hidden group-hover:block cursor-pointer ' 
                onClick={()=>handleScroll('right')}
                />
        </div>
    </>
  )
}

export default MovieRow