// eslint-disable-next-line
/*eslint eqeqeq: "off"*/
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from 'sweetalert2'
import Footer from "../componentes/Footer/Footer";
import NavBar from "../componentes/NavBar/NavBar";
import '../css/style_server.css';


const CorretorEditar = () => {
  const [loading, setLoading] = useState(false);
  const { empid } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch("https://server-2.onrender.com/corretor/editar/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setLoading(false);
        idchange(resp.id);
        nomechange(resp.nome);
        cpfchange(resp.cpf);
        idadechange(resp.idade);
        salariochange(resp.salario);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  }, [empid]);

  const [id, idchange] = useState("");
  const [nome, nomechange] = useState("");
  const [cpf, cpfchange] = useState("");
  const [idade, idadechange] = useState("");
  const [salario, salariochange] = useState("");
  const [validation, valchange] = useState(false);

  console.log(validation);

  const navigate = useNavigate();
  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { id, nome, cpf, idade, salario };

    setLoading(false);
    fetch("https://server-2.onrender.com/corretor/editar/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        setLoading(false);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Editado com sucesso!',
          showConfirmButton: false,
          timer: 1500
        })


        navigate("/corretores/listar/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };
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
          <div className="server_row">
            <div className="server_offset-lg-3 col-lg-6">
              <form className="server_container" onSubmit={handlesubmit}>
                <div className="server_card" style={{ textAlign: "left" }}>
                  <div className="server_card-title">
                  <br></br>
                    <h2 className="server_h2">&nbsp;&nbsp;Editar corretor</h2>
                  </div>
                  <div className="server_card-body">
                    <div className="server_row">
                      <div className="server_col-lg-12">
                        <div className="form-group">
                          <label className="server_label">
                            <b className="server_b">ID</b>
                          </label>
                          <input value={id} disabled="disabled" className="server_form-control"></input>
                        </div>
                      </div>

                      <div className="server_col-lg-12">
                        <div className="form-group">
                          <label className="server_label">
                            <b className="server_b">Nome</b>
                          </label>
                          <input required value={nome} onMouseDown={(e) => valchange(true)} onChange={(e) => nomechange(e.target.value)} className="server_form-control"></input>
                        </div>
                      </div>

                      <div className="server_col-lg-12">
                        <div className="form-group">
                          <label className="server_label">
                            <b className="server_b">CPF</b>
                          </label>
                          <input required value={cpf} onMouseDown={(e) => valchange(true)} onChange={(e) => cpfchange(e.target.value)} className="server_form-control"></input>
                        </div>
                      </div>

                      <div className="server_col-lg-12">
                        <div className="form-group">
                          <label className="server_label">
                            <b className="server_b">Idade</b>
                          </label>
                          <input required value={idade} onMouseDown={(e) => valchange(true)} onChange={(e) => idadechange(e.target.value)} className="server_form-control"></input>
                        </div>
                      </div>

                      <div className="server_col-lg-12">
                        <div className="form-group">
                          <label className="server_label">
                            <b className="server_b">Salário</b>
                          </label>
                          <input required value={salario} onMouseDown={(e) => valchange(true)} onChange={(e) => salariochange(e.target.value)} className="server_form-control"></input>
                        </div>
                      </div>

                      <div className="server_col-lg-12">
                        <div className="form-group">
                          <br></br>
                          <button className="server_btn server_btn-success" type="submit">
                            Salvar
                          </button>
                          &nbsp;
                          <Link to="/corretores/listar" className="server_btn server_btn-danger">Voltar</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default CorretorEditar;
