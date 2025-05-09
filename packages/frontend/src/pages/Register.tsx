import { Form, Link, redirect } from 'react-router-dom';
import { FormInput, SubmitBtn } from '../components';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export type customError = {
  response: { data: { error: { message: string } } };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/local/register', data);
    toast.success('Konto zostało założone!');
    return redirect('/login');
  } catch (error) {
    const errorMessage =
      (error as customError)?.response?.data?.error?.message ||
      'Sprawdź ponownie dane logowania';
    toast.error(errorMessage);
    return null;
  }
};

export const Register = () => {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput type="text" label="username" name="username"></FormInput>
        <FormInput type="email" label="email" name="email"></FormInput>
        <FormInput type="password" label="password" name="password"></FormInput>
        <div className="mt-4">
          <SubmitBtn text="register"></SubmitBtn>
        </div>
        <p className="text-center">
          Have an account?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
};
