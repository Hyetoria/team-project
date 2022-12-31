import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { signIn } from '../utils/useAPI';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const history = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  // react hook form 사용해보기(렌더링 비용 최소화)
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const { user } = await signIn(data);
    setLoginInfo(data);
    if (!user) {
      alert('이메일 혹은 비밀번호가 일치하지 않습니다.');
    } else {
      alert(`hello, ${user.displayName}!!`);
      history('/');
    }
  };

  return (
    <Container>
      <ul>
        <li>
          <Link to={'/'} className="go-back">
            <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
            GO Back
          </Link>
        </li>
        <li>
          <Link to={'/SignUp'} className="Login"></Link>
        </li>
      </ul>

      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>
            WELCOM
            <span className="material-symbols-outlined">heart_minus</span>
          </h1>

          <h4>E-mail</h4>
          <div className="username-input">
            <input type="email" placeholder="example@gmail.com" {...register('email', { required: true })} />
          </div>
        </div>
        <div>
          <h4>Password</h4>
          <div className="password-input">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="********" {...register('password', { required: true })} />
          </div>
          <Link to={'/SignUp'} className="Login">
            <span className="material-symbols-outlined">touch_app</span>
            SignUp
          </Link>
        </div>
        <div className="submit">
          <input type="submit" value="submit" />
        </div>
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  font-family: 'Marcellus', serif;

  ul {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 20px;
    line-height: 55px;
    height: 55px;

    text-align: center;
    color: gray;
    font-family: 'Marcellus', serif;
  }

  li {
    width: 30%;
    box-sizing: border-box;
    height: 65.99px;
  }

  .go-back {
    padding-bottom: 20px;
    height: 100%;
  }

  .navbar-logo {
    padding-bottom: 20px;
    height: 100%;
  }

  .material-symbols-outlined {
    height: 100%;
    padding-right: 20px;
    padding-top: 20px;
  }

  h4 {
    margin: 20px 0 5px 0;
    font-size: 1.5rem;
    font-weight: 300;
    font-family: 'Marcellus', serif;
  }

  .Login {
    font-family: 'Marcellus', serif;
  }
`;

const LoginForm = styled.form`
  font-family: 'Marcellus', serif;
  letter-spacing: 0.5px;
  margin: auto;
  width: 600px;
  height: 800px;
  transform: translateY(10%);

  h1 {
    font-family: 'Marcellus', serif;
    margin: 20px 0 10px 0;
    font-size: 4rem;
    padding-bottom: 40px;
  }

  .username-input,
  .password-input {
    width: 90%;
    border-bottom: 1px solid #a4a4a4;
  }

  input {
    width: 100%;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
    font-size: 15px;
  }

  .submit {
    margin-top: 50px;
    width: 90%;
  }

  .submit input {
    height: 50px;
    border-radius: 30px;
    margin-top: 10px;
    padding: 0px 20px;
    border: 1px solid lightgray;
    outline: none;
  }
`;

export default Login;
