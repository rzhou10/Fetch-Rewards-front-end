import { Button, Col } from 'react-bootstrap';


export default function DogCard({ index, dog, buttonFunction, favorites }) {

  return (
    <Col key={index} md={buttonFunction ? 3 : 12} className='dog-card'>
      <img className={buttonFunction ? 'dog-image' : 'single-image'} src={dog.img}></img>
      <p><span className='card-title'>Name</span>: {dog.name}</p>
      <p><span className='card-title'>Age (Years)</span>: {dog.age}</p>
      <p><span className='card-title'>Breed</span>: {dog.breed}</p>
      <p><span className='card-title'>Zip Code</span>: {dog.zip_code}</p>
      {buttonFunction ? 
      <Button onClick={(e) => {
        e.preventDefault();
        buttonFunction([...favorites, dog.id]);
      }}>Save to Favorites</Button> : null}
    </Col>
  )
}