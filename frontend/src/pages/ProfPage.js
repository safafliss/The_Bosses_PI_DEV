import React from 'react'
import foodImage from '../assets/img/prof.png';
import Navbar from '../components/ReusableComponents/components/Navbars/UserNavbar';
import professionalPagecss from "./professionalPageCss.css"
function ProfPage() {
  return (
    <div className='wholePage'  style={{"background":"white"}}>
        <Navbar></Navbar>
    <img className='firstImage' style={{"width":"100%"}} src={foodImage} ></img>
    <br/>
    <div className='partiProducts d-flex justify-content-center'  style={{"background":"white"}}>
        <div className='recherche d-flex justify-content-center w-100'  style={{background: "white","alignItems":"center"}}>
            <select style={{color:"black","borderRadius":"10px","border":"none"}}  >
                <option selected >Categories</option>
                <option>Categories</option>
                <option>Categories</option>
            </select>
            <div className='w-75'>
            <div className='mt-2 ml-4' style={{"position":"absolute"}}>
            <i class="fa fa-search" aria-hidden="true"></i>
            </div>
            <input style={{"color":"black","width":"100%",backgroundColor:"#e3e3e3","borderRadius":"10px","outline":"none","border":"none"}} className='ml-2 pl-8 w-75' placeholder='Search...' type='text'></input>
            </div>
        </div>
    </div>
    <div className='productsBel7a9 mt-5 ' style={{"background":"white"}}>
        <div className='superMarche bg-light'>
            <div className='cardsMarche d-flex  flex-wrap center'>
                
                <div class="card cardMahdi"  >
                            <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                            <div className='d-flex'>
                                <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                                <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                            </div>
                            <div class="card-body" style={{"paddingBottom": "1px"}}>
                                <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                                <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                                <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                            </div>
                            </div>

                
                            <div class="card cardMahdi"  >
                        <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                        <div className='d-flex'>
                            <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                            <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                        </div>
                        <div class="card-body" style={{"paddingBottom": "1px"}}>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                            <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                        </div>
                        </div>

                
                        <div class="card cardMahdi"  >
                        <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                        <div className='d-flex'>
                            <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                            <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                        </div>
                        <div class="card-body" style={{"paddingBottom": "1px"}}>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                            <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                        </div>
                        </div>
            </div>

                
            <div className='cardsMarche d-flex  flex-wrap'>
                
                <div class="card cardMahdi"  >
                            <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                            <div className='d-flex'>
                                <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                                <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                            </div>
                            <div class="card-body" style={{"paddingBottom": "1px"}}>
                                <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                                <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                                <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                            </div>
                            </div>

                
                            <div class="card cardMahdi"  >
                        <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                        <div className='d-flex'>
                            <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                            <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                        </div>
                        <div class="card-body" style={{"paddingBottom": "1px"}}>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                            <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                        </div>
                        </div>

                
                        <div class="card cardMahdi"  >
                        <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                        <div className='d-flex'>
                            <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                            <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                        </div>
                        <div class="card-body" style={{"paddingBottom": "1px"}}>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                            <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                        </div>
                        </div>
            </div>
                    
                    
            <div className='cardsMarche d-flex  flex-wrap'>
                
                <div class="card cardMahdi"  >
                            <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                            <div className='d-flex'>
                                <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                                <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                            </div>
                            <div class="card-body" style={{"paddingBottom": "1px"}}>
                                <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                                <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                                <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                            </div>
                            </div>

                
                            <div class="card cardMahdi"  >
                        <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                        <div className='d-flex'>
                            <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                            <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                        </div>
                        <div class="card-body" style={{"paddingBottom": "1px"}}>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                            <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                        </div>
                        </div>

                
                        <div class="card cardMahdi"  >
                        <img class="card-img-top" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freestufffinder.com%2Ffree-walmart-grocery-delivery-to-your-home-minimum-50-order-limited-time%2F&psig=AOvVaw0Ferua1THbQroKOwbr9n5x&ust=1683656746065000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJj3xqus5v4CFQAAAAAdAAAAABAL" />
                        <div className='d-flex'>
                            <img style={{position:"absolute", marginTop:"-40px" ,marginLeft:"10px" ,height:"50px",width:"50px","borderRadius":"50%"}} src="https://www.radiofrance.fr/s3/cruiser-production/2023/01/c7bfb0de-590d-488d-bd48-7e548f6ff6ee/1200x680_gettyimages-482142025.jpg" ></img>
                            <p style={{position:"absolute", marginTop:"-35px","marginLeft":"70px","color":"white","fontSize":25}} ><b>Test ya bro</b></p>
                        </div>
                        <div class="card-body" style={{"paddingBottom": "1px"}}>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-clock" aria-hidden="true"></i> Today 19:00 - 23:59</p>
                            <p class="" style={{color:"#a5a5a5","textAlign": "initial","marginBottom": "1px"}}><i class="fa fa-map-marker" aria-hidden="true"></i> 2.0KM</p>
                            <p class="" style={{color:"green","textAlign": "end","marginBottom": "1px"}}>3Dt</p>
                        </div>
                        </div>
            </div>
                    
        </div>
    </div>
    </div>
  )
}

export default ProfPage