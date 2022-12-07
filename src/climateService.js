const API_KEY = "4b325afa0e6711258faf72e9d6f1ff75";

const makeIconURL = (iconId) =>
    `https://openclimatemap.org/img/wn/${iconId}@2x.png`;

const getFormattedclimateData = async(city, units = "metric") => {
    const URL = `https://api.openclimatemap.org/data/2.5/climate?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);

    const {
        climate,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
    } = data;

    const { description, icon } = climate[0];

    return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    };
};

export { getFormattedclimateData };