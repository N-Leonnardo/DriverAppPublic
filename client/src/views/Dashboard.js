import React, { Suspense, useEffect, useState } from "react";
import suv from "../media/suv.png";
import mytrips from "../media/my-trips.jpg";
import newtrip from "../media/new-trip.jpg";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";
import { url } from "../App.js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import TripsTable from "../components/Dashboard/TripsTable";

function Dashboard() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [trips, setTrips] = useState(null);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = Cookies.get("token");
    axios
      .get(`${url}/users/checkLoggedIn`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data.userId) {
          setUserId(response.data.userId);
          loadPage(response.data.userId);
        } else {
          navigate("/login");
        }
      });
  }, []);

  function loadPage(id) {
    const token = Cookies.get("token");
    axios
      .get(`${url}/trips/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrips(res?.data.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="p-5 flex justify-center flex-col">
      <Navbar />
      <div
        className="header flex justify-center"
        style={{ backgroundImage: suv }}
      >
        <img src={suv} alt="" />
      </div>
      <div className="buttons flex w-full justify-center">
        <a href="">
          <div className="card m-2 h-60 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={mytrips} alt="MyTrips" />
            </figure>
            <div className="card-body h-full w-full items-end justify-end">
              <h2 className="font-bold text-4xl text-white">My trips</h2>
              <AiOutlineArrowRight className="text-2xl" />
            </div>
          </div>
        </a>
        <a href="/newtrip">
          <div className="card m-2  h-60 bg-base-100 shadow-xl image-full">
            <figure>
              <img src={newtrip} alt="NewTrip" />
            </figure>
            <div className="card-body h-full w-full items-end justify-end">
              <h2 className="font-bold text-4xl text-white">New trip</h2>
              <AiOutlineArrowRight className="text-2xl" />
            </div>
          </div>
        </a>
      </div>
      {trips && <TripsTable trips={trips} />}
    </div>
  );
}

export default Dashboard;
