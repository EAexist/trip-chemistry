import { useState, useEffect,  Fragment, ChangeEvent } from 'react'
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

/* @mui
 https://mui.com/material-ui/react-autocomplete/#search-as-you-type */

interface AsyncAutoCompleteProps {
    label: string
    setValue?: (value: string)=>void
}
interface option {
    name: string
};

function AsyncAutoComplete({ label, setValue = ()=>{} }: AsyncAutoCompleteProps) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<option[]>([{ name: "우동1234" }]);
    const loading = open && options.length === 0;
    const handleChangeTextField = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([{ name: "우동1234" }]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            freeSolo
            className='w-full text-sm'
            // sx={{ fontSize: 12 }}
            open={open}
            onOpen={() => {
                console.log("OnOpen");
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
                console.log("OnClose");
            }}
            // isOptionEqualToValue={(option, value) => option.name === value.name}
            // getOptionLabel={(option) => option.name}
            options={options?.map((option) => option.name)}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    size='small'
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                    onChange={handleChangeTextField}
                />
            )}
        />
    );
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

export default AsyncAutoComplete;