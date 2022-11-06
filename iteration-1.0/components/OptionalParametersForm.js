//npm module
import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
//project module
import web3 from "../ethereum/web3";
import { Router } from "../routes";
//compiled smart contract
import bankAccount from "../ethereum/bankAccount";

class OptionalParametersForm extends Component {
  state = {
    password: "",
    balance: "",
    description: "",
    errorMessage: "",
    loading: false,
  };

  //event handler to record Bank Account's optional parameters
  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await bankAccount(this.props.address)
        .methods.setParameters(
          this.state.password,
          this.state.balance,
          this.state.description
        )
        .send({
          from: accounts[0],
        });

      Router.replaceRoute(
        `/contracts/${this.props.contractAddress}/${this.props.address}`
      );
      this.setState({
        password: "",
        balance: "",
        description: "",
      });
    } catch (err) {
      this.setState({
        errorMessage: `O sistema identificou um erro. Favor validar as informações do formulário e tentar novamente. Caso o erro persista, estamos à disposição através do e-mail contato@smartwill.com.br. Para agilizar seu atendimento, favor descrever a situação de erro e incluir a seguinte descrição: ${err.message}`,
      });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form
        onSubmit={(e) => {
          this.onSubmit(e);
        }}
        error={!!this.state.errorMessage}
      >
        <h4>Cadastrar parâmetros opcionais</h4>
        <Form.Field>
          <label>Senha:</label>
          <Input
            focus
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Saldo:</label>
          <Input
            focus
            value={this.state.balance}
            onChange={(e) => this.setState({ balance: e.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Descrição:</label>
          <Input
            focus
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button type="submit" loading={this.state.loading}>
          Cadastrar
        </Button>
      </Form>
    );
  }
}

export default OptionalParametersForm;
