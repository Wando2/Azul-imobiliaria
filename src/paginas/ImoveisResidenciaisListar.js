// eslint-disable-next-line
/*eslint eqeqeq: "off"*/
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import swal from 'sweetalert';
import Footer from "../componentes/Footer/Footer";
import NavBar from "../componentes/NavBar/NavBar";
import '../css/style_server.css';

const ImoveisResidenciaisListar = () => {
  const [loading, setLoading] = useState(false);
  const [empdata, empdatachange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/imovel_residencial/detalhar/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/imovel_residencial/editar/" + id);
  };

  const Removefunction = (id) => {

    swal({
      title: "Remover",
      text: "Tem certeza que deseja apagar?",
      icon: "warning",
      buttons: {
        confirmButtonText: 'Confirmar',
        cancel: 'Cancelar'
      },

    }).then((value) => {
      if (!value == "") {

        setLoading(true);
        fetch("https://server-2.onrender.com/imovel_residencial/deletar/" + id, {
          method: "DELETE",
        })
          .then((res) => {

            

            swal("Concluído", "Removido com sucesso!", "success").then((value) => {
              if (!value == "") { window.location.reload(); } else { window.location.reload(); }

            });


          })
          .catch((err) => {
            setLoading(false);
            console.log(err.message);
          });
      }
    });
  }

  useEffect(() => {
    setLoading(true);
    fetch("https://server-2.onrender.com/imoveis_residenciais/listar")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setLoading(false);
        empdatachange(resp);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, []);
  return (

    <div className="server_tudo">
      {loading ? (
        <ClipLoader
          className="server_animacao"
          color="#21d4fd"
          size={150}
          aria-label="Loading Spinner"
          data-
          testid="carregador"
        />
      ) : (
        <>
          <NavBar />
          <div className="server_container">
            <div className="server_card">
              <div className="server_card-title">
              <br></br>
                <h2 className="server_h2">Listar imóveis residenciais</h2>
              </div>
              <div className="server_card-body">
                <div className="server_divserver_btn">
                  <Link to="/imovel_residencial/adicionar" className="server_btn server_btn-success">Adicionar (+)</Link>
                  &nbsp;
                  <Link to="/corretores/listar" className="server_btn server_btn-success">Corretores</Link>
                  &nbsp;
                  <Link to="/formas_de_pagamento/listar" className="server_btn server_btn-success">Formas de pagamento</Link>
                  &nbsp;
                  <Link to="/imoveis_comerciais/listar" className="server_btn server_btn-success">Imóveis comerciais</Link>
                  &nbsp;
                  <Link to="/imoveis_residenciais/listar" className="server_btn server_btn-success">Imóveis residenciais</Link>
                  &nbsp;
                  <Link to="/inquilinos/listar" className="server_btn server_btn-success">Inquilinos</Link>
                  <br></br>
                  <br></br>
                </div>
                <table className="server_table server_table-bordered">
                  <thead className="bg-dark server_text-white">
                    <tr className="server_tr">
                      <td className="server_td">
                        <b className="server_b">ID</b>
                      </td>

                      <td className="server_td">
                        <b className="server_b">Tipo de imóvel</b>
                      </td>
                      <td className="server_td">
                        <b className="server_b">Área</b>
                      </td>
                      <td className="server_td">
                        <b className="server_b">Quartos</b>
                      </td>

                      <td className="server_td">
                        <b className="server_b">Opções</b>
                      </td>
                    </tr>
                  </thead>
                  <tbody className="server_tbody">
                    {empdata &&
                      empdata.map((item) => (
                        <tr key={item.id}>
                          <td className="server_td">{item.id}</td>
                          <td className="server_td">{item.tipo_de_imovel}</td>
                          <td className="server_td">{item.area}</td>
                          <td className="server_td">{item.quartos}</td>

                          <td className="server_td">
                            <button onClick={() => { LoadEdit(item.id); }} className="server_btn server_btn-success">Editar</button>
                            &nbsp;
                            <button onClick={() => { Removefunction(item.id); }} className="server_btn server_btn-danger">Remover</button>
                            &nbsp;
                            <button onClick={() => { LoadDetail(item.id); }} className="server_btn server_btn-success">Detalhar</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default ImoveisResidenciaisListar;
