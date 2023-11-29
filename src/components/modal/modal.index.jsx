import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { S } from "../../pages/home/style.styled";
import { api } from "../../server/api";
import axios from "axios";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: 5px;
  height: 50%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
`;

const Modal = ({ isOpen, onClose, children, item }) => {
  const [pix, setPix] = useState(false);
  const [paymentId, setPaymentid] = useState(0);
  const [qrCode, setQrCode] = useState({});
  const [data, setData] = useState({});
  const [esteiraId, setEsteiraId] = useState("");

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    item != null ? setEsteiraId(item.conveyorId) : setEsteiraId("");
  }, [item]);

  async function payment() {
    const a = item.price.replace("R$", "");
    const b = a.replace(",", ".");
    const finalPrice = parseFloat(b.trim());

    try {
      const response = await api.post("payments/pix", {
        transaction_amount: 0.01,
        payment_method_id: "pix",
        payer: {
          email: "gustavo-gustavo20@hotmail.com",
        },
      });
      setData(response.data.data);
      setPaymentid(data.id);
      setQrCode(
        response.data.data.point_of_interaction.transaction_data.qr_code_base64
      );
      setPix(true);
      getPaymentStatus(response.data.data.id);
    } catch (error) {
      console.log(error);
      alert("Erro ao gerar PIX");
    }
  }

  async function postConveyor() {
    try {
      const response = await api.post("shoppings/", {
        conveyorId: esteiraId,
      });
    } catch (error) {
      console.log(error);
    }
  }

async function getPaymentStatus(id) {
    try {
      const response = await api.get(`payments/${id}`);
      if (response.data.status === "approved") {
        alert("Pagamento Aprovado!");
        postConveyor();
        onClose();
        setPix(false);
      } else {
        setTimeout(() => {
          getPaymentStatus(id);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const pagar = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          fontSize: 20,
        }}
      >
        <img
          src={`data:image/jpeg;base64,${qrCode}`}
          alt="QR Code"
          style={{ width: 250 }}
        />
      </div>
    );
  };

  const info = () => {
    return (
      <>
        <S.TitleContainer>
          <h1>Finalizar compra</h1>
        </S.TitleContainer>
        <S.Table key={item.id}>
          <thead>
            <tr>
              <th>Produto: </th>
              <td> {item.name}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Valor: </th>
              <td> {item.price}</td>
            </tr>
          </tbody>
        </S.Table>

        <S.Button onClick={payment}>Realizar pagamento</S.Button>
      </>
    );
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={handleOverlayClick}>
          <ModalContent>{pix ? pagar() : info()}</ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
