import React from "react";
import aside from '../images/dream-world.jpg'

export default function Aside() {
  return (
   <aside className="aside">
        <article className="aside-post">
            <h3>new paradigm</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio tempore facilis nostrum voluptas nulla, itaque magni exercitationem quae veritatis reiciendis impedit temporibus cum vitae pariatur sed et praesentium. Vel, animi.</p>
            <img src={aside} alt="small-asimage" width='300px'/>
        </article>
        <article className="aside-post">
            <h3>new paradigm</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio tempore facilis nostrum voluptas nulla, itaque magni exercitationem quae veritatis reiciendis impedit temporibus cum vitae pariatur sed et praesentium. Vel, animi.</p>
            <img src={aside} alt="small-asimage" width='300px'/>
        </article>
        <article className="aside-post">
            <h3>new paradigm</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio tempore facilis nostrum voluptas nulla, itaque magni exercitationem quae veritatis reiciendis impedit temporibus cum vitae pariatur sed et praesentium. Vel, animi.</p>
            <img src={aside} alt="small-asimage" width='300px'/>
        </article>
   </aside> 
  );
}
