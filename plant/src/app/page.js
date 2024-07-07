"use client";
import { useState } from "react";
import Head from "next/head";
import axios from "axios";
export default function Home() {
  const [location, setLocation] = useState("");
  const [plantationInfo, setPlantationInfo] = useState(null); // State to store fetched data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [longitude, setlongitude] = useState("");
  const [latitude, setlatitude] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setlongitude(longitude);
          setlatitude(latitude);
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLoading(false);
        },
        (error) => {
          alert("Error fetching location");
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log(latitude);
      console.log(longitude);

      const response = await axios.get(
        `https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=clay&property=sand&depth=0-5cm&value=mean&value=uncertainty`
      );
      console.log(response.data);






// yash yaha se krna














      setPlantationInfo(response.data);
    } catch (error) {
      console.error("Error fetching plantation info:", error);
      setError("Error fetching plantation information");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Geo Tagging Plantation</title>
        <meta name="description" content="Geo Tagging Plantation Initiative" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen bg-green-50">
        <header className="w-full py-10 bg-green-400 shadow-md rounded-md">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-5xl font-extrabold animate-bounce">
              Geo Tagging Plantation
            </h1>
            <p className="mt-3 text-xl animate-pulse">
              Plant a tree, make the Earth greener
            </p>
          </div>
        </header>

        <section className="flex-1 container  mx-auto px-5 py-10 text-center">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-green-900 transition duration-500 hover:text-green-700">
              Get the accurate detail about Plant
            </h2>
            <p className="mt-4 text-lg text-gray-700">
              Enter your location to find nearby plantation drives and track
              your trees.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mb-10">
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your location"
              className="px-5 py-3 w-full max-w-md border-2 text-black border-green-400 rounded-lg shadow-sm focus:outline-none focus:border-green-600"
            />
            <button
              type="button"
              onClick={handleGetLocation}
              className="mt-4 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              {loading ? "Fetching Location..." : "Get My Location"}
            </button>
            <button
              type="submit"
              className="mt-4 ml-4 px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-green-700 transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </form>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-green-50">
              <h2 className="text-2xl font-semibold text-green-700">
                Our Mission
              </h2>
              <p className="mt-2 text-gray-700">
                To promote reforestation and create awareness about the
                importance of planting trees using geo-tagging technology.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-green-50">
              <h2 className="text-2xl font-semibold text-green-700">
                Get Involved
              </h2>
              <p className="mt-2 text-gray-700">
                Join us in our mission by participating in plantation drives,
                sponsoring a tree, or spreading the word.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-green-50">
              <h2 className="text-2xl font-semibold text-green-700">
                Track Plantations
              </h2>
              <p className="mt-2 text-gray-700">
                Use our geo-tagging technology to track the location and growth
                of trees you have planted or sponsored.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full py-10 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-green-900 mb-10 transition duration-500 hover:text-green-700">
              Why Plant Trees?
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="p-6">
                <img
                  src="/images/image1.jpg"
                  alt="Example Image"
                  width={500}
                  height={300}
                  className="rounded-xl"
                />
                <h3 className="mt-2 text-xl font-semibold text-green-700 transition duration-500 hover:text-green-500">
                  Combat Climate Change
                </h3>
                <p className="mt-2 text-gray-700">
                  Trees absorb CO2 and help reduce greenhouse gas emissions,
                  mitigating the effects of climate change.
                </p>
              </div>
              <div className="p-6">
                <img
                  src="/images/image2.jpg"
                  alt="Example Image"
                  width={500}
                  height={300}
                />
                <h3 className="mt-2 text-xl font-semibold text-green-700 transition duration-500 hover:text-green-500">
                  Preserve Biodiversity
                </h3>
                <p className="mt-2 text-gray-700">
                  Planting trees creates habitats for numerous species,
                  supporting biodiversity and ecosystems.
                </p>
              </div>
              <div className="p-6">
                <img
                  src="/images/image3.jpg"
                  alt="Example Image"
                  width={500}
                  height={300}
                  className="rounded-xl "
                />
                <h3 className="mt-2 text-xl font-semibold text-green-700 transition duration-500 hover:text-green-500">
                  Improve Air Quality
                </h3>
                <p className="mt-2 text-gray-700">
                  Trees act as natural air filters, removing pollutants and
                  providing cleaner air for us to breathe.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-10 bg-green-50">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-green-900 mb-10 transition duration-500 hover:text-green-700">
              Planting in the Hydro Area Catchment
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4 text-6xl text-green-600 transition-transform transform hover:scale-105">
                  <i className="fas fa-water"></i>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-green-50">
                  <h3 className="text-2xl font-semibold text-green-700 transition duration-500 hover:text-green-500">
                    Hydro Planting Techniques
                  </h3>
                  <p className="mt-2 text-gray-700">
                    Hydroponic gardening utilizes water-based solutions to
                    deliver nutrients directly to plant roots, minimizing water
                    usage and maximizing growth efficiency.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4 text-6xl text-green-600 transition-transform transform hover:scale-105">
                  <i className="fas fa-leaf"></i>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-green-50">
                  <h3 className="text-2xl font-semibold text-green-700 transition duration-500 hover:text-green-500">
                    Sustainable Practices
                  </h3>
                  <p className="mt-2 text-gray-700">
                    Sustainable hydroponic systems often incorporate recycled
                    materials and energy-efficient setups, reducing
                    environmental impact and promoting eco-friendly farming.
                  </p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-center mb-4 text-6xl text-green-600 transition-transform transform hover:scale-105">
                  <i className="fas fa-seedling"></i>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform hover:bg-green-50FF">
                  <h3 className="text-2xl font-semibold text-green-700 transition duration-500 hover:text-green-500">
                    Plant Diversity
                  </h3>
                  <p className="mt-2 text-gray-700">
                    Hydroponics allows for the cultivation of a wide range of
                    plants, from leafy greens like lettuce and spinach to
                    flowering herbs and even fruits like strawberries, all
                    thriving in controlled, nutrient-rich environments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="w-full py-6 bg-green-600 text-white">
          <div className="container mx-auto text-center">
            <p className="text-lg font-semibold">
              Make the Earth greener, one tree at a time.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
