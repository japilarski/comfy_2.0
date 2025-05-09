import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features';
import { useDispatch } from 'react-redux';

export type customError = {
  response: { data: { error: { message: string } } };
};

export const action =
  (store: any) =>
  async ({ request }: { request: Request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const response = await customFetch.post('/auth/local', data);
      store.dispatch(loginUser(response.data));
      toast.success('Zalogowano!');
      return redirect('/');
    } catch (error) {
      const errorMessage =
        (error as customError)?.response?.data?.error?.message ||
        'Sprawdź podobnie swoje dane logowania';
      toast.error(errorMessage);
      return null;
    }
  };

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(loginUser(response.data));
      toast.success('Witaj!');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Błąd logowania!');
    }
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="post"
        className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4 "
      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput label="email" name="identifier" type="email"></FormInput>
        <FormInput label="password" name="password" type="password"></FormInput>
        <div className="mt-4">
          <SubmitBtn text="login"></SubmitBtn>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-primary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
