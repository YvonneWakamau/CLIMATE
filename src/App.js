import hotBg from "./assets/hot.jpg";
import coldBg from "./assets/cold.jpg";
import Descriptions from "./components/Descriptions";
import { useEffect, useState } from "react";
import { getFormattedclimateData } from "./climateService";

function App() {
    const [city, setCity] = useState("Paris");
    const [climate, setclimate] = useState(null);
    const [units, setUnits] = useState("metric");
    const [bg, setBg] = useState(hotBg);

    useEffect(() => {
        const fetchclimateData = async() => {
            const data = await getFormattedclimateData(city, units);
            setclimate(data);

            // dynamic bg
            const threshold = units === "metric" ? 20 : 60;
            if (data.temp <= threshold) setBg(coldBg);
            else setBg(hotBg);
        };

        fetchclimateData();
    }, [units, city]);

    const handleUnitsClick = (e) => {
        const button = e.currentTarget;
        const currentUnit = button.innerText.slice(1);

        const isCelsius = currentUnit === "C";
        button.innerText = isCelsius ? "°F" : "°C";
        setUnits(isCelsius ? "metric" : "imperial");
    };

    const enterKeyPressed = (e) => {
        if (e.keyCode === 13) {
            setCity(e.currentTarget.value);
            e.currentTarget.blur();
        }
    };

    return ( <
        div className = "app"
        style = {
            { backgroundImage: `url(${bg})` }
        } >
        <
        div className = "overlay" > {
            climate && ( <
                div className = "container" >
                <
                div className = "section section__inputs" >
                <
                input onKeyDown = { enterKeyPressed }
                type = "text"
                name = "city"
                placeholder = "Enter City..." /
                >
                <
                button onClick = {
                    (e) => handleUnitsClick(e)
                } > °F < /button> < /
                div >

                <
                div className = "section section__temperature" >
                <
                div className = "icon" >
                <
                h3 > { `${climate.name}, ${climate.country}` } < /h3> <
                img src = { climate.iconURL }
                alt = "climateIcon" / >
                <
                h3 > { climate.description } < /h3> < /
                div > <
                div className = "temperature" >
                <
                h1 > { `${climate.temp.toFixed()} °${units === "metric" ? "C" : "F"
                  }` } < /h1> < /
                div > <
                /div>

                { /* bottom description */ } <
                Descriptions climate = { climate }
                units = { units }
                /> < /
                div >
            )
        } <
        /div> < /
        div >
    );
}

export default App;