import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { url } from "../App";
import axios from "axios";
import heroImg from "../media/suv-inside.jpg";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function MyTrip() {
  let { trip_id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

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
          loadPage();
        } else {
          navigate("/login");
        }
      });
  }, []);

  function loadPage() {
    const token = Cookies.get("token");
    axios
      .get(`${url}/trips/${trip_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.data) {
          setTrip(res.data.data);
        } else {
          alert("Error");
          navigate("/login");
        }
      });
  }

  return (
    <div className="max-w-full w-rem-46 ml-auto mr-auto p-5">
      <div>
        <a href="/dashboard" className="flex items-center font-xl">
          <IoIosArrowRoundBack /> Back
        </a>
      </div>
      {trip && (
        <div className=" text-primary-content">
          <div className="card-body">
            <img src={heroImg} className="rounded-xl h-36 object-cover" />
            <div className="flex justify-between">
              <div className="w-1/2">
                <h2 className="card-title box-text w-4/5">{trip.pickup}</h2>
              </div>

              <div className="w-1/2 text-right">
                <h2 className="card-title box-text w-4/5 text-right">
                  {trip.dropoff}
                </h2>
              </div>
            </div>
            <p>
              <span className="font-bold">Date: </span>
              {trip.date}
            </p>
            <div className="card-actions justify-end">
              <button className="btn w-full bg-red-600 border-none mb-3 text-white">
                Any problem? Contact your driver
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
