import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FormControl, Form, FormGroup, FormLabel } from 'react-bootstrap';


export default function DogSearch() {
  const [page, setPage] = useState(0);
  const [breeds, setBreeds] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [minAge, setMinAage] = useState(0);
  const [maxAge, setMaxAge] = useState(0);

  useEffect(() => {
    axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds').then((response) => {
      console.log(response.data)
      setBreeds(response.data);
    }).catch((e) =>
      console.log('e: ', e))
  }, [])


  return (
    <>
      <h1>Search dog breeds here.</h1>
      <div>
        <FormGroup>
          <FormLabel>Breeds: &nbsp;</FormLabel>
          <Form.Select>
            {breeds.map((breed) => {
              return <option value={breed}>{breed}</option>
            })}
          </Form.Select>
          <FormLabel>Zip Code: &nbsp;</FormLabel>
          <FormControl value={zipCodes} onChange={(e) => {
            setZipCodes(e.target.value)
          }} />&nbsp;
          <FormLabel>Minimum Age: &nbsp;</FormLabel>
          <FormControl type='number' value={minAge} onChange={(e) => {
            setMinAage(e.target.value)
          }} />
          <FormLabel>Maximum Age: &nbsp;</FormLabel>
          <FormControl type='number' value={maxAge} onChange={(e) => {
            setMaxAge(e.target.value)
          }} />
        </FormGroup>

        <div>
          <Button onClick={(e) => {
            e.preventDefault();
            login()
          }}>Go to Page: </Button>&nbsp;&nbsp;&nbsp;
          <FormControl type='number' value={page} onChange={(e) => {
            setPage(e.target.value)
          }} />
        </div>
      </div>
    </>
  )
}