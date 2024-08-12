import { useState,useEffect } from "react";
import Navigation from "./navigationBar";

function Home(){
    const [articles,setArticles] = useState([])
    const [category,setCategory] = useState('everything')


    useEffect(()=>{
      const url = `https://newsapi.org/v2/${category}?q=us&apiKey=${import.meta.env.VITE_API_KEY}`;
      fetch (url).then(res => res.json()).then(data => setArticles(data.articles));
     },[])
     console.log(articles)
    return(
        <div>
         <Navigation setCategory={setCategory}/>
      {/* structuring the body */}
      <h1 style={{textAlign:"center",marginTop:"2rem"}}>Latest trending news</h1>
      <div className="article-container">
        {articles.map((article)=>(
          <div style={{width:"21rem"}}>
            <img style={{width:"20rem"}} src={article.urlToImage} alt="" />
            <div>
                <h4>{article.title}</h4>
                <p>{article.description}</p>
                <a href={article.url}>Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}
export default Home