import React from 'react'

function Carousel() {
  return (
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
     <div class="carousel-inner">
      <div class="carousel-caption" style={{zIndex:"10"}}>
          <form class="d-flex">
           <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
           <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
      </div>
      <div class="carousel-item active">
       <img src="https://source.unsplash.com/random/900x700/?burger" class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
       <img src="https://source.unsplash.com/random/900x700/?books" class="d-block w-100" alt="..."/>
      </div>
      <div class="carousel-item">
       <img src="https://source.unsplash.com/random/500x300/?History" class="d-block w-100" alt="..."/>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
    </button>
   </div>
  );
}

export default Carousel;
