import React, { useEffect, useState } from "react";
// import axios from "axios";
import './image.css'


function Image() {
    const [imageUrl, setImageUrl] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;
    const [totalHits, setTotalHits] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    useEffect(() =>{
    fetchImages();
    },[]);
    const fetchImages = () => {
      fetch(`https://pixabay.com/api/?key=27098112-b8296183fa2b4b5b950efda10&q`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setImageUrl(data.hits[currentImageIndex].webformatURL);
          setTotalHits(data.totalHits);
        })
        .catch(err =>{
            console.log(err);
        });
    };

    const prevImage = () => {
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1)
      } else {
        setPage(page - 1);
        setCurrentImageIndex(perPage - 1);
        if(page < 1) {
          setPage(1);
          setCurrentImageIndex(0);
        }
      }
      fetchImages();
    };

    const nextImage = () => {
      if (currentImageIndex < perPage - 1 && currentImageIndex < totalHits - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else{
        setPage(page + 1);
        setCurrentImageIndex(0);
        if (page * perPage > totalHits) {
          setPage(Math.ceil(totalHits / perPage));
        }
      }
      fetchImages();
    }
  return (
    <div className="container">
      <h2>Images from Pixabay API</h2>
      <img src={imageUrl} alt="img" />
     
      <div className="btns">
        <button onClick={prevImage}>Previous</button>
        <button onClick={nextImage}>Next</button>
      </div>
    </div>
  )
};

export default Image;