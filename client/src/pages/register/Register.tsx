import { Card, Row, Form, Space, Typography } from "antd";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import DefaultInput from "../../components/default-input/DefaultInput";
import PasswordInput from "../../components/password-input/PasswordInput";
import DefaultButton from "../../components/default-button/DefaultButton";
import { Paths } from "../../paths";

const Register = () => {
    return (
        <Layout>
            <Row align='middle' justify='center'>
                <Card title='Register' style={{ width: '30rem' }}>
                    <Form onFinish={() => null}>
                        <DefaultInput name='name' placeholder='Name' />
                        <DefaultInput type='email' name='email' placeholder='Email' />
                        <PasswordInput name="password" placeholder="Password" />
                        <PasswordInput name='confirmPassword' placeholder="Confirm password" />
                        <DefaultButton type='primary' htmlType="submit" >Register</DefaultButton>
                    </Form>
                    <Space direction='vertical' size='large'>
                        <Typography.Text>
                            If you was registred, you can login <Link to={ Paths.login }>here!</Link>
                        </Typography.Text>
                    </Space>
                </Card>
            </Row>
        </Layout>
    )
};



export default Register;