import React,{useEffect,useState} from 'react';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import Item from '../components/Item.js';
//import Carousel from '../components/Carousel.js';

function Home() {
   const [search,setSearch]=useState('');
   const [bookCategory,setBookCategory]=useState([]);
   const [bookItem,setBookItem]=useState([]);
   const loadData=async()=>{
   let response=await fetch("http://localhost:5000/api/bookData",{
     method:"POST",
     headers:{ 
       'Content-Type':'application/json'
      }
    });
    response=await response.json();
    setBookItem(response[0]);
    setBookCategory(response[1]);
    //console.log(response[0],response[1]);
   }
 
  useEffect(()=>{
    loadData()
  },[])

  return (
    <>
    <div><Navbar/></div>
    <div>
      <div id="carouselExampleControls" class="carousel slide carousel-fade" data-bs-ride="carousel">
     <div class="carousel-inner" id='carousel'>
      <div class="carousel-caption" style={{zIndex:"10"}}>
          <div class="d-flex justify-content-center">
           <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
            {/*<button class="btn btn-outline-success" type="submit">Search</button>*/}
          </div>
      </div>
      <div class="carousel-item active">
       <img src="https://source.unsplash.com/random/900x700/?mystery" class="d-block w-100" alt="..."/>
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
    </div>
    <div className='container m-3'>
      {
         bookCategory!==[]?bookCategory.map((data)=>{
                                          return(<div className="row mb-3">
                                        <div key={data._id} className="fs-3 m-3">{data.categoryName}</div>

                                   <hr />
                                  {
                                     bookItem!==[]?bookItem.filter((item)=>(item.categoryName===data.categoryName)&&(item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                     .map(filterItems=>{
                                       return(
                                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3" style={{"margin-right":"2px","margin-left":"2px"}}>
                                        <Item
                                          id={filterItems._id}
                                          bookName={filterItems.name}
                                          img={filterItems.img}
                                          description={filterItems.description}
                                          author={filterItems.author}
                                          price={filterItems.price}
                                          reviews={filterItems.reviews}
                                          publisher={filterItems.publisher}
                                        ></Item>
                                        </div>
                                       )
                                     })


                                    :<div>No such data</div>
                                  }
    
                                         </div> )
                                        }):<div>"""""</div>
      }
    <Item/></div>
    <div><Footer/></div>
    </>
  );
}

export default Home;
