import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getTransactions } from "../../../redux/actions/transactionActions";
import { getUser } from "../../../redux/actions/userActions";
import { resetUser } from "../../../redux/slices/userSlice";
import { HttpService } from "../../../Service/HttpService";
import { alertErr, alertOk } from "../../../Utils/UI";
import { isValidEmail, isValidNum } from "../../../Utils/Validator";
import BaseButton from "../../BaseButton/BaseButton";
import Card from "../../Card/Card";
import Dropdown from "../../Dropdown/Dropdown";
import Layout from "../../Layout/Layout";
import CategoryDropdown from "./CategoryDropDown/CategoryDropDown";
import FindUser from "./FindUser/FindUser";

export default function CreateTransaction({ selectType = "" }) {

  const CARGA_DE_SALDO = "Carga de Saldo";
  const TRANSFERENCIA = "Transferencia";
  const PAGO_DE_SERVICIOS = "Pago de Servicios";

  const type = [
    CARGA_DE_SALDO,
    TRANSFERENCIA,
    PAGO_DE_SERVICIOS,
  ];

  const defaultsValues = {
    categoryId: '',
    toUserId: '',
    amount: '',
    concept: '',
  };

  const defaultsCategory = "";

  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth.userData);
  const { findUser } = useSelector(state => state.user);
  const { categories, balance } = useSelector(state => state.transactions);
  const [typeTransaction, setTypeTransaction] = useState(selectType ? selectType : CARGA_DE_SALDO);
  const [categorySelect, setCategorySelect] = useState(defaultsCategory);
  const [inputState, setInputState] = useState({ ...defaultsValues });
  const [inputError, setInputError] = useState({ ...defaultsValues });

  useEffect(() => {

    dispatch(getCategories());
    dispatch(getTransactions(id));

    if (typeTransaction) {
      setResetStates();
    }

  }, [dispatch, typeTransaction]);

  function validateErrs(input) {
    let errors = {};
    const maxConcept = 20;

    if (input.concept && input.concept.length > maxConcept) {
      errors.concept = `Concepto muy largo (${input.concept.length}/${maxConcept})`;
    } else if (!isValidNum(input.concept)) {
      errors.concept = `Concepto inválido`;
    }

    if (!input.amount || !input.amount.length) {
      errors.amount = `Monto requerido`;
    }
    else if (input.amount <= 0) {
      errors.amount = `Monto inválido`;
    }
    else if (typeTransaction !== CARGA_DE_SALDO && input.amount > balance) {
      errors.amount = `Monto mayor a los ingresos`;
    }

    if (!input.toUserId) {
      errors.toUserId = 'Email requerido';
    } else if (!isValidEmail(input.toUserId)) {
      errors.toUserId = `Email invalido`;
    }

    return errors;
  }

  function handleSetInput(e) {
    setInputState({
      ...inputState,
      [e.target.name]: e.target.value
    });
    handleSetInputErrs(e.target.name, e.target.value);
  }

  function handleSetCategory(value, name) {
    setInputState({
      ...inputState,
      categoryId: value
    });
    setCategorySelect(name);
  }

  function handleSetInputErrs(name, value) {
    const objErrors = validateErrs({ ...inputState, [name]: value });
    setInputError(objErrors);
  }

  function setResetStates() {
    setInputState({ ...defaultsValues });
    setInputError({ ...defaultsValues });
    setCategorySelect(defaultsCategory);
    dispatch(resetUser());
    dispatch(getTransactions(id));
  }

  function isBtnFindDisabled() {
    return (
      !inputState.toUserId ||
      inputError.toUserId
    );
  }

  function isBtnSendDisabled() {
    const condition = (
      !inputState.amount ||
      inputError.amount ||
      inputError.concept
    );

    if (typeTransaction === TRANSFERENCIA) {
      const conditionTransfer = (
        !inputState.toUserId ||
        inputError.toUserId ||
        (findUser.status || !findUser.fullname)
      );

      return condition || conditionTransfer;
    }

    if (typeTransaction === PAGO_DE_SERVICIOS) {
      const conditionService = (!inputState.categoryId);

      return condition || conditionService;
    }

    return condition;
  }

  function handleFindUser() {
    dispatch(getUser(inputState.toUserId));
  }

  async function handleSend() {
    try {
      const httpService = new HttpService();
      const request = await httpService.apiPrivate().post(`/transactions`, { ...inputState, toUserId: findUser.id });
      
      if (request.data.body) {
        alertOk("Transacción generada correctamente!");
        setResetStates();
      } else {
        alertErr("No se pudo generar la transacción!");
      }
    } catch (error) {
      alertErr("No se pudo generar la transacción!");
    }
  }

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <Card className="flex flex-col w-fit items-center justify-center">
          <h1 className="mb-2 text-primary font-bold text-2xl uppercase">Generar {typeTransaction}</h1>
          <form className="form" onSubmit={e => e.preventDefault()}>
            <Dropdown setState={setTypeTransaction} itemDefSelect={CARGA_DE_SALDO} className="mb-4 w-full" title={"Tipo de transacción"} items={type}></Dropdown>

            {typeTransaction === PAGO_DE_SERVICIOS &&
              <CategoryDropdown stateSelect={categorySelect} setState={handleSetCategory} className="mb-4 w-full" title={"Servicio a pagar"} items={categories}></CategoryDropdown>
            }

            {typeTransaction === TRANSFERENCIA &&
              <div className='flex items-center gap-2 mb-4'>
                <div className="w-full">
                  <label className="label">Destinatario</label>
                  <input
                    className="inputForm"
                    type="text"
                    placeholder="correo@mail.com"
                    name="toUserId"
                    value={inputState.toUserId}
                    onChange={e => handleSetInput(e)}>
                  </input>
                  <div className="h-5">
                    {inputError.toUserId && <p className="inputFormErr">{inputError.toUserId}</p>}
                  </div>
                </div>
                <BaseButton disabled={isBtnFindDisabled()} className={`h-10 mt-2 ${isBtnFindDisabled() ? "disable" : ""}`} onClick={handleFindUser} text="Buscar" />
              </div>}
            <FindUser className={"mb-4 w-full"} />
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
                name="concept"
                value={inputState.concept}
                onChange={e => handleSetInput(e)}></input>
              <div className="h-5">
                {inputError.concept && <p className="inputFormErr">{inputError.concept}</p>}
              </div>
            </div>
            <BaseButton disabled={isBtnSendDisabled()} className={`w-full ${isBtnSendDisabled() ? "disable" : ""}`} onClick={handleSend} text="Enviar" />
          </form>
        </Card>
      </div>
    </Layout>
  );
}
