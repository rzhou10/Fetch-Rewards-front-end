import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/Login";
import DogSearch from './components/DogSearch';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <DogSearch />
  }
]);

export default function App() {

  return (
    <RouterProvider router={router} />
  )
}