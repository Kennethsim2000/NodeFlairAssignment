import { type NextPage } from "next";
import Head from "next/head";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        name: formData.name,
        password: formData.password,
      });
      if (response.data.code == 200) {
        router.push("/user?token=" + response.data.data.token);
      } else {
        setError(true);
      }
      console.log(response.data); // Handle the response data accordingly
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-center items-center h-screen">
          <form
            className="p-8 bg-gray-100 rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block mb-2 text-lg font-medium" htmlFor="name">
                Name:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-lg font-medium"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
              type="submit"
            >
              Login
            </button>
            {error && (
              <p className="text-red-500 mt-2">
                Error logging in. Please try again.
              </p>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;