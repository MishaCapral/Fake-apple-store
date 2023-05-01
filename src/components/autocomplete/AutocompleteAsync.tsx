import React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import getCities, { City } from '../../api/getCities';
import { useField } from 'formik';
import getOffices from '../../api/getOffices';

interface AutocompleteAsyncInterface {
  name: string;
  label: string;
  type: string;
}

const AutocompleteAsync: React.FC<AutocompleteAsyncInterface> = ({
  name,
  label,
  type,
}) => {
  const [{ value }] = useField('pickUp');
  const disabled = Boolean(value.city.length === 0 && type === 'office');
  const [, { error, touched }, { setValue }] = useField(name);

  // lose error after submit
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<
    readonly (City | { office: string })[]
  >([]);

  const loading = open && options.length === 0;

  //type
  const typedOnChange =
    type === 'city'
      ? (_, value) => setValue(value?.city)
      : (_, value) => setValue(value?.office);

  const typedEqualToValue =
    type === 'city'
      ? (option, value) => option.city === value.city
      : (option, value) => option.office === value.office;

  const typedOptionLabel =
    type === 'city' ? (option) => option.city : (option) => option.office;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const newOptions = await (type === 'city'
        ? getCities()
        : getOffices(value.city));
      if (active) {
        setOptions([...newOptions]);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading, value.city, type]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      onChange={typedOnChange}
      disableClearable
      id={name}
      disabled={disabled}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={typedEqualToValue}
      getOptionLabel={typedOptionLabel}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin='dense'
          size='small'
          error={Boolean(touched && error)}
          helperText={Boolean(touched && error) && error}
          InputProps={{
            ...params.InputProps,

            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteAsync;
