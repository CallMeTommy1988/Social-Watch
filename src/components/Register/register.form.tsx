import { Col, Row, Button, Form, Input, Space, message } from 'antd';
import md5 from "js-md5";
import { useState } from 'react';
import * as outerService from "api/modules/outer"
import { useNavigate } from 'react-router';
import { IRegister } from '@/api/interface';
import Captcha from '../common/captcha'
import { Link } from 'react-router-dom';

const RegisterForm = () => {

    const navigate = useNavigate();
    const [formEnable, setFormEnable] = useState<boolean>(true);
    const [timespan, setTimespan] = useState<number>((new Date()).getTime());

    const registerForm = async (registerForm: IRegister.ReqRegisterForm) => {

        try {
            setFormEnable(false);
            registerForm.passwd = md5(registerForm.passwd);

            outerService.reg(registerForm).then(res => {
                navigate("/result/success", {
                    state: {
                        title: "只差一步就注册成功了",
                        subTitle: "请前往邮箱点击注册链接完成注册"
                    },
                    replace: true
                });
            }, reject => {
                setTimespan((new Date()).getTime());
                //registerForm.captcha = "";
            })
        }
        catch (ex) {
            console.log(ex);
        }
        finally {
            setFormEnable(true);
        }
    }

    return (
        <>
            <section className='outerForm'>
                <h1>注册</h1>
                <Form
                    name="basic"
                    layout="vertical"
                    onFinish={registerForm}
                    disabled={!formEnable}
                >
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                message: '请输入正确的邮箱',
                            },
                            {
                                required: true,
                                message: '请输入正确的邮箱',
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="passwd"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="重复密码"
                        name="repeatPasswd"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('passwd') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject("两次密码输入不一致")
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="验证码"
                        name="captcha"
                        rules={[{ required: true, message: '请输入验证码' }]}
                        extra="我要确认是你不是机器人."
                    >
                        <Row gutter={8}>
                            <Col span={12}>
                                <Input />
                            </Col>
                            <Col span={12}>
                                <Captcha reflash={timespan} />
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                            <Link to="/login">返回登录</Link>
                        </Space>
                    </Form.Item>
                </Form>
            </section>
        </>
    );
}

export default RegisterForm;