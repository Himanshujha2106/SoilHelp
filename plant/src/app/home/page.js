'use client'
import React, { useState } from "react";
import Head from "next/head";
import axios from "axios";

export default function Home() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [plantationInfo, setPlantationInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLocationChange = (e, coord) => {
    setLocation(prev => ({ ...prev, [coord]: e.target.value }));
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          setLoading(false);
        },
        (error) => {
          setError("Error fetching location: " + error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/plantDetail", {
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
      });
      setPlantationInfo(response.data);
    } catch (error) {
      console.error("Error fetching plantation info:", error);
      setError("Error fetching plantation information: " + error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Head>
        <title>Geo Tagging Plantation</title>
        <meta name="description" content="Geo Tagging Plantation Initiative" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">Geo Tagging Plantation</h1>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col space-y-4 mb-4">
            <input
              type="number"
              value={location.latitude}
              onChange={(e) => handleLocationChange(e, 'latitude')}
              placeholder="Enter latitude"
              className="px-4 py-2 border border-green-300 rounded"
            />
            <input
              type="number"
              value={location.longitude}
              onChange={(e) => handleLocationChange(e, 'longitude')}
              placeholder="Enter longitude"
              className="px-4 py-2 border border-green-300 rounded"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleGetLocation}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? "Fetching Location..." : "Get My Location"}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {plantationInfo && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Plant Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plantationInfo.commonPlants.map((plant, index) => (
                <div key={index} className="border border-green-200 p-4 rounded">
                  <h3 className="text-xl font-semibold text-green-700">{plant.name}</h3>
                  <p><span className="font-semibold">Scientific Name:</span> {plant.scientificName}</p>
                  <p><span className="font-semibold">Family:</span> {plant.family}</p>
                  <p><span className="font-semibold">Genus:</span> {plant.genus}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-green-700 mb-2">Environmental Information</h3>
              <p><span className="font-semibold">Soil Type:</span> {plantationInfo.soilType}</p>
              <p><span className="font-semibold">Average Rainfall:</span> {plantationInfo.averageRainfall}</p>
              <p><span className="font-semibold">Growing Season:</span> {plantationInfo.growingSeason}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}