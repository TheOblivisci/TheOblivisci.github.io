import React from "react";
import { useNavigate } from "react-router-dom";
import './home.css';
import Tick from "../images/tick.svg";
import HomeGif from "../images/home.gif";
function HomePage(){
    let navigate=useNavigate();
    const navigateToDescription=()=>{
        navigate('/comparepage');
    }
    const navigateToFeedback=()=>{
        navigate('/feedback');
    }
    return <div className="outer-box">
        <div className="box-4">
            <div className="gif-main">
                <img src={HomeGif} alt={"loading.."} className="gif"/>

            </div>
        </div>
        <div className="box-1">
            <div className="buttons" align="right">
               <a href="http://127.0.0.1:5501/index.html"><button >Breadth-First Search</button></a>
                <br/>
                <button >Depth-First Search</button><br/>
                <button >Dijkstra's Shortest Path </button><br/>
                <button >Greedy Best First Search</button><br/>
                <button >A* Best First Search</button><br/>
            </div>
        </div>
        <div className="box-2"></div>
        <div className="box-3">
            <div className="inner">
                <button onClick={navigateToDescription}>Description</button><br/>
                <button onClick={navigateToFeedback}>Feedback</button>

            </div>
                
        </div>
    </div>
    
    
    // <div>
    //     <div className="outer-box">
    //         <div className="box1">
    //         {/* <div className="text">Visualize Now!! Choose an Algorithm</div> */}
    //         <div>
    //         <div className="inner-text">Algorithms</div><br/>

    //         <button onClick={navigateToBFS}>BFS</button><br/>
    //         <button onClick={navigateToDFS}>DFS</button><br/>
    //         <button onClick={navigateToDijkstra}>Dijkstra</button><br/>
    //         <button onClick={navigateToAStar}>A* Search</button><br/>
    //         <button onClick={navigateToGreedyBFS}>Greedy BFS</button><br/>

    //         </div>
           
    //         <div className="box2">
    //             <button onClick={navigateToDescription}>Description</button><br/>
    //             <button onClick={navigateToFeedback}>Feedback</button>

    //         </div>
    //         </div>
    //         {/* <div className="box3"></div>
    //         <div className="box2"> review </div> */}
            
    //     </div>
        
          
        
    // </div>
}
export default HomePage;