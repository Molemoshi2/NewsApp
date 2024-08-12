import { useState,useEffect } from "react";

function Navigation(props){
    return(
       <div>
            <div className="listItems">
            <div className="logo">NewsApp</div>
            <div>
            <input type="text" placeholder="search" />
            </div>
            <div >
            <ul>
                <li><a href="" onClick={()=>{props.setCategory('sports')}}>Sports</a></li>
                <li><a href="" onClick={()=>{props.setCategory('technology')}}>Tech</a></li>
                <li><a href="" onClick={()=>{props.setCategory('fashion')}}>Fashion</a></li>
                <li><a href="" onClick={()=>{props.setCategory('science')}}>Science</a></li>
            </ul>
            </div>
        </div>
        <hr style={{marginTop:'1rem'}} />
       </div>
    );
}
export default Navigation