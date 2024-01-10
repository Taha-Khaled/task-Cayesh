import { toast } from "react-toastify";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/authSlice";
import { Box, Button, TextField } from "@mui/material";
import styles from "./loginForm.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../services/apis/awardsApisSlice";

interface IFormInput {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [loginUser, { data, isSuccess, isError }] = useLoginUserMutation();

  const { getValues, register, handleSubmit, formState } = useForm<IFormInput>({
    defaultValues: {
      username: undefined,
      password: undefined,
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (user) => {
    await loginUser(user);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      dispatch(setUser({ username: getValues()?.username }));
    }
    if (isError) toast.error("wrong username or password !");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError]);

  return (
    <Box className={styles.holder}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={styles.wrapper}>
          <h1>Login</h1>
          <TextField
            label="Username"
            placeholder="Username"
            multiline
            error={!!formState.errors.username}
            helperText={formState.errors.username?.message}
            fullWidth
            {...register("username", {
              required: "Username is Required",
              pattern: {
                message: "special characters and spaces aren't allowed",
                value: /^(\d|\w)+$/,
              },
            })}
          />
          <TextField
            label="Password"
            placeholder="Password"
            multiline
            error={!!formState.errors.password}
            helperText={formState.errors.password?.message}
            fullWidth
            {...register("password", {
              required: "Password is Required",
              minLength: { message: "password minmun length is 8", value: 8 },
              pattern: {
                message:
                  "password must have at least one special character, one uppercase, one lowercase and one number (in any order)",
                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
              },
            })}
          />
          <Button type="submit" variant="contained">
            login
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default LoginForm;
