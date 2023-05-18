import React, { useEffect, useState } from "react";
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import MyTrip from "../../views/MyTrip";

export default function TripsTable(props) {
  const [trips, setTrips] = useState(props.trips);

  const navigate = useNavigate();

  return (
    <div className="mb-20 w-rem-46 max-w-full ml-auto mr-auto">
      {trips?.map((trip, i) => (
        <div
          className="hover:shadow border flex flex-row my-2 rounded-lg py-4 px-4 justify-between cursor-pointer"
          id={i}
          onClick={() => {
            navigate(`/mytrip/${trip.trip_id}`);
          }}
        >
          <div className="flex flex-col w-2/3">
            <div className="flex w-full">
              <CiLocationArrow1 className="text-xl mr-2" />
              <div className="box-text">{trip.pickup}</div>
            </div>
            <div className="flex w-full">
              <CiLocationOn className="text-xl mr-2" />
              <div className="box-text">{trip.dropoff}</div>
            </div>
          </div>

          <div className="flex flex-col w-1/3 text-right">
            <div className="w-full box-text">${trip.price}</div>
            <div className="w-full box-text">{trip.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
