import React, { Component, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Card, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment.css';
import { Typography } from 'antd';

function Payment() {

    const saved = localStorage.getItem('user');
    const initial = JSON.parse(saved);
    const [userID, setId] = useState([]);
    const [Notification, setNotification] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            history.push('/');
        }
        else {
            setId(initial.id)
        }
    }, []);

    const showNotificationModal = () => {
        setShowNotification(true);
    };

    const hideNotificationModal = () => {
        setShowNotification(false);
    };

    async function payment(sub_id) {
        let item = { userID, sub_id };
        await fetch('https://nhatrovn.herokuapp.com/api/payment/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(item)
        }).then(async function (response) {
            const result = await response.json();
            setNotification('Hóa đơn ' + result.uuid + ' đã được ghi nhận chờ xử lý');
            showNotificationModal();

        }).catch(function (error) {
            setNotification('Thanh toán trước đó chưa được xử lý vui lòng chờ');
            showNotificationModal();
        });

    }

    return (
        <div>
            <div className="mt-3 mb-3 lasagna">
                <div className="upgrade">
                    <h2>Mua quyền <b>Đăng Nhà trọ</b></h2>
                    <Typography>Để có thể tăng số lượng và thời gian bài đăng</Typography>
                </div>
                <div className="plan">
                    <h3>Gói Đồng</h3>
                    <Typography>$199.000 vnd</Typography>
                    <Button className="mt-3 mb-3 btn btn-default text-white "
                        onClick={() => { payment(2); }}>Mua</Button>
                    &nbsp;
                    <div className="includes">
                        Bao gồm
                        <ul>
                            <li>Có thể đăng và duy trì bài đăng trong 3 tháng</li>
                        </ul>
                    </div>
                </div>
                <div className="plan">
                    <h3>Gói Bạc</h3>
                    <Typography>$399.000 vnd</Typography>
                    <Typography></Typography>
                    <Button className="mt-3 mb-3 btn btn-default text-white "
                        onClick={() => { payment(3); }}>Mua</Button>
                    &nbsp;
                    <div className="includes">
                        Bao gồm
                        <ul>
                            <li>Có thể đăng và duy trì bài đăng trong 5 tháng</li>
                        </ul>
                    </div>
                </div>
                <div className="plan">
                    <h3>Gói Vàng</h3>
                    <Typography>$599.000 vnd</Typography>
                    <Button className="mt-3 mb-3 btn btn-default text-white "
                        onClick={() => { payment(4); }}>Mua</Button>
                    &nbsp;
                    <div className="includes">
                        Bao gồm
                        <ul>
                            <li>Có thể đăng và duy trì bài đăng trong 12 tháng</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal
                className="details_modal"
                show={showNotification}
                onHide={hideNotificationModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className="mt-0 mb-0"><h4 className="float-left">Thông báo</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-3 mb-3">
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="float-left">{Notification}</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    );
}

export default Payment;