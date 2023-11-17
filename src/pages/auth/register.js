import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik  } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import RoleService from "../../service/RoleService";
import { useState } from 'react';
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';


const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [loginAvil, setLoginAvil] = useState(null);

  const checkLoginId= async (event)=>{
    if(!event.target.value){
      setLoginAvil(null);
      return;
    }
    const result =  await  RoleService.userNameCheck({"LoginId":event.target.value});
    if(result && result.Code=='303' && result.Message == "Allredy exsits this Login id/ User Id  ! please use another Login id/User id"){
      setLoginAvil('Login id already in use');
    }else{
      setLoginAvil('Login id is Available');
    }

  }
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
          Register 
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
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              
              <Typography
                color="text.secondary"
                variant="body2"
              >

<div style={{ display: 'inline-flex',height:'10px' }}>
      <div style={{ flex: '5 1 0%',color:"blue" }}>
       {loginAvil} 
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ width: '34px','margin-top':'-6px' }}>
        {loginAvil === 'Login id already in use'? <XCircleIcon color='red' />: loginAvil === 'Login id is Available' ?<CheckCircleIcon color='green'/>:''}     

          </p>

        
      </div>
    </div>
               
          {/* <p>
          {loginAvil === 'Login id already in use'?<XCircleIcon />:<CheckCircleIcon/>}     

          </p>
          <p>
          {loginAvil }     

          </p> */}
                {/* <Link
                  component={NextLink}
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                               {loginAvil === 'Login id already in use'?<XCircleIcon />:<CheckCircleIcon/>}

                </Link> */}
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
              <TextField
                  error={!!(formik.touched.loginId && formik.errors.loginId)}
                  fullWidth
                  helperText={formik.touched.loginId && formik.errors.loginId}
                  label="Login Id"
                  name="loginId"
                 // onBlur={checkLoginId}
                  

                  onBlur={(event)=>{
                    formik.handleBlur(event);
                    checkLoginId(event);
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.loginId}
                />
                {/* <div>
                
                <p>{loginAvil === 'Login id already in use'?<XCircleIcon />:<CheckCircleIcon/>}</p>
                
                </div> */}
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
                <div>
                  
                  </div>
                 
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
