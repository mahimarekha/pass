import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import RoleService from "../../service/RoleService";


const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      // email: '',
      name: '',
      loginId:'',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      // email: Yup
      //   .string()
      //   .email('Must be a valid email')
      //   .max(255)
      //   .required('Email is required'),
      loginId: Yup
      .string()
      .max(255)
      .required('LoginId is required'),
      name: Yup
        .string()
        .max(255)
        .required('Name is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // await auth.signUp(values.loginId, values.name, values.password);
        // router.push('/');
       const result =  await  RoleService.userNameCheck({"LoginId":values.loginId});

       if(result && result.Code=='303' && result.Message == "Allredy exsits this Login id/ User Id  ! please use another Login id/User id"){
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: result.Message });
        helpers.setSubmitting(false);
        return;
       }
        RoleService.userPasswordUpdate({
          "LoginId":values.loginId,
          "password":values.password,
          "UserName":values.name
      }).then(async (res) => {
          if(res.Code == '201'){
            router.push('/auth/login');
            helpers.setStatus({ success: true });
            helpers.setErrors({ submit: res.Message });
            helpers.setSubmitting(true);
          }else{
            helpers.setStatus({ success: false });
            helpers.setErrors({ submit: res.Message });
            helpers.setSubmitting(false);
          }
        }).catch(err=>{
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: "Registration Failed" });
          helpers.setSubmitting(false);
        })
      } catch (err) {
        
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: "Registration Failed" });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <>
      <Head>
        <title>
          Register | Devias Kit
        </title>
      </Head>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.name && formik.errors.name)}
                  fullWidth
                  helperText={formik.touched.name && formik.errors.name}
                  label="User Name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                 <TextField
                  error={!!(formik.touched.loginId && formik.errors.loginId)}
                  fullWidth
                  helperText={formik.touched.loginId && formik.errors.loginId}
                  label="Login Id"
                  name="loginId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.loginId}
                />
                 <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                {/* <div class="form-group">
            <label for="password">Confirm Password:</label>
            <input
              type="password"
              name="confirm_password"
              value={this.state.input.confirm_password}
              onChange={this.handleChange}
              class="form-control"
              placeholder="Enter confirm password"
              id="confirm_password"
            />
            <div className="text-danger">
              {this.state.errors.confirm_password}
            </div> */}
                {/* <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                /> */}
                 {/* <TextField
                            id="password"
                            InputProps={{ style: { width: 258 } }}
                            margin="normal"
                            label=" Set Password  "
                            // placeholder="Password"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}

                        /> */}
               
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
