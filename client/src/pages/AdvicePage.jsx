import React, { useEffect, useState } from 'react';
import dice from '../assets/images/icon-dice.svg';
import divider from '../assets/images/pattern-divider-desktop.svg';

const AdvicePage = () => {
  const [advice, setAdvice] = useState({ id: null, advice: "" });
  const [loading, setLoading] = useState(true);

  const fetchAdvice = () => {
    setLoading(true);
    fetch('https://api.adviceslip.com/advice')
      .then(response => response.json())
      .then(data => {
        setAdvice(data.slip);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="w-screen h-screen bg-DarkBlue flex items-center justify-center p-5 lg:p-0">
      <div className="bg-DarkGray lg:h-[250px] w-[450px] h-[300px] rounded-lg flex flex-col items-center relative p-8">
        
        <h1 className="text-green-500 mb-2 font-semibold">
          ADVICE #{loading ? '...' : advice.id}
        </h1>

        <p className="text-white text-center text-lg font-semibold">
          {loading ? 'Loading...' : `"${advice.advice}"`}
        </p>

        <img src={divider} alt="Divider" className="absolute bottom-16 translate-y-1/2 p-7" />
        
        <div className="absolute bottom-0 translate-y-1/2 bg-Neon hover:shadow-[0px_0px_15px_3px_rgba(57,255,20,0.8)] p-3 rounded-full">
          <img
            src={dice}
            alt="Dice Icon"
            className="cursor-pointer"
            onClick={fetchAdvice}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvicePage;
