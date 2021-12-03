/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputField, SelectField } from '@boldcommerce/stacks-ui';
import '../Address/Address.css';

export const Address = ({
  address,
  onChange,
  errors,
  countries,
  provinces,
  showPostalCode,
  showProvince,
  provinceLabel,
  submit,
  requiredAddressFields,
}) => {
  const countryList = countries.map((countryItem) => <option value={countryItem.iso_code} key={countryItem.iso_code}>{countryItem.name}</option>);
  const provinceList = provinces.map((provinceItem) => <option value={provinceItem.iso_code} key={provinceItem.iso_code}>{provinceItem.name}</option>);
  const hasRequiredFields = requiredAddressFields && requiredAddressFields.length;
  const handleSubmit = useCallback(() => {
    if (address && address.country_code) {
      submit();
    }
  }, [
    address.country_code,
    address.province_code,
    address.postal_code,
    showProvince,
    showPostalCode,
    address.first_name,
    address.last_name,
    address.business_name,
    address.address_line_1,
    address.address_line_2,
    address.city,
    address.phone_number,
    address.id,
  ]);

  // Submit address if user has stopped typing
  useEffect(() => {
    const postalCodeTimeout = setTimeout(() => {
      handleSubmit();
    }, 2000);
    return () => clearTimeout(postalCodeTimeout);
  }, [
    address.first_name,
    address.last_name,
    address.business_name,
    address.address_line_1,
    address.address_line_2,
    address.city,
    address.country_code,
    address.province_code,
    address.postal_code,
    address.phone_number,
    address.id,
  ]);

  const errorMap = errors?.reduce((errors, error) => ({ ...errors, [error.field]: error.message }), {})

  return (
    <div className="FieldSet--Address">
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('first_name') ? 'First name' : 'First name (optional)'}
          type="text"
          name="first_name"
          className="Field Field--FirstName"
          value={address?.first_name ?? ''}
          messageType={errors && errorMap?.first_name && 'alert' || ''}
          messageText={errors && errorMap?.first_name && 'Enter a first name' || ''}
          aria-invalid={errors && errorMap?.first_name && true || null }
          onChange={(e) => onChange({
            first_name: e.target.value,
          })}
        />
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('last_name') ? 'Last name' : 'Last name (optional)'}
          type="text"
          name="last_name"
          className="Field Field--LastName"
          value={address?.last_name ?? ''}
          messageType={errors && errorMap?.last_name && 'alert' || ''}
          messageText={errors && errorMap?.last_name && 'Enter a last name' || ''}
          aria-invalid={errors && errorMap?.last_name && true || null }
          onChange={(e) => onChange({
            last_name: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('business_name') ? 'Company' : 'Company (optional)'}
          type="text"
          name="business_name"
          className="Field Field--Company"
          value={address?.business_name ?? ''}
          messageType={errors && errorMap?.business_name && 'alert' || ''}
          messageText={errors && errorMap?.business_name && 'Enter a company name' || ''}
          aria-invalid={errors && errorMap?.business_name && true || null }
          onChange={(e) => onChange({
            business_name: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('address_line_1') ? 'Address' : 'Address (optional)'}
          type="text"
          name="address_line_1"
          className="Field Field--Address"
          value={address?.address_line_1 ?? ''}
          messageType={errors && errorMap?.address && 'alert' || ''}
          messageText={errors && errorMap?.address && 'Enter an address' || ''}
          aria-invalid={errors && errorMap?.address && true || null }
          onChange={(e) => onChange({
            address_line_1: e.target.value,
          })}
        />
        <InputField
          placeholder="Apt, suite, etc."
          type="text"
          name="address_line_2"
          className="Field Field--Address2"
          value={address?.address_line_2 ?? ''}
          onChange={(e) => onChange({
            address_line_2: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('city') ? 'City' : 'City (optional)'}
          type="text"
          name="city"
          value={address?.city ?? ''}
          messageType={errors && errorMap?.city && 'alert' || ''}
          messageText={errors && errorMap?.city && 'Enter a city' || ''}
          aria-invalid={errors && errorMap?.city && true || null }
          className="Field Field--City"
          onChange={(e) => onChange({
            city: e.target.value,
          })}
        />
      </div>
      <div className="FieldGroup FieldGroup__Country">
        <SelectField
          placeholder="Select a country"
          className="SelectField Field--Country"
          value={address?.country_code ?? ''}
          messageType={errors && errorMap?.country && 'alert' || ''}
          messageText={errors && errorMap?.country && 'Select a country' || ''}
          aria-invalid={errors && errorMap?.country && true || null }
          onChange={(e) => onChange({
            country_code: e.target.value,
          })}
        >
          {countryList}
        </SelectField>
        {
          address?.country_code
            && showProvince && (
            <SelectField
              placeholder={
                `Select a ${provinceLabel}`
              }
              className="SelectField Field--Province"
              value={address?.province_code ?? ''}
              messageType={errors && errorMap?.province && 'alert' || ''}
              messageText={errors && errorMap?.province && 'Select a province or state' || ''}
              aria-invalid={errors && errorMap?.province && true || null }
              onChange={(e) => onChange({
                province_code: e.target.value,
              })}
            >
              {provinceList}
            </SelectField>
          )
        }
        {address?.country_code
          && showPostalCode && (
            <InputField
              placeholder="Postal code / ZIP"
              type="text"
              name="postal"
              className="Field Field--Postal_Code"
              messageType={errors && errorMap?.postal_code && 'alert' || ''}
              messageText={errors && errorMap?.postal_code}
              aria-invalid={errors && errorMap?.postal_code && true || null }
              value={address?.postal_code ?? ''}
              onChange={(e) => onChange({
                postal_code: e.target.value,
              })}
            />
          )}
      </div>
      <div className="FieldGroup">
        <InputField
          placeholder={hasRequiredFields && requiredAddressFields.includes('phone_number') ? 'Phone' : 'Phone (optional)'}
          type="tel"
          name="phone_number"
          className="Field Field--Phone"
          value={address?.phone_number ?? ''}
          messageType={errors && errorMap?.phone_number && 'alert' || ''}
          messageText={errors && errorMap?.phone_number && 'Enter a phone number' || ''}
          aria-invalid={errors && errorMap?.phone_number && true || null }          
          onChange={(e) => onChange({
            phone_number: e.target.value,
          })}
        />
      </div>
    </div>
  );
};
Address.propTypes = {
  address: PropTypes.any,
  onChange: PropTypes.func,
  errors: PropTypes.any,
  countries: PropTypes.any,
  provinces: PropTypes.any,
  showPostalCode: PropTypes.bool,
  showProvince: PropTypes.bool,
  provinceLabel: PropTypes.string,
  submit: PropTypes.func,
  requiredAddressFields: PropTypes.array,
};
export default Address;
