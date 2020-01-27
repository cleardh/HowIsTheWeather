import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addLocation, getLocationByAddress } from '../actions/location';

const AddLocation = ({
  getLocationByAddress,
  latlng,
  addLocation,
  history
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: ''
  });
  const { name, address } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addLocation(formData, history);
  };

  return (
    <Fragment>
      <form class='box' onSubmit={e => onSubmit(e)}>
        <h1>Add Address</h1>
        <input
          type='text'
          name='name'
          value={name}
          onChange={e => onChange(e)}
          placeholder='Name'
        />
        <input
          type='text'
          name='address'
          value={address}
          onChange={e => {
            onChange(e);
            getLocationByAddress(address);
          }}
          placeholder='Address'
        />
        <input
          type='text'
          name='_latlng'
          value={latlng}
          onChange={e => onChange(e)}
          placeholder='Latitude &amp; Longitude'
          readOnly
        />
        <input type='submit' name='add' value='Add' />
      </form>
    </Fragment>
  );
};

AddLocation.propTypes = {
  addLocation: PropTypes.func.isRequired,
  getLocationByAddress: PropTypes.func.isRequired,
  latlng: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  latlng: state.latlng
});

export default connect(mapStateToProps, { addLocation, getLocationByAddress })(
  withRouter(AddLocation)
);
