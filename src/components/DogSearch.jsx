import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FormControl, Form, FormGroup, FormLabel, Container, Col, Row } from 'react-bootstrap';
import DogCard from './DogCard';


export default function DogSearch() {
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [zipCodes, setZipCodes] = useState('');
  const [minAge, setMinAage] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [match, setMatch] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('breed');

  useEffect(() => {
    axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', { withCredentials: true }).then((response) => {
      setBreeds(response.data);
      setSelectedBreed(response.data[0]);
    }).catch((e) =>
      console.log('Error with fetching breeds: ', e.message)
    );
  }, []);

  const searchDogs = (url) => {

    let searchUrl = `https://frontend-take-home-service.fetch.com${url}`;

    // included these first two checks in case a new search was needed
    if (!searchUrl.includes('sort')) {
      searchUrl += `?sort=${sortColumn}:${sortOrder}`
    }
    if (!searchUrl.includes('breeds')) {
      searchUrl += `&breeds=${selectedBreed}`
    }

    if (zipCodes) {
      searchUrl += `&zipCodes=${zipCodes.split(',')}`
    }
    if (minAge > 0) {
      searchUrl += `&ageMin=${minAge}`
    }
    if (maxAge > 0) {
      searchUrl += `&ageMax=${maxAge}`
    }

    axios.get(searchUrl, { breeds: breeds, withCredentials: true }).then((response) => {
      const data = response.data;
      setNextUrl(data.next ?? '');
      setPrevUrl(data.prev ?? '');
      axios.post('https://frontend-take-home-service.fetch.com/dogs', data.resultIds, { withCredentials: true }).then((res) => {
        setResults(res.data);
      }).catch((e) => {
        console.log("error with searching dogs: ", e.message);
      })
    }).catch((e) => {
      console.log("error with searching dogs: ", e.message);
    })
  }

  const generateMatch = () => {
    axios.post(`https://frontend-take-home-service.fetch.com/dogs/match`, favorites, { withCredentials: true }).then((response) => {
      axios.post('https://frontend-take-home-service.fetch.com/dogs', [response.data.match], { withCredentials: true }).then((res) => {
        setMatch(res.data);
      }).catch((e) => {
        console.log("error with generating a match: ", e.message)
      })
    }).catch((e) => {
      console.log("error with generating a match: ", e.message)
    })
  }

  const logOut = () => {
    axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, { withCredentials: true }).then((response) => {
      if (response.data === "OK") {
        window.location.href = '/';
      }
    }).catch((e) => {
      console.log('Error with logging out: ', e.message)
    })
  }

  return (
    <div>
      <div>
        <Container>
          <Row>
            <Col md={7}>
              <h2 className='mb-5'>Search dog breeds here.</h2>
              <FormGroup>
                <Row className={'mb-4'}>
                  <Col md={4} className='form-text-label'>
                    <FormLabel>Breeds:</FormLabel>
                  </Col>
                  <Col md={8}>
                    <Form.Select onChange={(e) => {
                      e.preventDefault();
                      setSelectedBreed(e.target.value);
                    }}>
                      {breeds.map((breed, index) => {
                        return <option index={index} value={breed}>{breed}</option>
                      })}
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
                <Row className={'mb-4'}>
                  <Col md={4} className='form-text-label'>
                    <FormLabel>Maximum Age:</FormLabel>
                  </Col>
                  <Col md={8}>
                    <FormControl type='number' value={maxAge} onChange={(e) => {
                      setMaxAge(e.target.value)
                    }} />
                  </Col>
                </Row>
                <Row className={'mb-4'}>
                  <Col md={3} className='form-text-label'>
                    <FormLabel>Sort by:</FormLabel>
                  </Col>
                  <Col md={3}>
                    <Form.Select onChange={(e) => {
                      e.preventDefault();
                      setSortColumn(e.target.value);
                    }}>
                      <option value={'breed'}>Breed</option>
                      <option value={'name'}>Name</option>
                      <option value={'age'}>Age</option>
                    </Form.Select>
                  </Col>
                  <Col md={3} className='form-text-label'>
                    <FormLabel>Sort Order:</FormLabel>
                  </Col>
                  <Col md={3}>
                    <Form.Select onChange={(e) => {
                      e.preventDefault();
                      setSortOrder(e.target.value);
                    }}>
                      <option value={'asc'}>Ascending</option>
                      <option value={'desc'}>Descending</option>
                      
                    </Form.Select>
                  </Col>
                </Row>
              </FormGroup>
              <p>Favorited dog(s): {favorites.map((dog) => <span>{dog.name}</span>)}</p>
            </Col>
            <Col md={5} style={{ minWidth: '300px' }}>
              <Button onClick={generateMatch} className='mb-4'>Generate Match</Button>
              {match.length > 0 ? <>
                <p>Congrats! You have matched with:</p>
                <DogCard dog={match[0]} />
              </> : null}
            </Col>
          </Row>
        </Container>

        <div className='mt-5'>
          <Button onClick={(e) => {
            e.preventDefault();
            searchDogs('/dogs/search/');
          }}>Search Dogs</Button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
            return (
              <DogCard index={index} dog={dog} buttonFunction={setFavorites} favorites={favorites} />
            )
          })}
        </Row>
      </Container>
      <div style={{ position: 'absolute', top: '2%', right: '2%' }}>
        <Button onClick={(e) => {
          e.preventDefault();
          logOut()
        }}>Log Out</Button>
      </div>
    </div>
  )
}