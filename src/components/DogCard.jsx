import { useState } from 'react';
import { Button, Col } from 'react-bootstrap';


export default function DogCard({ index, dog, buttonFunction, favorites }) {
  const [isFavorited, setIsFavorited] = useState(false);

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
          if (!favorites.includes(dog.id)) {
            buttonFunction([...favorites, dog.id]);
            setIsFavorited(true);
          } else {
            const filtered = favorites.filter(f => f.id === dog.id);
            buttonFunction(filtered);
            setIsFavorited(false);
          }
        }}>{isFavorited ? 'Remove from Favorites' : 'Save to Favorites'}</Button> : null}
    </Col>
  )
}