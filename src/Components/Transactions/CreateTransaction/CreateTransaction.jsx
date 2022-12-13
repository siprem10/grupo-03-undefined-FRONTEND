import { useState } from "react";
import Card from "../../Card/Card";
import Layout from "../../Layout/Layout";

export default function CreateTransaction() {

  const type = [
    "Carga de Saldo",
    "Transferencia",
    "Pago de Servicios",
  ];

  const defaultsValues = {
    amount: '',
    concepto: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  const [inputState, setInputState] = useState({ ...defaultsValues });
  const [inputError, setInputError] = useState({ ...defaultsValues });

  function handleSetInput(e) {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value
    });
  }

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <Card className="flex flex-col w-fit items-center justify-center">
          <h1 className="mb-2 text-primary font-bold text-2xl uppercase">Generar transacción</h1>
          <form className="form" onSubmit={e => e.preventDefault()}>
            <div className='flex gap-6'>
              <div className="mb-4">
                <label className="label">Monto</label>
                <input
                  className="inputForm"
                  type="number"
                  placeholder="Monto"
                  name="amount"
                  value={inputState.amount}
                  onChange={e => handleSetInput(e)}></input>
                <div className="h-5">
                  {inputError.amount && <p className="inputFormErr">{inputError.amount}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Nombre</label>
                <input
                  className="inputForm"
                  type="text"
                  placeholder="Brenda"
                  name="firstName"
                  value={inputState.amount}
                  onChange={e => handleSetInput(e)}></input>
                <div className="h-5">
                  {inputError.amount && <p className="inputFormErr">{inputError.amount}</p>}
                </div>                
              </div>
            </div>

            <div className='flex gap-6'>
              <div className="mb-4">
                <label className="label">Monto</label>
                <input
                  className="inputForm"
                  type="number"
                  placeholder="Monto"
                  name="amount"
                  value={inputState.amount}
                  onChange={e => handleSetInput(e)}></input>
                <div className="h-5">
                  {inputError.amount && <p className="inputFormErr">{inputError.amount}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="label">Concepto</label>
                <input
                  className="inputForm"
                  type="text"
                  placeholder="Concepto"
                  name="concepto"
                  value={inputState.concepto}
                  onChange={e => handleSetInput(e)}></input>
                <div className="h-5">
                  {inputError.concepto && <p className="inputFormErr">{inputError.concepto}</p>}
                </div>                
              </div>
            </div>
          </form>

        </Card>
      </div>
    </Layout>
  );
}
