import React, { Suspense } from "react";
import "./Homepage.css";


import Header from "./Navbar/Navbar";
// import Content from "./Banner/Banner";
import { ScaleLoader } from "react-spinners";
const RowCard = React.lazy(() => import('./Rows/Rows'));
const Content = React.lazy(() => import('./Banner/Banner'));


const PageComponent = ({ topic, contentType, rows }) => {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="loading-container"><ScaleLoader
        color="#d43434"         
        height={50} 
        width={10}         
        radius={5} 
        margin={2} 
      /></div>}>
      <Content topic={topic.toUpperCase()} type={contentType} />
      </Suspense>
      <Suspense fallback={<div className="loading-container"><ScaleLoader
        color="#d43434"         
        height={50} 
        width={10}         
        radius={5} 
        margin={2} 
      /></div>}>
        {rows.map((row, index) => (
          <RowCard
            key={index}
            type={row.type}
            name={row.name}
            isPoster={row.isPoster}
          />
        ))}
      </Suspense>
    </>
  );
};


export default PageComponent


