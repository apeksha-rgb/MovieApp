import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import MovieCard from './components/MovieCard'

const API_BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization : `Bearer ${API_KEY}`

  }
  

}



const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [movieList, setMovieList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const fetchMovies= async (query ='') => {
    try{
      const endPoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/movie/popular?language=en-US`

      const response = await fetch(endPoint,API_OPTIONS)
      
      if(!response.ok){
        throw new Error(`Failed to fetch movies`)
      }

      const data = await response.json()
      
      
      setMovieList(data.results || [])
    }catch (error) {
      console.log(`Error in fetching movies: ${error}`)
      setErrorMessage('Error Fetching movies, Please Try again letter')
    }
  }

  useEffect(()=>{
    fetchMovies(searchTerm)
  },[searchTerm])
  return (
    <main>
      <div className="pattern" />
        <div className="wrapper">
          <header>
            <img src='./hero-img.png' alt='Hero-banner' />
          <h1>Find <span className='text-gradient'>Movie</span> You'll Enjoy Without the Hassle</h1>
          
          

          <Search 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}  
          />
          </header>
          <section className='all-movies'>
            <h2>All Movies</h2>
              <ul>
                {movieList.map((movie)=>(
<MovieCard key={movie.id} movie={movie} />
)

              )}
              </ul>
          </section>
          <h1 className='text-white text-3xl'>{searchTerm}</h1>
        </div>
      
    </main>
  )
}

export default App