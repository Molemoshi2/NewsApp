import { useState,useEffect } from "react";

function Home(){
    const [articles,setArticles] = useState([])


    useEffect(()=>{
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_API_KEY}`
        fetch(url).then((res)=>res.json())
        .then((data)=>setArticles(data.articles))
        console.log(articles)
    },[])
    return(
        <div>
      <div className="listItems">
        <div className="logo">NewsApp</div>
        <div>
          <input type="text" placeholder="search" />
        </div>
        <div >
          <ul>
            <li>Sports</li>
            <li>Tech</li>
            <li>Fashion</li>
            <li>Headlines</li>
          </ul>
        </div>
      </div>
      <hr style={{marginTop:'1rem'}} />
      {/* structuring the body */}
      <div className="article-container">
        <div className="article1">sample</div>
        <div className="article2">sample</div>
        <div className="article3">sample</div>
        <div className="article4">sample</div>
        <div className="article4">sample</div>
      </div>
    </div>
    );
}
export default Home