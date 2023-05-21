import { Card, Row, Form, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import DefaultInput from "../../components/default-input/DefaultInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import DefaultButton from "../../components/default-button/DefaultButton";
import { Paths } from "../../paths";

const Login = () => {
    return (
        <Layout>
            <Row align='middle' justify='center'>
                <Card title='Login' style={{ width: '30rem' }}>
                    <Form onFinish={() => null}>
                        <DefaultInput type='email' name='email' placeholder='Email' />
                        <PasswordInput name="password" placeholder="Password" />
                        <DefaultButton type='primary' htmlType="submit" >Login</DefaultButton>
                    </Form>
                    <Space direction='vertical' size='large'>
                        <Typography.Text>
                            You can register <Link to={ Paths.register }>here!</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
};



export default Login;