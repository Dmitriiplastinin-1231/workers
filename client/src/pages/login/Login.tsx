import { Card, Row, Form, Space, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import DefaultInput from "../../components/default-input/DefaultInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import DefaultButton from "../../components/default-button/DefaultButton";
import { Paths } from "../../paths";
import { UserData, useLoginMutation } from "../../app/services/auth";
import { isErrorWithMessage } from "../../utils/is-error-with-message";
import { useState } from "react";
import ErrorMessage from "../../components/error-message/ErrorMessage";

const Login = () => {
    const navigate = useNavigate();
    const [loginUser, loginUserResult] = useLoginMutation();
    const [ error, setError ] = useState('');


    const login = async(data: UserData) => {
        try{
            await loginUser(data).unwrap();
            navigate('/');

        }catch(e){
            const maybeError = isErrorWithMessage(e);

            if (maybeError){
                setError(e.data.message);
            } else{
                setError('Unknow error')
            }
        }
    }

    return (
        <Layout>
            <Row align='middle' justify='center'>
                <Card title='Login' style={{ width: '30rem' }}>
                    <Form onFinish={ login }>
                        <DefaultInput type='email' name='email' placeholder='Email' />
                        <PasswordInput name="password" placeholder="Password" />
                        <DefaultButton type='primary' htmlType="submit" >Login</DefaultButton>
                    </Form>
                    <Space direction='vertical' size='large'>
                        <Typography.Text>
                            You can register <Link to={ Paths.register }>here!</Link>
                        </Typography.Text>
                        <ErrorMessage message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
};



export default Login;