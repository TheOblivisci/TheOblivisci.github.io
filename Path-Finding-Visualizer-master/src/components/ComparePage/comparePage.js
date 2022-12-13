import React from "react";
import './comparePage.css';
import Tick from "../images/Tick.png";
import Cross from "../images/Cross.png";
import { useNavigate } from 'react-router-dom';
import BFS from "../images/bfs.jpeg";
import DFS from "../images/dfs.jpeg";
import dij from "../images/dij.jpeg";
import greedy from "../images/greedy.jpeg";
import astar from "../images/astar.jpeg";
function ComparePage (){
    let navigate = useNavigate();
    const navigateToHomePage=()=>{
        navigate('/home');
    }
    return <div>
       <div className="table">
        <table cellSpacing={20}>
            <tr>
                <th className="empty"></th>
                <th className="headings">BFS</th>
                <th className="headings">DFS</th>
                <th className="headings">Dijkstra</th>
                <th className="headings">Greedy BFS</th>
                <th className="headings">A*</th>
            </tr>
            <tr>
                <th className="headings">Logic</th>
                <th className="content con-1">BFS is a traversal approach in which we first walk through all nodes on the same level before moving on to the next level.</th>
                <th className="content con-2">DFS is a traversal approach in which the traverse begins at the root node and proceeds through the nodes as far as possible until we reach the node with no unvisited nearby nodes.</th>
                <th className="content con-3">Dijkstra's Algorithm is an algorithm that is used for finding the shortest distance, or path, from starting node to target node in a weighted graph.Dijkstra's Algorithm</th>
                <th className="content con-4">Greedy best-first search algorithm always selects the path which appears best at that moment. It is the combination of depth-first search and breadth-first search algorithms. </th>
                <th className="content con-5">A* is a graph traversal and path search algorithm, which is used in many fields of computer science due to its completeness, optimality, and optimal efficienc</th>
                
            </tr>
            <tr>
                <th className="headings">Typical Traversal</th>
                <th className="content con-1"><img src={BFS} ></img></th>
                <th className="content con-2"><img src={DFS} height={150} width={150}/></th>
                <th className="content con-3"><img src={dij} ></img></th>
                <th className="content con-4"><img src={greedy} ></img></th>
                <th className="content con-5"><img src={astar} height={150} width={150}/></th>
                
            </tr>

            <tr>
                <th className="headings">Optimal Cost</th>
                <th className="content con-c" ><img src={Cross} height={30} width={30}/></th>
                <th className="content con-c"><img src={Cross} height={30} width={30}/></th>
                <th className="content con-t"><img src={Tick} height={30} width={40}/></th>
                <th className="content con-c"><img src={Cross} height={30} width={30}/></th>
                <th className="content con-t"><img src={Tick} height={30} width={40}/></th>
                
            </tr>
            <tr>
                <th className="headings">Use Heuristic</th>
                <th className="content con-c" ><img src={Cross} height={30} width={30}/></th>
                <th className="content con-c" ><img src={Cross} height={30} width={30}/></th>
                <th className="content con-c" ><img src={Cross} height={30} width={30}/></th>
                <th className="content con-t"><img src={Tick} height={30} width={40}/></th>
                <th className="content con-t"><img src={Tick} height={30} width={40}/></th>
                
            </tr>
            <tr>
                <th className="headings">Gives Shortest Path</th>
                <th className="content con-c" ><img src={Cross} height={30} width={30}/></th>
                <th className="content con-c" ><img src={Cross} height={30} width={30}/></th>    
                <th className="content con-t"><img src={Tick} height={30} width={40}/></th>
                <th className="content con-c" ><img src={Cross} height={30} width={30}/></th>
                <th className="content con-t"><img src={Tick} height={30} width={40}/></th>
                
            </tr>
            <tr>
                <th className="headings">Pseudo Code</th>
                <th className="content con-1"></th>
                <th className="content con-2"></th>
                <th className="content con-3"></th>
                <th className="content con-4"></th>
                <th className="content con-5"></th>
                
            </tr>
            <tr>
                <th className="headings">Application Scenario</th>
                <th className="content con-1">Finding path to all the nodes</th>
                <th className="content con-2">Finding path to one node </th>
                <th className="content con-3">Finding path to all the nodes considering cost</th>
                <th className="content con-4">Finding path to one node considering cost</th>
                <th className="content con-5"></th>
                
            </tr>
            
            <tr>
                <th className="headings">Time Complexity</th>
                
                <th ><div className="sub-content">
                    <div className="con">O(V + E)</div>
                    <div className="con">O(V^2) </div>
                    </div></th>

                <th ><div className="sub-content">
                <div className="con">O(V + E)</div>
                    <div className="con">O(V^2) </div>
                    </div></th>
                <th ><div className="sub-content">
                    <div className="con">O(ELogV) </div>
                    <div className="con">O(V2) O(V^2) O(V2)</div>
                    </div></th>
                <th ><div className="sub-content">
                    <div className="con">O(|V| + |E|) </div>
                    <div className="con">O(|V|²)</div>
                    </div></th>
                <th ><div className="sub-content">
                    <div className="con">O(bd)</div>
                    <div className="con">O(bd)</div>
                    </div></th>
                
            </tr>
            <tr>
                <th className="headings">Space Complexity</th>
                
                <th ><div className="sub-content">
                    <div className="con">O(V)</div>
                    <div className="con">O(V) </div>
                    </div></th>

                <th ><div className="sub-content">
                <div className="con">O(V)</div>
                    <div className="con">O(V) </div>
                    </div></th>
                <th ><div className="sub-content">
                    <div className="con">O(ELogV) </div>
                    <div className="con">O(V2) O(V^2) O(V2)</div>
                    </div></th>
                <th ><div className="sub-content">
                    <div className="con">O(|V| + |E|) </div>
                    <div className="con">O(|V|²)</div>
                    </div></th>
                <th ><div className="sub-content">
                    <div className="con">O(bd)</div>
                    <div className="con">O(bd)</div>
                    </div></th>
                
            </tr>
            
            <tr>
                <th className="headings">Examples</th>
                <th className="content con-1">GPS Navigation systems, Broadcasting in Network, Social Networking Websites</th>
                <th className="content con-2">Solving puzzles with one solution, Detecting cycle in a graph </th>
                <th className="content con-3">Digital Mapping Services, Social Networking Applications, Telephone Network</th>
                <th className="content con-4">Job Scheduling Problem, Graph - Map Coloring</th>
                <th className="content con-5">Search Engines, calculate the best route between two nodes.</th>
                
            </tr>
            

        </table>

       </div>
      <center>
      <button className="home" onClick={ navigateToHomePage }> Home Page</button>

      </center>
       
    </div>

    
}
export default ComparePage;
