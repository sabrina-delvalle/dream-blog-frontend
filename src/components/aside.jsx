import React from "react";
import aside from "../images/dream-world.jpg";

export default function Aside() {
  return (
    <aside className="aside">
      <article className="aside-post">
        <h2>
          More Content <span className="arrow-info">▼</span>
        </h2>
        <h3>Lifestyle On Board</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
          tempore facilis nostrum voluptas nulla, itaque magni exercitationem
          quae veritatis reiciendis impedit temporibus cum vitae pariatur sed et
          praesentium. Vel, animi.
        </p>
        <img
          src={aside}
          alt="small-asimage"
          width="300px"
          style={{ borderRadius: "10px" }}
        />
      </article>
      <article className="aside-post">
        <h3>new paradigm</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
          tempore facilis nostrum voluptas nulla, itaque magni exercitationem
          quae veritatis reiciendis impedit temporibus cum vitae pariatur sed et
          praesentium. Vel, animi.
        </p>
        <img
          src={aside}
          alt="small-asimage"
          width="300px"
          style={{ borderRadius: "10px" }}
        />
      </article>
      <article className="aside-post">
        <h3>new paradigm</h3>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio
          tempore facilis nostrum voluptas nulla, itaque magni exercitationem
          quae veritatis reiciendis impedit temporibus cum vitae pariatur sed et
          praesentium. Vel, animi.
        </p>
        <img
          src={aside}
          alt="small-asimage"
          width="300px"
          style={{ borderRadius: "10px" }}
        />
      </article>
    </aside>
  );
}
