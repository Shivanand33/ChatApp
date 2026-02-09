import React, { useState,  useEffect } from "react";
 import { Link } from 'react-router-dom';

const Navbar = () => {
  const [theme, setTheme] = useState(false);
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
    localStorage.getItem("jobportal", event.target.value);
    document.documentElement.setAttribute("data-theme", event.target.value);
  };
   useEffect(() => {
    const currentTheme = localStorage.getItem("chatKaroTheme");
    document.documentElement.setAttribute("data-theme", currentTheme);
    setTheme(currentTheme);
  }, []);
  return (
    <>
      <div className="bg-primary flex justify-between items-center min-w-screen font-bold p-2">
        <h1>ChatAp</h1>
        <div>
            <Link to="/" className='  text-lg
        px-4 py-1
        rounded-full
        
        
        hover:text-orange-100
        transition'>
    Home
     </Link>
        </div>
        <div className="flex gap-3">
        
      <Link to="/login" className='  text-lg
        px-4 py-1
        rounded-full
        shadow-lg
        border
        hover:bg-orange-100
        transition'>
    Login
     </Link>

    <Link
      to="/register"
      className="
        text-lg
        px-4 py-1
        rounded-full
        shadow-lg
        border
        hover:bg-orange-100
        transition
      "
    >
      Register
    </Link>
          {/* <button className="btn btn-secondary">Login</button> */}
          <select
            name="theme"
            id="theme"
            className="select"
            onChange={handleThemeChange}
             value={theme}
          >
         
          <option value="">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="claude">Claude</option>
            <option value="spotify">Spotify</option>
            <option value="vscode">VSCode</option>
            <option value="black">Black</option>
            <option value="corporate">Corporate</option>
            <option value="ghibli">Ghibli</option>
            <option value="gourmet">Gourmet</option>
            <option value="luxury">Luxury</option>
            <option value="mintlify">Mintlify</option>
            <option value="pastel">Pastel</option>
            <option value="perplexity">Perplexity</option>
            <option value="shadcn">Shadcn</option>
            <option value="slack">Slack</option>
            <option value="soft">Soft</option>
            <option value="valorant">Valorant</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Navbar;
