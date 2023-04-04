import React from 'react';

// MUI
import { Box, FormHelperText, Grid, TextField, Typography, Button } from "@material-ui/core";

// styles
import { styles } from "../../styles/login.styles.js";

// form
import { useForm, Controller} from "react-hook-form";

// services
import { loginService } from '../../services/serviceLogin';

// redux
import { useDispatch } from 'react-redux';
import { loggedIn } from '../../features/user/userSlice';

const Login = () => {
	const {
		handleSubmit,
		control,
		formState: { errors }
	} = useForm();

	const dispatch = useDispatch();

	const onSubmit = async(values) => {
		try{
			const { data } = await loginService(values);

			if(data?.status === 'success'){
				dispatch(loggedIn({
					username: data?.data?.username,
					rol: [data?.data?.rol],
					isLoggedIn: true
				}));

				// save in local storage
				localStorage.setItem('user', JSON.stringify({
					username: data?.data?.username,
					rol: [data?.data?.rol],
					isLoggedIn: true
				}));
			}
		}catch(e){
			console.error(e);
		}
	}

	const onError = (err) => {
		console.error(err);
	}

  return (
    <Box style={styles.container}>
			<form onSubmit={handleSubmit(onSubmit, onError)}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box>
							<Typography style={styles.title}>Remission project</Typography>
						</Box>
					</Grid>
					{/* user input */}
					<Grid item xs={12}>
						<Controller 
							rules={{
								required: {
									value: true,
									message: 'El campo es obligatorio'
								}
							}}
							name="username"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField 
									{...field}
									variant='outlined'
									label="usuario"
									type="text"
									onChange={(e) => field.onChange(e.target.value)}
									defaultValue=""
								/>
							)}
						/>
						{errors?.username && <FormHelperText error>{errors?.username?.message}</FormHelperText>}
					</Grid>
					{/* passsword */}

					<Grid item xs={12}>
						<Controller 
							rules={{
								required: {
									value: true,
									message: "Este campo es obligatorio"
								}
							}}
							name="password"
							control={control}
							defaultValue=""
							render={({field}) => (
								<TextField 
									{...field}
									variant='outlined'
									label="Contraseña"
									onChange={(e) => field.onChange(e.target.value)}
									type="password"
									defaultValue=""
								/>
							)}
						/>
						{errors?.password && (<FormHelperText error>{errors?.password?.message}</FormHelperText>)}
					</Grid>

					{/* save button*/ }
					<Grid item xs={12}>
						<Button
							variant="contained"
							type="submmit"
              style={styles.buttonSave}
						>
							<Typography style={styles.textSave}>Ingresar</Typography>
						</Button>
					</Grid>
				</Grid>
			</form>
    </Box>
  )
}

export default Login;