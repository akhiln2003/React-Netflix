import React, { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight , X } from "lucide-react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/MovieServer";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

function Profile() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  let scrollRef = useRef(null);

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShow);
      });
    }
  }, [user?.email]);
  if (!user) {
    return (
      <>
        <p>fetching data ...</p>
      </>
    );
  }
  const handleScroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollamont = direction === "left" ? -900 : 900;
      current.scrollBy({ left: scrollamont, behaviour: "smooth" });
    }
  };
  const handleRemoveFav  = async( movie )=>{
    const userDoc = doc( db , "users" , user.email )
    await updateDoc( userDoc , {
      favShow : arrayRemove(movie)
    })
  }

  return (
    <div>
      <div>
        <img
          className=" bloc w-full h-[500px] object-cover"
          src="/BackgroundImage.jpg"
          alt="backgroundImage"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px] " />
        <div className=" absolute top-[20%] p-4 md:p-8">
          <h1 className=" text-3xl md:text-5xl font-nsans-bold my-2">
            My Shows
          </h1>
          <p className="font-nsans-light text-white text-lg">{user.email}</p>
        </div>
      </div>
      {/* movieRow */}

      <h2 className=" font-nsans-bold md:text-xl p-4 capitalize ">
        Fave Shows
      </h2>
      <div className="  flex items-center group ">
        <ChevronsLeft
          className="h-8 w-8 bg-transparent hidden group-hover:block cursor-pointer "
          onClick={() => handleScroll("left")}
        />

        <div
          id={`slider`}
          ref={scrollRef}
          className="  w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
        >
          {movies && movies.length ? (
            movies.map((movie) => (
              <div
                id={movie.id}
                className=" relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer  m-2"
              >
                <img
                  className=" w-full h-40 block object-cover object-top "
                  src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                  alt={movie.title}
                />
                <div className=" absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                <p>  <X onClick={ ()=>handleRemoveFav(movie)} size={30} className=" top-2 right-2 absolute" /> </p>

                  <p className=" whitespace-normal text-xs md:text-sm flex justify-center items-center h-full  font-nsans-bold">
                    {movie.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <>
              <h1 className="font-nsans-bold w-full text-center">
               
                No Data ....
              </h1>
            </>
          )}
        </div>
        <ChevronsRight
          className=" h-8 w-8 bg-transparent  hidden group-hover:block cursor-pointer "
          onClick={() => handleScroll("right")}
        />
      </div>
    </div>
  );
}

export default Profile;
