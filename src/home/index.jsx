import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../../server/api";
import Card from "../../components/card/card.index";
import { S } from "./style.styled";
import Modal from "../../components/modal/modal.index";
import Loader from "../../components/loader/index";

function Home() {
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpenModal = (item) => {
    setIsOpen(true);
    setCurrentItem(item);
  };

  const handlePreventDefault = (e) => {
    e.preventDefault();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  async function get() {
    const cancelToken = axios.CancelToken;

    try {
      const response = await api.get(
        "vending-machines/6548efb05ffbcdb10a44e90b/products"
      );
      setData(response.data.products);
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar produtos");
    }

    return () => cancelToken.cancel();
  }

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      {loading ? (
        <S.Container>
          <S.CardContainer>
            <Loader />
          </S.CardContainer>
        </S.Container>
      ) : (
        <S.Container>
          <S.TitleContainer>
            <h1>Produtos</h1>
          </S.TitleContainer>
          <S.CardContainer>
            {data.map((item) => (
              <S.Card key={item.conveyorId}>
                <h1 style={{ color: "#334155" }}>{item.name}</h1>
                <p style={{ color: "#6b7280" }}>{item.description}</p>
                <img src={item.image}></img>
                <h2 style={{ color: "#334155" }}>{item.price}</h2>
                <S.Button onClick={() => handleOpenModal(item)}>
                  Comprar
                </S.Button>
                <Modal
                  isOpen={isOpen}
                  onClose={handleCloseModal}
                  onContextMenu={handlePreventDefault}
                  item={currentItem}
                ></Modal>
              </S.Card>
            ))}
          </S.CardContainer>
        </S.Container>
      )}
    </>
  );
}

export default Home;
