import React, { useEffect, useRef, useState } from "react";
import { MdGpsFixed } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import suvmodel from "../media/suv-model.jpeg";
import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../App";
import { useNavigate } from "react-router-dom";

const center = { lat: 48.8584, lng: 2.2945 };

function NewTrip() {
  const navigate = useNavigate();
  const [location, setLocation] = useState();
  const [map, setMap] = useState(/**@type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [userId, setUserId] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [pickup, setPickup] = useState();
  const [dropoff, setDropoff] = useState();
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  function handleCreateTrip() {
    const token = Cookies.get("token");
    axios
      .post(
        `${url}/trips`,
        {
          pickup: originRef.current.value,
          dropoff: destinationRef.current.value,
          price: price.toFixed(2),
          date: date,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/dashboard");
      });
  }

  useEffect(() => {
    document.title = "MyDriverLN | New Trip";
    const token = Cookies.get("token");
    axios
      .get(`${url}/users/checkLoggedIn`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.userId) {
          console.log(response.data);
          setUserId(response.data.userId);
        } else {
          navigate("/login");
        }
      });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err)
    );
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setPrice((results.routes[0].legs[0].duration.value / 3600) * 150).toFixed(
      2
    );
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full justify-center items-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div
        className="card bg-base-100 shadow-xl absolute z-40 mt-2"
        style={{ width: "700px", maxWidth: "95%" }}
      >
        <div className="card-body">
          <Autocomplete>
            <input
              type="text"
              placeholder="Pick-up"
              className="input input-bordered input-sm w-full w-full"
              ref={originRef}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
            />
          </Autocomplete>
          <Autocomplete>
            <input
              type="text"
              placeholder="Drop-off"
              className="input input-bordered input-sm w-full"
              ref={destinationRef}
              onClick={(e) => {
                setDropoff(e.target.value);
              }}
            />
          </Autocomplete>
          <div>
            <input
              type="date"
              className="input w-full max-w-xs border"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>

          <button
            className="btn"
            onClick={() => {
              calculateRoute();
            }}
          >
            Calculate Route
          </button>
        </div>
      </div>
      <div className="w-screen h-screen z-0 absolute">
        <GoogleMap
          center={location || center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => {
            setMap(map);
          }}
        >
          <Marker position={location} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <button
        className="absolute bottom-20 right-6 text-2xl btn z-40"
        onClick={() => map.panTo(location || center)}
      >
        <MdGpsFixed />
      </button>
      <Navbar />

      {directionsResponse && (
        <div
          className="card bg-base-100 shadow-xl absolute z-40 mt-2 bottom-24 pt-5"
          style={{ width: "700px", maxWidth: "95%" }}
        >
          <div className="flex justify-end">
            <button
              className="w-12"
              onClick={() => {
                clearRoute();
              }}
            >
              <AiOutlineClose />
            </button>
          </div>
          <div className="card-body pt-1 flex items-center justify-center">
            <div className="flex w-full items-center justify-between">
              <img className="w-36" src={suvmodel} alt="" />
              <div className="price">
                <h2 className="font-bold text-2xl">${price.toFixed(2)}</h2>
              </div>
            </div>
            <div className="w-full">
              <h2 className="font-bold">Trip Details:</h2>
              <div className="flex justify-between w-full">
                <h2 className="font-bold">
                  Distance: <span className="font-normal">{distance}</span>
                </h2>
                <h2 className="font-bold">
                  Duration <span className="font-normal">{duration}</span>
                </h2>
              </div>
            </div>
            <button
              onClick={() => {
                handleCreateTrip();
              }}
              className=" w-full mt-2 btn btn-success"
            >
              Contract Service
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default NewTrip;
