import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FormControl, Form, FormGroup, FormLabel, Container, Col, Row } from 'react-bootstrap';
import DogCard from './DogCard';


export default function DogSearch() {
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [zipCodes, setZipCodes] = useState([]);
  const [minAge, setMinAage] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [match, setMatch] = useState([]);

  useEffect(() => {
    // axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds').then((response) => {
    //   console.log(response.data)
    //   setBreeds(response.data);
    // }).catch((e) =>
    //   console.log('e: ', e))
  }, []);

  const searchDogs = (url) => {
    axios.get(`https://frontend-take-home-service.fetch.com/${url}`).then((response) => {
      const data = response.data;
      setNextUrl(data.next ?? '');
      setPrevUrl(data.prev ?? '');
      axios.post('https://frontend-take-home-service.fetch.com/dogs', data.resultIds).then((res) => {
        setResults(res.data);
      })
    })
  }

  const generateMatch = () => {
    axios.post(`https://frontend-take-home-service.fetch.com/dogs/match`).then((response) => {
      axios.post('https://frontend-take-home-service.fetch.com/dogs', [response.data.match]).then((res) => {
        setMatch(res.data)
      })
    })
  }

  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col>
              <h2 className='mb-5'>Search dog breeds here.</h2>
              <FormGroup>
                <Row className={'mb-4'}>
                  <Col md={4} className='form-text-label'>
                    <FormLabel>Breeds:</FormLabel>
                  </Col>
                  <Col md={8}>
                    <Form.Select>
                      {/* {breeds.map((breed, index) => {
                  return <option index={index} value={breed}>{breed}</option>
                })} */}
                    </Form.Select>
                  </Col>
                </Row>
                <Row className={'mb-4'}>
                  <Col md={4} className='form-text-label'>
                    <FormLabel>Zip Code:</FormLabel>
                  </Col>
                  <Col md={8}>
                    <FormControl value={zipCodes} onChange={(e) => {
                      setZipCodes(e.target.value)
                    }} />
                  </Col>
                </Row>
                <Row className={'mb-4'}>
                  <Col md={4} className='form-text-label'>
                    <FormLabel>Minimum Age:</FormLabel>
                  </Col>
                  <Col md={8}>
                    <FormControl type='number' value={minAge} onChange={(e) => {
                      setMinAage(e.target.value)
                    }} />
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className='form-text-label'>
                    <FormLabel>Maximum Age:</FormLabel>
                  </Col>
                  <Col md={8}>
                    <FormControl type='number' value={maxAge} onChange={(e) => {
                      setMaxAge(e.target.value)
                    }} />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col>
              <Button onClick={generateMatch} className='mb-4'>Generate Match</Button>
              {match.length > 0 ? <>
                <p>Congrats! You have matched with:</p>
                <DogCard dog={match[0]} />
              </> : null}
            </Col>
          </Row>
        </Container>

        <div className='mt-5'>
          <Button disabled={prevUrl === ''} onClick={(e) => {
            e.preventDefault();
            searchDogs(prevUrl);
          }}>Prev</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button disabled={nextUrl === ''} onClick={(e) => {
            e.preventDefault();
            searchDogs(nextUrl);
          }}>Next</Button>
        </div>
      </div>
      <h2>Search Results</h2>
      <Container className='flex-wrap'>
        <Row style={{ gap: '25px', justifyContent: 'space-between' }}>
          {results.map((dog, index) => {
            console.log("dog results!")
            return (
              <DogCard index={index} dog={dog} buttonFunction={setFavorites} favorites={favorites} />
            )
          })}
        </Row>
      </Container>
    </div>
  )
}