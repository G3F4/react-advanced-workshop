import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AccommodationDetails from './AccommodationDetails.jsx';

const API_HOST = 'https://warsawjs-workshop-32-book-it-m.herokuapp.com';

const AccommodationDetailsConnect = (props) => {
  const [data, setData] = useState({});
  const url = `/details?id=${props.id}`;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${API_HOST}${url}`);

      setData(result.data);
    };

    fetchData();
  }, [url]);

  console.log(['data'], data)

  return (
    <AccommodationDetails {...props} />
  );
};

AccommodationDetailsConnect.propTypes = {
  openedDetails: PropTypes.object.isRequired,
  onBackToList: PropTypes.func.isRequired,
};

export default AccommodationDetailsConnect;
